"use client";

import { useEffect, useState } from "react";
import {
  getXp,
  getBadges,
  getCompletedLessons,
  getTotalLessons,
  getProgressPercent,
} from "@/lib/progress";

export default function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    async function loadStats() {
      const xpValue = await getXp();
      const badgesValue = await getBadges();
      const lessonsValue = await getCompletedLessons();
      const totalLessonsValue = getTotalLessons();
      const progressValue = await getProgressPercent();

      setXp(xpValue);
      setBadges(badgesValue);
      setCompletedLessons(lessonsValue);
      setTotalLessons(totalLessonsValue);
      setProgressPercent(progressValue);
      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-4 text-gray-400">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
        <p className="mb-8 text-gray-400">Track your DevOps Quest journey</p>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">XP Points</h2>
            <p className="text-3xl font-bold text-cyan-400">{xp}</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Badges</h2>
            <p className="text-3xl font-bold text-yellow-400">
              {badges.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Lessons Completed</h2>
            <p className="text-3xl font-bold text-green-400">
              {completedLessons.length}/{totalLessons}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Overall Progress</h2>
            <p className="text-3xl font-bold text-purple-400">
              {progressPercent}%
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-3 flex justify-between">
            <span className="text-lg font-medium">Learning Progress</span>
            <span className="text-gray-400">{progressPercent}%</span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Recent Progress</h2>
          <div className="space-y-3 text-gray-300">
            <p>• XP earned so far: {xp}</p>
            <p>• Badges unlocked: {badges.length}</p>
            <p>• Lessons completed: {completedLessons.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="/roadmap"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Continue Learning
          </a>

          <a
            href="/badges"
            className="rounded-lg bg-yellow-600 px-6 py-3 font-semibold hover:bg-yellow-700"
          >
            View Badges
          </a>

          <a
            href="/module/1"
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
          >
            Go to Git Module
          </a>
        </div>
      </div>
    </div>
  );
}