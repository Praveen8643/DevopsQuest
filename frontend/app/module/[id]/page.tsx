"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCompletedLessons,
  isModuleCompleted,
  unlockBadge,
  getBadges,
} from "@/lib/progress";

const moduleData: Record<
  string,
  {
    title: string;
    badge: string;
    lessons: { id: number; title: string }[];
  }
> = {
  "1": {
    title: "Git Basics",
    badge: "Git Explorer",
    lessons: [
      { id: 101, title: "What is Git?" },
      { id: 102, title: "Commits and Version History" },
      { id: 103, title: "Branches and Merging" },
    ],
  },
  "2": {
    title: "GitHub / GitLab",
    badge: "Repo Collaborator",
    lessons: [
      { id: 201, title: "Repositories" },
      { id: 202, title: "Pull Requests and Merge Requests" },
      { id: 203, title: "CI/CD Basics" },
    ],
  },
  "3": {
    title: "Docker",
    badge: "Container Starter",
    lessons: [
      { id: 301, title: "What is a Container?" },
      { id: 302, title: "Images vs Containers" },
      { id: 303, title: "Dockerfile Basics" },
    ],
  },
  "4": {
    title: "Container Registry",
    badge: "Registry Explorer",
    lessons: [
      { id: 401, title: "What is a Container Registry?" },
      { id: 402, title: "Docker Hub vs ECR vs ACR" },
      { id: 403, title: "Push and Pull Workflow" },
    ],
  },
  "5": {
    title: "Kubernetes Basics",
    badge: "Kubernetes Starter",
    lessons: [
      { id: 501, title: "What is Kubernetes?" },
      { id: 502, title: "Pods, Deployments, and Services" },
      { id: 503, title: "Namespaces and Scaling" },
    ],
  },
  "6": {
    title: "Services & Ingress",
    badge: "Traffic Router",
    lessons: [
      { id: 601, title: "What is a Service?" },
      { id: 602, title: "ClusterIP, NodePort, LoadBalancer" },
      { id: 603, title: "What is Ingress?" },
    ],
  },
  "7": {
    title: "Rancher",
    badge: "Cluster Operator",
    lessons: [
      { id: 701, title: "What is Rancher?" },
      { id: 702, title: "Managing Clusters with Rancher" },
      { id: 703, title: "Projects and Namespaces" },
    ],
  },
  "8": {
    title: "CI/CD Pipeline",
    badge: "Pipeline Builder",
    lessons: [
      { id: 801, title: "What is CI/CD?" },
      { id: 802, title: "Build, Test, and Deploy Flow" },
      { id: 803, title: "Pipeline Troubleshooting Basics" },
    ],
  },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const module = moduleData[id];
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [moduleBadgeUnlocked, setModuleBadgeUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModuleData() {
      if (!module) {
        setLoading(false);
        return;
      }

      const completed = await getCompletedLessons();
      setCompletedLessons(completed);

      const lessonIds = module.lessons.map((lesson) => lesson.id);
      const completedModule = await isModuleCompleted(lessonIds);

      if (completedModule) {
        await unlockBadge(module.badge);
      }

      const badges = await getBadges();
      setModuleBadgeUnlocked(
        Array.isArray(badges) && (badges.includes(module.badge) || completedModule)
      );

      setLoading(false);
    }

    loadModuleData();
  }, [id, module]);

  if (!module) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Module not found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-400">Loading module...</p>
      </div>
    );
  }

  const completedCount = module.lessons.filter((lesson) =>
    completedLessons.includes(lesson.id)
  ).length;

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
      <p className="text-gray-400 mb-2">Choose a lesson to begin</p>
      <p className="text-green-400 mb-6">
        Progress: {completedCount}/{module.lessons.length} lessons completed
      </p>

      {moduleBadgeUnlocked ? (
        <div className="mb-6 rounded-xl border border-yellow-700 bg-yellow-900/20 p-4">
          <p className="font-medium text-yellow-300">
            Badge Unlocked: {module.badge}
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        {module.lessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => router.push(`/lesson/${lesson.id}`)}
              className="flex w-full justify-between rounded-lg bg-gray-800 p-4 text-left hover:bg-gray-700"
            >
              <span>{lesson.title}</span>
              <span className={isDone ? "text-green-400" : "text-gray-500"}>
                {isDone ? "Completed" : "Pending"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => router.push(`/quiz/${id}`)}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Take Quiz
        </button>

        {id === "1" ? (
          <button
            type="button"
            onClick={() => router.push("/challenge/1")}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
          >
            Try DevOps Challenge 🎮
          </button>
        ) : null}
      </div>
    </div>
  );
}