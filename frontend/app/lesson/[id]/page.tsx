"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { completeLesson, getCompletedLessons } from "../../../lib/progress";

const lessonContent: Record<string, { title: string; content: string }> = {
  "101": {
    title: "What is Git?",
    content:
      "Git is a version control system that helps track code changes over time. It allows developers to collaborate, restore previous versions, and manage project history safely.",
  },
  "102": {
    title: "Commits and Version History",
    content:
      "A commit is a saved snapshot of your changes. Git keeps a history of commits so you can understand what changed, when it changed, and who changed it.",
  },
  "103": {
    title: "Branches and Merging",
    content:
      "Branches let you work on features or fixes without affecting the main codebase. Merging combines those changes back into the main branch after review or testing.",
  },
  "201": {
    title: "Repositories",
    content:
      "A repository stores your code and its full version history. GitHub and GitLab host repositories online so teams can collaborate and manage projects centrally.",
  },
  "202": {
    title: "Pull Requests and Merge Requests",
    content:
      "A pull request or merge request is how developers propose changes for review before merging into the main branch. This improves code quality and teamwork.",
  },
  "203": {
    title: "CI/CD Basics",
    content:
      "CI/CD automates the process of testing and deploying code. In GitHub or GitLab, pipelines can run builds, tests, and deployments whenever code changes are pushed.",
  },
};

export default function LessonPage() {
  const params = useParams();
  const id = params?.id as string;

  const lesson = lessonContent[id];
  const lessonId = Number(id);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const completed = getCompletedLessons();
    setDone(completed.includes(lessonId));
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Lesson not found</h1>
      </div>
    );
  }

  function handleComplete() {
    completeLesson(lessonId);
    setDone(true);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        <div className="bg-gray-800 p-6 rounded-lg text-gray-200 leading-7">
          {lesson.content}
        </div>

        <button
          type="button"
          onClick={handleComplete}
          disabled={done}
          className="mt-6 bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
        >
          {done ? "Lesson Completed ✓" : "Mark Lesson Complete"}
        </button>
      </div>
    </div>
  );
}