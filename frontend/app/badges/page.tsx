"use client";

import { useEffect, useState } from "react";
import { getBadges } from "../../lib/progress";

export default function BadgesPage() {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Badges</h1>

        {badges.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">No badges unlocked yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {badges.map((badge) => (
              <div
                key={badge}
                className="bg-yellow-900/20 border border-yellow-700 rounded-2xl p-6"
              >
                <p className="text-yellow-300 text-xl font-semibold">{badge}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}