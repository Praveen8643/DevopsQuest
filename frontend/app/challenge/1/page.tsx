"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const correctOrder = [
  "Code",
  "Build",
  "Docker Image",
  "Push to Registry",
  "Deploy to Kubernetes",
];

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
      className="bg-gray-800 p-4 rounded-xl cursor-grab active:cursor-grabbing text-lg border border-gray-700"
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

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));

    setItems((currentItems) => arrayMove(currentItems, oldIndex, newIndex));
  }

  function checkAnswer() {
    setSubmitted(true);
    const isCorrect = JSON.stringify(items) === JSON.stringify(correctOrder);

    if (isCorrect) {
      setResult("Correct! You completed the CI/CD challenge.");
      setXp(50);
      setBadgeUnlocked(true);
    } else {
      setResult("Not quite. Reorder the steps and try again.");
      setXp(0);
      setBadgeUnlocked(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Arrange CI/CD Pipeline</h1>

        <p className="text-gray-400 mb-8">
          Drag and drop the steps into the correct order.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
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
            className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-lg"
          >
            Submit Challenge
          </button>

          {submitted && (
            <div className="mt-6 space-y-3">
              <p
                className={`text-lg font-semibold ${
                  badgeUnlocked ? "text-green-400" : "text-red-400"
                }`}
              >
                {result}
              </p>

              {badgeUnlocked && (
                <>
                  <div className="bg-green-900/30 border border-green-700 rounded-xl p-4">
                    <p className="text-green-300 font-medium">+50 XP earned</p>
                  </div>

                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
                    <p className="text-yellow-300 font-medium">
                      Badge Unlocked: CI/CD Starter
                    </p>
                  </div>
                </>
              )}

              {!badgeUnlocked && (
                <div className="bg-red-900/20 border border-red-700 rounded-xl p-4">
                  <p className="text-red-300">XP: {xp}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}