// React
import { Link } from "react-router-dom";

// Types
import type { CourseCardProps } from "../../types/course";

interface CourseCardPropsWithId extends CourseCardProps {
  id?: string;
}

function CourseCard({ title, linkTo, isCompleted, id }: CourseCardPropsWithId) {
  return (
    <Link
      to={linkTo}
      className="flex flex-col justify-center items-center gap-3 cursor-pointer"
      id={id}
    >
      {/* Circle indicator */}
      <div
        className={`h-[100px] w-[100px] rounded-full border-6 relative transition-colors duration-300 ${
          isCompleted
            ? "border-green-500 bg-green-100"
            : "border-gray-400 bg-gray-100"
        }`}
      ></div>
      {/* Course title */}
      <div>{title}</div>
    </Link>
  );
}

export default CourseCard;
