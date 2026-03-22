"use client";

import { useEffect, useState } from "react";
import { getBadges } from "@/lib/progress";

export default function BadgesPage() {
  const [badges, setBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      const badgeList = await getBadges();
      setBadges(badgeList);
      setLoading(false);
    }

    loadBadges();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold">Your Badges</h1>
          <p className="text-gray-400">Loading badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">Your Badges</h1>

        {badges.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400">No badges unlocked yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {badges.map((badge) => (
              <div
                key={badge}
                className="rounded-2xl border border-yellow-700 bg-yellow-900/20 p-6"
              >
                <p className="text-xl font-semibold text-yellow-300">{badge}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}