// React
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Components
import Button from "@components/Button";

// Images
import BackIcon from "@images/back.svg";
import { getCourse } from "@hooks/courses";
import { launchConfetti } from "@utils/confetti";

function Course() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<"course" | "quiz">("course");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!id) {
    return <div>Course non trouvée</div>;
  }

  if (!id) {
    return <div>Course non trouvée</div>;
  }

  const courseData = getCourse(id);
  if (!courseData) {
    return <div>Course non trouvée</div>;
  }

  // Gamification: points and levels
  const [userPoints, setUserPoints] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("userPoints") || "0", 10);
    }
    return 0;
  });
  const [userLevel, setUserLevel] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("userLevel") || "1", 10);
    }
    return 1;
  });

  // Level up every 100 points
  const POINTS_PER_QUIZ = 10;
  const POINTS_PER_COURSE = 20;
  const LEVEL_UP_POINTS = 100;

  if (state === "quiz") {
    const quiz = courseData.quiz || [];
    const current = quiz[quizIndex];

    // Vérifier si le cours est déjà complété
    let alreadyCompleted = false;
    if (typeof window !== "undefined") {
      const completed = JSON.parse(
        localStorage.getItem("completedCourses") || "[]"
      );
      alreadyCompleted = completed.includes(id);
    }

    if (alreadyCompleted) {
      localStorage.setItem("scrollToCourseId", id);
      window.location.href = "/openerd/courses";
      return null;
    }

    if (!current) {
      if (typeof window !== "undefined") {
        // Mark course as completed
        const completed = JSON.parse(
          localStorage.getItem("completedCourses") || "[]"
        );
        let firstCompletion = false;
        if (!completed.includes(id)) {
          completed.push(id);
          localStorage.setItem("completedCourses", JSON.stringify(completed));
          // Confetti only on first completion
          launchConfetti();
          firstCompletion = true;
        }
        // Points uniquement si première fois
        let points = parseInt(localStorage.getItem("userPoints") || "0", 10);
        let level = parseInt(localStorage.getItem("userLevel") || "1", 10);
        if (firstCompletion) {
          points += POINTS_PER_COURSE;
          localStorage.setItem("userPoints", String(points));
          // Level up if needed
          while (points >= level * LEVEL_UP_POINTS) {
            level += 1;
          }
          localStorage.setItem("userLevel", String(level));
        }
        // Update state
        setUserPoints(points);
        setUserLevel(level);
        localStorage.setItem("scrollToCourseId", id);
        setTimeout(() => {
          window.location.href = "/openerd/courses";
        }, 1200);
      }
      return null;
    }

    // Handler quiz : points seulement si pas déjà complété
    const handleSelect = (idx: number) => {
      setSelected(idx);
      setIsCorrect(null);
    };

    const handleValidate = () => {
      if (selected === null) return;
      const correct = selected + 1 === current.answer;
      setIsCorrect(correct);
      if (correct) {
        if (!alreadyCompleted) {
          // Award points for correct answer uniquement si pas déjà complété
          if (typeof window !== "undefined") {
            let points = parseInt(
              localStorage.getItem("userPoints") || "0",
              10
            );
            points += POINTS_PER_QUIZ;
            localStorage.setItem("userPoints", String(points));
            // Level up if needed
            let level = parseInt(localStorage.getItem("userLevel") || "1", 10);
            while (points >= level * LEVEL_UP_POINTS) {
              level += 1;
            }
            localStorage.setItem("userLevel", String(level));
            setUserPoints(points);
            setUserLevel(level);
          }
        }
        setTimeout(() => {
          setQuizIndex((q) => q + 1);
          setSelected(null);
          setIsCorrect(null);
        }, 700);
      }
    };

    return (
      <div>
        {/* Header */}
        <Link to="/courses" className="absolute top-5 left-5">
          <img src={BackIcon} alt="Back" className="h-12 w-12" />
        </Link>
        <h1 className="mt-7 text-center text-2xl mb-4">{courseData.name}</h1>

        {/* Gamification: Points and Level */}
        <div className="flex justify-center gap-6 mb-4">
          <div className="bg-blue-100 text-blue-700 rounded px-3 py-1 font-semibold">
            Points : {userPoints}
          </div>
          <div className="bg-green-100 text-green-700 rounded px-3 py-1 font-semibold">
            Niveau : {userLevel}
          </div>
        </div>

        {/* Quiz Content */}
        <div className="p-4">
          <p className="mb-4 font-semibold">{current.question}</p>
          <div className="flex flex-col gap-2">
            {current.options.map((opt: string, idx: number) => (
              <button
                key={idx}
                className={`border rounded px-4 py-2 text-left transition-colors ${
                  selected === idx
                    ? isCorrect == null
                      ? "border-blue-500 bg-blue-100"
                      : isCorrect
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-gray-300 bg-white"
                } hover:border-blue-400`}
                onClick={() => handleSelect(idx)}
                disabled={isCorrect === true}
              >
                {opt}
              </button>
            ))}
          </div>
          {isCorrect === false && selected !== null && (
            <div className="text-red-600 mt-2">
              Mauvaise réponse, réessayez.
            </div>
          )}
        </div>

        <div className="px-5 w-full">
          <Button
            label="Valider"
            width="100%"
            onClick={handleValidate}
            disabled={selected === null || isCorrect === true}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <Link to="/courses" className="absolute top-5 left-5">
        <img src={BackIcon} alt="Back" className="h-12 w-12" />
      </Link>
      <h1 className="mt-7 text-center text-2xl mb-4">{courseData.name}</h1>

      {/* Course Content */}
      <div className="p-4">
        <div style={{}}>
          <div
            dangerouslySetInnerHTML={{ __html: courseData.content }}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
          />
        </div>
      </div>

      <div className="px-5 w-full">
        <Button label="Suivant" width="100%" onClick={() => setState("quiz")} />
      </div>
    </div>
  );
}

export default Course;
