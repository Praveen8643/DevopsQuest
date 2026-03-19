export function getXp(): number {
  if (typeof window === "undefined") return 0;
  const value = localStorage.getItem("devopsquest_xp");
  return value ? Number(value) : 0;
}

export function addXp(amount: number): number {
  const current = getXp();
  const updated = current + amount;
  localStorage.setItem("devopsquest_xp", String(updated));
  return updated;
}

export function getBadges(): string[] {
  if (typeof window === "undefined") return [];
  const value = localStorage.getItem("devopsquest_badges");
  return value ? JSON.parse(value) : [];
}

export function unlockBadge(badge: string): string[] {
  const current = getBadges();
  if (current.includes(badge)) return current;
  const updated = [...current, badge];
  localStorage.setItem("devopsquest_badges", JSON.stringify(updated));
  return updated;
}

export function getCompletedLessons(): number[] {
  if (typeof window === "undefined") return [];
  const value = localStorage.getItem("devopsquest_completed_lessons");
  return value ? JSON.parse(value) : [];
}

export function completeLesson(lessonId: number): number[] {
  const current = getCompletedLessons();
  if (current.includes(lessonId)) return current;
  const updated = [...current, lessonId];
  localStorage.setItem(
    "devopsquest_completed_lessons",
    JSON.stringify(updated)
  );
  return updated;
}