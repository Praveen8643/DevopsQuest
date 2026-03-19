"use client";

import { useRouter } from "next/navigation";

const modules = [
  { id: 1, title: "Git Basics" },
  { id: 2, title: "GitHub / GitLab" },
  { id: 3, title: "Docker" },
  { id: 4, title: "Container Registry" },
  { id: 5, title: "Kubernetes Basics" },
  { id: 6, title: "Services & Ingress" },
  { id: 7, title: "Rancher" },
  { id: 8, title: "CI/CD Pipeline" },
];

export default function RoadmapPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">DevOps Roadmap</h1>

        <div className="space-y-5">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => router.push(`/module/${module.id}`)}
              className="w-full rounded-2xl bg-slate-800 hover:bg-slate-700 transition p-6 text-left text-2xl font-medium"
            >
              {module.id}. {module.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}