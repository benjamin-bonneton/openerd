import { useEffect, useState } from "react";

const BADGES = [
  {
    id: 1,
    name: "Débutant du Libre",
    description: "Terminer 1 cours.",
    icon: "🥉",
    condition: (completed: number) => completed >= 1,
  },
  {
    id: 2,
    name: "Explorateur du Libre",
    description: "Terminer 5 cours.",
    icon: "🥈",
    condition: (completed: number) => completed >= 5,
  },
  {
    id: 3,
    name: "Expert du Libre",
    description: "Terminer 10 cours.",
    icon: "🥇",
    condition: (completed: number) => completed >= 10,
  },
  {
    id: 4,
    name: "Maître du Libre",
    description: "Terminer tous les cours !",
    icon: "🏆",
    condition: (completed: number, total: number) => completed === total,
  },
];

export default function BadgesBar({ totalCourses }: { totalCourses: number }) {
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(
        localStorage.getItem("completedCourses") || "[]"
      );
      setCompleted(stored.length);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {BADGES.map((badge) => {
        const unlocked =
          badge.condition.length === 2
            ? badge.condition(completed, totalCourses)
            : badge.condition(completed);
        return (
          <div
            key={badge.id}
            className={`flex flex-col items-center px-3 py-2 rounded shadow transition-all duration-300 ${
              unlocked
                ? "bg-yellow-100 text-yellow-800 scale-105"
                : "bg-gray-100 text-gray-400 opacity-60"
            }`}
            title={badge.description}
          >
            <span className="text-3xl mb-1">{badge.icon}</span>
            <span className="text-xs font-semibold">{badge.name}</span>
          </div>
        );
      })}
    </div>
  );
}
