"use client";

import { useEffect, useState } from "react";
import { getXp, getBadges } from "../../lib/progress";

export default function Dashboard() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    setXp(getXp());
    setBadges(getBadges());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <p className="text-gray-400">Core journey started</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">XP Points</h2>
          <p className="text-gray-400">{xp} XP</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Badges</h2>
          <p className="text-gray-400">{badges.length} unlocked</p>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <a
          href="/roadmap"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Continue Learning →
        </a>

        <a
          href="/badges"
          className="bg-yellow-600 px-6 py-3 rounded-lg"
        >
          View Badges
        </a>
      </div>
    </div>
  );
}