import CourseCard from "@components/courses/CourseCard";
import Divider from "@components/Divider";
import { getCourses } from "@hooks/courses";

import { useEffect, useState } from "react";

function CoursesList() {
  const courses = getCourses();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(
        localStorage.getItem("completedCourses") || "[]"
      );
      setCompleted(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollId = localStorage.getItem("scrollToCourseId");
      if (scrollId) {
        const el = document.getElementById(`course-card-${scrollId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        localStorage.removeItem("scrollToCourseId");
      }
    }
  }, [courses]);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      {courses.map((course: any, i: number) => {
        const isCurrentCompleted = completed.includes(
          String(course.id || i + 1)
        );
        const nextCourse = courses[i + 1];
        const isNextCompleted =
          nextCourse && completed.includes(String(nextCourse.id || i + 2));
        return (
          <>
            <CourseCard
              key={course.id || i}
              title={course.name}
              linkTo={`/course/${course.id || i + 1}`}
              isCompleted={isCurrentCompleted}
              id={`course-card-${course.id || i + 1}`}
            />
            {i < courses.length - 1 && (
              <Divider
                color={
                  isCurrentCompleted && isNextCompleted
                    ? "var(--color-primary)"
                    : undefined
                }
              />
            )}
          </>
        );
      })}
    </div>
  );
}

export default CoursesList;
