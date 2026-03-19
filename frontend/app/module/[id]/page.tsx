"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompletedLessons } from "../../../lib/progress";

const moduleData: Record<
  string,
  { title: string; lessons: { id: number; title: string }[] }
> = {
  "1": {
    title: "Git Basics",
    lessons: [
      { id: 101, title: "What is Git?" },
      { id: 102, title: "Commits and Version History" },
      { id: 103, title: "Branches and Merging" },
    ],
  },
  "2": {
    title: "GitHub / GitLab",
    lessons: [
      { id: 201, title: "Repositories" },
      { id: 202, title: "Pull Requests and Merge Requests" },
      { id: 203, title: "CI/CD Basics" },
    ],
  },
  "3": {
    title: "Docker",
    lessons: [
      { id: 301, title: "What is a Container?" },
      { id: 302, title: "Images vs Containers" },
      { id: 303, title: "Dockerfile Basics" },
    ],
  },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const module = moduleData[id];
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
  }, []);

  if (!module) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Module not found</h1>
      </div>
    );
  }

  const completedCount = module.lessons.filter((lesson) =>
    completedLessons.includes(lesson.id)
  ).length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
      <p className="text-gray-400 mb-2">Choose a lesson to begin</p>
      <p className="text-green-400 mb-6">
        Progress: {completedCount}/{module.lessons.length} lessons completed
      </p>

      <div className="space-y-4">
        {module.lessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => router.push(`/lesson/${lesson.id}`)}
              className="w-full bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-left flex justify-between"
            >
              <span>{lesson.title}</span>
              <span className={isDone ? "text-green-400" : "text-gray-500"}>
                {isDone ? "Completed" : "Pending"}
              </span>
            </button>
          );
        })}
      </div>

      {id === "1" && (
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/quiz/1")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Take Git Quiz
          </button>

          <button
            type="button"
            onClick={() => router.push("/challenge/1")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Try DevOps Challenge 🎮
          </button>
        </div>
      )}
    </div>
  );
}