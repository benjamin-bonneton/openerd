import CoursesList from "@components/courses/CoursesList";
import BadgesBar from "@components/BadgesBar";

import { useEffect, useState } from "react";

function Courses() {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserPoints(parseInt(localStorage.getItem("userPoints") || "0", 10));
      setUserLevel(parseInt(localStorage.getItem("userLevel") || "1", 10));
    }
  }, []);

  // Get total number of courses for badge logic
  const totalCourses = 16;

  return (
    <div className="mb-8">
      <h1 className="text-center my-8 text-4xl font-bold">OpenERD</h1>
      <h2 className="text-center my-8 text-3xl font-semibold">Les leçons</h2>
      {/* Gamification: Points and Level */}
      <div className="flex justify-center gap-6 mb-4">
        <div className="bg-blue-100 text-blue-700 rounded px-3 py-1 font-semibold">
          Points : {userPoints}
        </div>
        <div className="bg-green-100 text-green-700 rounded px-3 py-1 font-semibold">
          Niveau : {userLevel}
        </div>
      </div>
      {/* Badges progression */}
      <BadgesBar totalCourses={totalCourses} />
      <CoursesList />
    </div>
  );
}

export default Courses;
