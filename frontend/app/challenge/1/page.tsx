"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { addXp, unlockBadge } from "@/lib/progress";

const correctOrder = [
  "Code",
  "Build",
  "Docker Image",
  "Push to Registry",
  "Deploy to Kubernetes",
];

const challengeBadge = "CI/CD Starter";
const challengeXp = 50;

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab rounded-xl border border-gray-700 bg-gray-800 p-4 text-lg active:cursor-grabbing"
    >
      {id}
    </div>
  );
}

export default function ChallengePage() {
  const [items, setItems] = useState([
    "Docker Image",
    "Code",
    "Deploy to Kubernetes",
    "Build",
    "Push to Registry",
  ]);

  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));

    setItems((currentItems) => arrayMove(currentItems, oldIndex, newIndex));
  }

  async function checkAnswer() {
    setSubmitting(true);
    setSubmitted(true);

    const isCorrect = JSON.stringify(items) === JSON.stringify(correctOrder);

    if (isCorrect) {
      const totalXp = await addXp(challengeXp);
      await unlockBadge(challengeBadge);

      setResult("Correct! You completed the CI/CD challenge.");
      setXp(totalXp);
      setBadgeUnlocked(true);
    } else {
      setResult("Not quite. Reorder the steps and try again.");
      setXp(0);
      setBadgeUnlocked(false);
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">Arrange CI/CD Pipeline</h1>

        <p className="mb-8 text-gray-400">
          Drag and drop the steps into the correct order.
        </p>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {items.map((item) => (
                  <SortableItem key={item} id={item} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            type="button"
            onClick={checkAnswer}
            disabled={submitting}
            className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Challenge"}
          </button>

          {submitted ? (
            <div className="mt-6 space-y-3">
              <p
                className={`text-lg font-semibold ${
                  badgeUnlocked ? "text-green-400" : "text-red-400"
                }`}
              >
                {result}
              </p>

              {badgeUnlocked ? (
                <>
                  <div className="rounded-xl border border-green-700 bg-green-900/30 p-4">
                    <p className="font-medium text-green-300">Total XP: {xp}</p>
                  </div>

                  <div className="rounded-xl border border-yellow-700 bg-yellow-900/30 p-4">
                    <p className="font-medium text-yellow-300">
                      Badge Unlocked: {challengeBadge}
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-red-700 bg-red-900/20 p-4">
                  <p className="text-red-300">XP: {xp}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}