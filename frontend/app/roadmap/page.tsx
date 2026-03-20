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

  useEffect(() => {
    const unlocked = [1];

    if (isModuleCompleted([101, 102, 103])) unlocked.push(2);
    if (isModuleCompleted([201, 202, 203])) unlocked.push(3);
    if (isModuleCompleted([301, 302, 303])) unlocked.push(4);
    if (isModuleCompleted([401, 402, 403])) unlocked.push(5);
    if (isModuleCompleted([501, 502, 503])) unlocked.push(6);
    if (isModuleCompleted([601, 602, 603])) unlocked.push(7);
    if (isModuleCompleted([701, 702, 703])) unlocked.push(8);

    setUnlockedModules(unlocked);
  }, []);

  function handleModuleClick(moduleId: number) {
    if (unlockedModules.includes(moduleId)) {
      router.push(`/module/${moduleId}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">DevOps Roadmap</h1>

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
                    ? "bg-slate-800 hover:bg-slate-700 cursor-pointer"
                    : "bg-slate-900 text-gray-500 cursor-not-allowed border border-slate-800"
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