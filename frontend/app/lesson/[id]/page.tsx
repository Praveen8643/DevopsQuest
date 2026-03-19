"use client";

import { useParams } from "next/navigation";

export default function LessonPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-4">
        Lesson {id}
      </h1>

      <p className="text-gray-300 mb-6">
        This is where DevOps concept content will go.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg">
        Example: Git helps track code changes and collaborate efficiently.
      </div>

    </div>
  );
}