"use client";

import { useState } from "react";
import {
  getXp,
  getBadges,
  getCompletedLessons,
  getCompletedQuizzes,
} from "@/lib/progress";

export default function ProfilePage() {
  const [xp, setXp] = useState(getXp());
  const [badges, setBadges] = useState<string[]>(getBadges());
  const [completedLessons, setCompletedLessons] = useState<number[]>(
    getCompletedLessons()
  );
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>(
    getCompletedQuizzes()
  );

  function handleReset() {
    localStorage.removeItem("devopsquest_xp");
    localStorage.removeItem("devopsquest_badges");
    localStorage.removeItem("devopsquest_completed_lessons");
    localStorage.removeItem("devopsquest_rewarded_lessons");
    localStorage.removeItem("devopsquest_completed_quizzes");

    setXp(0);
    setBadges([]);
    setCompletedLessons([]);
    setCompletedQuizzes([]);
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold">Profile</h1>
        <p className="mb-8 text-gray-400">
          Review your DevOps Quest progress and reset for testing if needed.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Your Stats</h2>
            <div className="space-y-3 text-gray-300">
              <p>XP: {xp}</p>
              <p>Badges: {badges.length}</p>
              <p>Completed Lessons: {completedLessons.length}</p>
              <p>Completed Quizzes: {completedQuizzes.length}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Reset Progress</h2>
            <p className="mb-6 text-gray-400">
              This clears XP, badges, lessons, and quiz progress from local
              storage.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
            >
              Reset My Progress
            </button>
          </div>
        </div>

        {badges.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Unlocked Badges</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-xl border border-yellow-700 bg-yellow-900/20 p-4"
                >
                  <p className="font-medium text-yellow-300">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}