"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { rewardQuizXp, unlockBadge } from "@/lib/progress";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type QuizData = {
  title: string;
  badge: string;
  passPercent: number;
  xpReward: number;
  questions: QuizQuestion[];
};

const quizzes: Record<string, QuizData> = {
  "1": {
    title: "Git Basics Quiz",
    badge: "Git Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is the main purpose of Git?",
        options: [
          "To host containers",
          "To track code changes",
          "To manage cloud billing",
          "To create Kubernetes clusters",
        ],
        answer: "To track code changes",
      },
      {
        id: 2,
        question: "What does a commit represent in Git?",
        options: [
          "A running container",
          "A saved snapshot of changes",
          "A Docker image",
          "A Kubernetes service",
        ],
        answer: "A saved snapshot of changes",
      },
      {
        id: 3,
        question: "Why are branches useful?",
        options: [
          "They store secrets",
          "They build registries",
          "They allow isolated work before merging",
          "They replace repositories",
        ],
        answer: "They allow isolated work before merging",
      },
    ],
  },
  "2": {
    title: "GitHub / GitLab Quiz",
    badge: "Repo Workflow Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is a repository?",
        options: [
          "A cloud billing report",
          "A place to store code and version history",
          "A Kubernetes node",
          "A Docker command",
        ],
        answer: "A place to store code and version history",
      },
      {
        id: 2,
        question: "What is the purpose of a pull request or merge request?",
        options: [
          "To review code before merging",
          "To run Docker locally",
          "To replace Git entirely",
          "To manage secrets",
        ],
        answer: "To review code before merging",
      },
      {
        id: 3,
        question: "What can GitHub Actions or GitLab CI do?",
        options: [
          "Create cloud bills",
          "Run build, test, and deployment automation",
          "Replace repositories",
          "Host Kubernetes pods directly",
        ],
        answer: "Run build, test, and deployment automation",
      },
    ],
  },
  "3": {
    title: "Docker Quiz",
    badge: "Docker Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is a container?",
        options: [
          "A packaged runtime environment for an app",
          "A Git branch",
          "A cloud invoice",
          "A code review request",
        ],
        answer: "A packaged runtime environment for an app",
      },
      {
        id: 2,
        question: "What is the difference between an image and a container?",
        options: [
          "There is no difference",
          "An image is a blueprint, a container is a running instance",
          "A container stores Git history",
          "An image is only for Kubernetes",
        ],
        answer: "An image is a blueprint, a container is a running instance",
      },
      {
        id: 3,
        question: "What is a Dockerfile used for?",
        options: [
          "To define how to build a Docker image",
          "To create Git repositories",
          "To manage pull requests",
          "To expose Kubernetes ingress",
        ],
        answer: "To define how to build a Docker image",
      },
    ],
  },
  "4": {
    title: "Container Registry Quiz",
    badge: "Registry Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is a container registry used for?",
        options: [
          "To store and distribute container images",
          "To edit Git commits",
          "To manage namespaces",
          "To replace Dockerfiles",
        ],
        answer: "To store and distribute container images",
      },
      {
        id: 2,
        question: "Which of these is AWS container registry?",
        options: ["ACR", "ECR", "Ingress", "Rancher"],
        answer: "ECR",
      },
      {
        id: 3,
        question: "What happens after building an image locally?",
        options: [
          "It is pushed to a registry",
          "It becomes an Ingress rule",
          "It creates a namespace",
          "It deletes the deployment",
        ],
        answer: "It is pushed to a registry",
      },
    ],
  },
  "5": {
    title: "Kubernetes Basics Quiz",
    badge: "K8s Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is Kubernetes mainly used for?",
        options: [
          "Container orchestration",
          "Git history cleanup",
          "Code review",
          "Cloud billing",
        ],
        answer: "Container orchestration",
      },
      {
        id: 2,
        question: "What runs one or more containers in Kubernetes?",
        options: ["Repository", "Pod", "Registry", "Branch"],
        answer: "Pod",
      },
      {
        id: 3,
        question: "What manages rollout and scaling of pods?",
        options: ["Deployment", "Commit", "Dockerfile", "Ingress"],
        answer: "Deployment",
      },
    ],
  },
  "6": {
    title: "Services & Ingress Quiz",
    badge: "Traffic Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What does a Kubernetes Service provide?",
        options: [
          "Stable network access to pods",
          "Git commit history",
          "Container image storage",
          "Cluster billing",
        ],
        answer: "Stable network access to pods",
      },
      {
        id: 2,
        question: "Which service type is internal only by default?",
        options: ["ClusterIP", "NodePort", "LoadBalancer", "Ingress"],
        answer: "ClusterIP",
      },
      {
        id: 3,
        question: "What is Ingress mainly used for?",
        options: [
          "HTTP/HTTPS routing into the cluster",
          "Storing images",
          "Creating commits",
          "Managing Dockerfiles",
        ],
        answer: "HTTP/HTTPS routing into the cluster",
      },
    ],
  },
  "7": {
    title: "Rancher Quiz",
    badge: "Rancher Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What is Rancher?",
        options: [
          "A Kubernetes management platform",
          "A Git provider",
          "A container registry",
          "A build server only",
        ],
        answer: "A Kubernetes management platform",
      },
      {
        id: 2,
        question: "What can Rancher manage?",
        options: [
          "Multiple Kubernetes clusters",
          "Only one Git branch",
          "Only Dockerfiles",
          "Only local images",
        ],
        answer: "Multiple Kubernetes clusters",
      },
      {
        id: 3,
        question: "What do Rancher projects help organize?",
        options: [
          "Namespaces and workloads",
          "Cloud invoices",
          "Git tags only",
          "Browser tabs",
        ],
        answer: "Namespaces and workloads",
      },
    ],
  },
  "8": {
    title: "CI/CD Pipeline Quiz",
    badge: "Pipeline Quiz Starter",
    passPercent: 70,
    xpReward: 20,
    questions: [
      {
        id: 1,
        question: "What does CI/CD automate?",
        options: [
          "Build, test, and deployment flow",
          "Only Git usernames",
          "Only billing exports",
          "Only cluster deletion",
        ],
        answer: "Build, test, and deployment flow",
      },
      {
        id: 2,
        question: "Which step usually comes before deployment?",
        options: [
          "Build and test",
          "Ingress",
          "Namespace delete",
          "Branch removal",
        ],
        answer: "Build and test",
      },
      {
        id: 3,
        question: "What is a common way to troubleshoot a failed pipeline?",
        options: [
          "Check logs and failed stages",
          "Delete the repo immediately",
          "Ignore the error",
          "Remove all pods",
        ],
        answer: "Check logs and failed stages",
      },
    ],
  },
};

export default function QuizPage() {
  const params = useParams();
  const quizId = params?.id as string;
  const quiz = quizzes[quizId];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [xpMessage, setXpMessage] = useState("");
  const [badgeMessage, setBadgeMessage] = useState("");

  if (!quiz) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold">Quiz not found</h1>
      </div>
    );
  }

  const score = useMemo(() => {
    let correct = 0;

    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        correct += 1;
      }
    });

    return correct;
  }, [quiz.questions, selectedAnswers]);

  const percent = Math.round((score / quiz.questions.length) * 100);
  const passed = percent >= quiz.passPercent;

  function handleSelect(questionId: number, option: string) {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitted(true);

    if (passed) {
      const totalXp = await rewardQuizXp(Number(quizId), quiz.xpReward);
      await unlockBadge(quiz.badge);
      setXpMessage(`Quiz passed. Total XP: ${totalXp}`);
      setBadgeMessage(`Badge Unlocked: ${quiz.badge}`);
    } else {
      setXpMessage("Quiz not passed yet. Review the lessons and try again.");
      setBadgeMessage("");
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-2 text-4xl font-bold">{quiz.title}</h1>
        <p className="mb-8 text-gray-400">
          Pass score: {quiz.passPercent}% • Reward: {quiz.xpReward} XP
        </p>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
            >
              <p className="mb-4 text-xl font-semibold">
                {index + 1}. {question.question}
              </p>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswers[question.id] === option;
                  const isCorrect = submitted && option === question.answer;
                  const isWrongSelected =
                    submitted && isSelected && option !== question.answer;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(question.id, option)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        isCorrect
                          ? "border-green-500 bg-green-900/20"
                          : isWrongSelected
                          ? "border-red-500 bg-red-900/20"
                          : isSelected
                          ? "border-cyan-500 bg-gray-800"
                          : "border-gray-700 bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            submitted ||
            submitting ||
            Object.keys(selectedAnswers).length !== quiz.questions.length
          }
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : submitted ? "Quiz Submitted" : "Submit Quiz"}
        </button>

        {submitted ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <p className="mb-2 text-2xl font-bold">
                Score: {score}/{quiz.questions.length} ({percent}%)
              </p>
              <p className={passed ? "text-green-400" : "text-red-400"}>
                {passed ? "Passed 🎉" : "Not passed"}
              </p>
            </div>

            <div className="rounded-2xl border border-green-700 bg-green-900/20 p-4">
              <p className="text-green-300">{xpMessage}</p>
            </div>

            {badgeMessage ? (
              <div className="rounded-2xl border border-yellow-700 bg-yellow-900/20 p-4">
                <p className="text-yellow-300">{badgeMessage}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}