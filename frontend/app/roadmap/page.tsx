"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isModuleCompleted } from "@/lib/progress";

const modules = [
  {
    id: 1,
    title: "Git Basics",
    lessonIds: [101, 102, 103],
  },
  {
    id: 2,
    title: "GitHub / GitLab",
    lessonIds: [201, 202, 203],
  },
  {
    id: 3,
    title: "Docker",
    lessonIds: [301, 302, 303],
  },
  {
    id: 4,
    title: "Container Registry",
    lessonIds: [401, 402, 403],
  },
  {
    id: 5,
    title: "Kubernetes Basics",
    lessonIds: [501, 502, 503],
  },
  {
    id: 6,
    title: "Services & Ingress",
    lessonIds: [601, 602, 603],
  },
  {
    id: 7,
    title: "Rancher",
    lessonIds: [701, 702, 703],
  },
  {
    id: 8,
    title: "CI/CD Pipeline",
    lessonIds: [801, 802, 803],
  },
];

export default function RoadmapPage() {
  const router = useRouter();
  const [unlockedModules, setUnlockedModules] = useState<number[]>([1]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoadmap() {
      const unlocked = [1];

      if (await isModuleCompleted([101, 102, 103])) unlocked.push(2);
      if (await isModuleCompleted([201, 202, 203])) unlocked.push(3);
      if (await isModuleCompleted([301, 302, 303])) unlocked.push(4);
      if (await isModuleCompleted([401, 402, 403])) unlocked.push(5);
      if (await isModuleCompleted([501, 502, 503])) unlocked.push(6);
      if (await isModuleCompleted([601, 602, 603])) unlocked.push(7);
      if (await isModuleCompleted([701, 702, 703])) unlocked.push(8);

      setUnlockedModules(unlocked);
      setLoading(false);
    }

    loadRoadmap();
  }, []);

  function handleModuleClick(moduleId: number) {
    if (unlockedModules.includes(moduleId)) {
      router.push(`/module/${moduleId}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-10 text-5xl font-bold">DevOps Roadmap</h1>
          <p className="text-gray-400">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-5xl font-bold">DevOps Roadmap</h1>

        <div className="space-y-5">
          {modules.map((module) => {
            const isUnlocked = unlockedModules.includes(module.id);

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => handleModuleClick(module.id)}
                disabled={!isUnlocked}
                className={`w-full rounded-2xl p-6 text-left text-2xl font-medium transition ${
                  isUnlocked
                    ? "cursor-pointer bg-slate-800 hover:bg-slate-700"
                    : "cursor-not-allowed border border-slate-800 bg-slate-900 text-gray-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    {module.id}. {module.title}
                  </span>
                  <span className="text-base">
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}