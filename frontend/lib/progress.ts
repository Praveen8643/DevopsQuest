import { createClient } from "@/lib/supabase/client";

const TOTAL_LESSONS = 24;

async function getCurrentUserId(): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;
  return data.user.id;
}

export async function getXp(): Promise<number> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return 0;

  const { data, error } = await supabase
    .from("user_progress")
    .select("xp")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return 0;
  return data.xp ?? 0;
}

export async function addXp(amount: number): Promise<number> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return 0;

  const currentXp = await getXp();
  const updatedXp = currentXp + amount;

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      xp: updatedXp,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("addXp error:", error.message);
    return currentXp;
  }

  return updatedXp;
}

export async function getBadges(): Promise<string[]> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("user_badges")
    .select("badge")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.badge);
}

export async function unlockBadge(badge: string): Promise<string[]> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { error } = await supabase.from("user_badges").insert({
    user_id: userId,
    badge,
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    console.error("unlockBadge error:", error.message);
  }

  return getBadges();
}

export async function getCompletedLessons(): Promise<number[]> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("completed_lessons")
    .select("lesson_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.lesson_id);
}

export async function completeLesson(lessonId: number): Promise<number[]> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { error } = await supabase.from("completed_lessons").insert({
    user_id: userId,
    lesson_id: lessonId,
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    console.error("completeLesson error:", error.message);
  }

  return getCompletedLessons();
}

export async function rewardLessonXp(
  lessonId: number,
  amount: number
): Promise<number> {
  const completed = await getCompletedLessons();
  const alreadyCompleted = completed.includes(lessonId);

  if (!alreadyCompleted) {
    await completeLesson(lessonId);
  }

  return addXp(amount);
}

export async function getCompletedQuizzes(): Promise<number[]> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("completed_quizzes")
    .select("quiz_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.quiz_id);
}

export async function rewardQuizXp(
  quizId: number,
  amount: number
): Promise<number> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return 0;

  const completedQuizzes = await getCompletedQuizzes();
  if (completedQuizzes.includes(quizId)) {
    return getXp();
  }

  const { error } = await supabase.from("completed_quizzes").insert({
    user_id: userId,
    quiz_id: quizId,
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    console.error("rewardQuizXp error:", error.message);
    return getXp();
  }

  return addXp(amount);
}

export function getTotalLessons(): number {
  return TOTAL_LESSONS;
}

export async function getProgressPercent(): Promise<number> {
  const completed = await getCompletedLessons();
  const total = getTotalLessons();
  if (total === 0) return 0;
  return Math.round((completed.length / total) * 100);
}

export async function isModuleCompleted(
  moduleLessonIds: number[]
): Promise<boolean> {
  const completed = await getCompletedLessons();
  return moduleLessonIds.every((id) => completed.includes(id));
}

export async function resetAllProgress(): Promise<void> {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) return;

  await supabase.from("completed_lessons").delete().eq("user_id", userId);
  await supabase.from("completed_quizzes").delete().eq("user_id", userId);
  await supabase.from("user_badges").delete().eq("user_id", userId);
  await supabase.from("user_progress").delete().eq("user_id", userId);
}