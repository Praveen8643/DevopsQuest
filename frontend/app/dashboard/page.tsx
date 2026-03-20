"use client";

import { useEffect, useState } from "react";
import {
  getXp,
  getBadges,
  getCompletedLessons,
  getTotalLessons,
  getProgressPercent,
} from "@/lib/progress";

export default function Dashboard() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    setXp(getXp());
    setBadges(getBadges());
    setCompletedLessons(getCompletedLessons());
    setTotalLessons(getTotalLessons());
    setProgressPercent(getProgressPercent());
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Track your DevOps Quest journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">XP Points</h2>
            <p className="text-3xl font-bold text-cyan-400">{xp}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">Badges</h2>
            <p className="text-3xl font-bold text-yellow-400">
              {badges.length}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">Lessons Completed</h2>
            <p className="text-3xl font-bold text-green-400">
              {completedLessons.length}/{totalLessons}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
            <p className="text-3xl font-bold text-purple-400">
              {progressPercent}%
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-lg font-medium">Learning Progress</span>
            <span className="text-gray-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Progress</h2>
          <div className="space-y-3 text-gray-300">
            <p>• XP earned so far: {xp}</p>
            <p>• Badges unlocked: {badges.length}</p>
            <p>• Lessons completed: {completedLessons.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="/roadmap"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Continue Learning
          </a>

          <a
            href="/badges"
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold"
          >
            View Badges
          </a>

          <a
            href="/module/1"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Go to Git Module
          </a>
        </div>
      </div>
    </div>
  );
}