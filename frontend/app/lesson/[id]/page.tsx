"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  completeLesson,
  getCompletedLessons,
  rewardLessonXp,
} from "@/lib/progress";

/* ---------- LESSON DATA ---------- */

const lessonContent: Record<
  string,
  { title: string; content: string; moduleId: number }
> = {
  "101": {
    title: "What is Git?",
    content:
      "Git is a version control system that helps track code changes over time.",
    moduleId: 1,
  },
  "102": {
    title: "Commits and Version History",
    content: "A commit is a snapshot of your changes.",
    moduleId: 1,
  },
  "103": {
    title: "Branches and Merging",
    content: "Branches allow parallel development.",
    moduleId: 1,
  },

  "201": {
    title: "Repositories",
    content: "A repository stores your code.",
    moduleId: 2,
  },
  "202": {
    title: "Pull Requests",
    content: "PRs help review code before merge.",
    moduleId: 2,
  },
  "203": {
    title: "CI/CD Basics",
    content: "Automates build and deployment.",
    moduleId: 2,
  },

  "301": {
    title: "What is Docker?",
    content: "Docker packages applications.",
    moduleId: 3,
  },
  "302": {
    title: "Images vs Containers",
    content: "Image = blueprint, container = running instance.",
    moduleId: 3,
  },
  "303": {
    title: "Dockerfile",
    content: "Defines how images are built.",
    moduleId: 3,
  },

  "401": {
    title: "Container Registry",
    content: "Stores Docker images.",
    moduleId: 4,
  },
  "402": {
    title: "ECR vs ACR",
    content: "Cloud registries for images.",
    moduleId: 4,
  },
  "403": {
    title: "Push & Pull",
    content: "Upload/download images.",
    moduleId: 4,
  },

  "501": {
    title: "Kubernetes",
    content: "Container orchestration system.",
    moduleId: 5,
  },
  "502": {
    title: "Pods & Deployments",
    content: "Manage containers.",
    moduleId: 5,
  },
  "503": {
    title: "Scaling",
    content: "Increase/decrease replicas.",
    moduleId: 5,
  },

  "601": {
    title: "Services",
    content: "Expose pods.",
    moduleId: 6,
  },
  "602": {
    title: "LoadBalancer",
    content: "External traffic routing.",
    moduleId: 6,
  },
  "603": {
    title: "Ingress",
    content: "HTTP routing.",
    moduleId: 6,
  },

  "701": {
    title: "Rancher",
    content: "K8s management platform.",
    moduleId: 7,
  },
  "702": {
    title: "Clusters",
    content: "Manage multiple clusters.",
    moduleId: 7,
  },
  "703": {
    title: "Projects",
    content: "Organize workloads.",
    moduleId: 7,
  },

  "801": {
    title: "CI/CD",
    content: "Automation pipelines.",
    moduleId: 8,
  },
  "802": {
    title: "Pipeline Flow",
    content: "Build → Test → Deploy.",
    moduleId: 8,
  },
  "803": {
    title: "Troubleshooting",
    content: "Debug pipelines.",
    moduleId: 8,
  },
};

/* ---------- MODULE LESSON ORDER ---------- */

const moduleLessons: Record<number, number[]> = {
  1: [101, 102, 103],
  2: [201, 202, 203],
  3: [301, 302, 303],
  4: [401, 402, 403],
  5: [501, 502, 503],
  6: [601, 602, 603],
  7: [701, 702, 703],
  8: [801, 802, 803],
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const lesson = lessonContent[id];
  const lessonId = Number(id);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const completed = getCompletedLessons();
    setDone(completed.includes(lessonId));
  }, [lessonId]);

  if (!lesson) {
    return <div className="p-6 text-white">Lesson not found</div>;
  }

  const lessonsInModule = moduleLessons[lesson.moduleId];
  const currentIndex = lessonsInModule.indexOf(lessonId);
  const nextLessonId = lessonsInModule[currentIndex + 1];

  function handleComplete() {
    completeLesson(lessonId);
    rewardLessonXp(lessonId, 10);
    setDone(true);
  }

  function goNext() {
    if (nextLessonId) {
      router.push(`/lesson/${nextLessonId}`);
    } else {
      router.push(`/module/${lesson.moduleId}`);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        {lesson.content}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleComplete}
          disabled={done}
          className="bg-green-600 px-6 py-3 rounded-lg"
        >
          {done ? "Lesson Completed ✓" : "Mark Complete"}
        </button>

        <button
          onClick={() => router.push(`/module/${lesson.moduleId}`)}
          className="bg-gray-700 px-6 py-3 rounded-lg"
        >
          Back to Module
        </button>

        {done && (
          <button
            onClick={goNext}
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            {nextLessonId ? "Next Lesson →" : "Go to Module →"}
          </button>
        )}
      </div>
    </div>
  );
}