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

export function getRewardedLessons(): number[] {
  if (typeof window === "undefined") return [];
  const value = localStorage.getItem("devopsquest_rewarded_lessons");
  return value ? JSON.parse(value) : [];
}

export function rewardLessonXp(lessonId: number, amount: number): number {
  const rewarded = getRewardedLessons();

  if (rewarded.includes(lessonId)) {
    return getXp();
  }

  const updatedRewarded = [...rewarded, lessonId];
  localStorage.setItem(
    "devopsquest_rewarded_lessons",
    JSON.stringify(updatedRewarded)
  );

  return addXp(amount);
}

export function getCompletedQuizzes(): number[] {
  if (typeof window === "undefined") return [];
  const value = localStorage.getItem("devopsquest_completed_quizzes");
  return value ? JSON.parse(value) : [];
}

export function rewardQuizXp(quizId: number, amount: number): number {
  const completed = getCompletedQuizzes();

  if (completed.includes(quizId)) {
    return getXp();
  }

  const updatedCompleted = [...completed, quizId];
  localStorage.setItem(
    "devopsquest_completed_quizzes",
    JSON.stringify(updatedCompleted)
  );

  return addXp(amount);
}

export function getTotalLessons(): number {
  return 24;
}

export function getProgressPercent(): number {
  const completed = getCompletedLessons().length;
  const total = getTotalLessons();
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function isModuleCompleted(moduleLessonIds: number[]): boolean {
  const completed = getCompletedLessons();
  return moduleLessonIds.every((id) => completed.includes(id));
}