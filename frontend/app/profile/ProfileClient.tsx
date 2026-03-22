"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getXp,
  getBadges,
  getCompletedLessons,
  getCompletedQuizzes,
  resetAllProgress,
} from "@/lib/progress";
import { createClient } from "@/lib/supabase/client";

export default function ProfileClient() {
  const router = useRouter();
  const supabase = createClient();

  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  const [loggingOut, setLoggingOut] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      setMounted(true);
      setXp(await getXp());
      setBadges(await getBadges());
      setCompletedLessons(await getCompletedLessons());
      setCompletedQuizzes(await getCompletedQuizzes());
    }

    loadProfile();
  }, []);

  async function handleReset() {
    setResetting(true);
    await resetAllProgress();
    setXp(0);
    setBadges([]);
    setCompletedLessons([]);
    setCompletedQuizzes([]);
    setResetting(false);
  }

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    setLoggingOut(false);
    router.push("/login");
    router.refresh();
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-4xl font-bold">Profile</h1>
          <p className="mb-8 text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold">Profile</h1>
        <p className="mb-8 text-gray-400">
          Review your DevOps Quest progress and account actions.
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
            <h2 className="mb-4 text-2xl font-semibold">Actions</h2>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleReset}
                disabled={resetting}
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {resetting ? "Resetting..." : "Reset My Progress"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg bg-slate-700 px-6 py-3 font-semibold hover:bg-slate-600 disabled:opacity-50"
              >
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
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