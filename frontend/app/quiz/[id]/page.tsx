"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const quizzes: Record<
  string,
  {
    title: string;
    question: string;
    options: string[];
    answer: string;
  }
> = {
  "1": {
    title: "Git Basics Quiz",
    question: "What is the main purpose of Git?",
    options: [
      "To host containers",
      "To track code changes",
      "To create Kubernetes clusters",
      "To manage cloud billing",
    ],
    answer: "To track code changes",
  },
};

export default function QuizPage() {
  const params = useParams();
  const id = params?.id as string;
  const quiz = quizzes[id];

  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Quiz not found</h1>
      </div>
    );
  }

  const isCorrect = submitted && selected === quiz.answer;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl">
        <p className="text-lg mb-6">{quiz.question}</p>

        <div className="space-y-3">
          {quiz.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full text-left p-4 rounded-lg border ${
                selected === option
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-700 bg-gray-900"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!selected}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
        >
          Submit Answer
        </button>

        {submitted && (
          <div className="mt-6 text-lg font-medium">
            {isCorrect ? (
              <p className="text-green-400">Correct! 🎉</p>
            ) : (
              <p className="text-red-400">
                Not quite. Correct answer: {quiz.answer}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}