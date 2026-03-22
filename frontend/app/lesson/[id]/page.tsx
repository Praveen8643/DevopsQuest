"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  completeLesson,
  getCompletedLessons,
  rewardLessonXp,
} from "@/lib/progress";

const lessonContent: Record<
  string,
  { title: string; content: string; moduleId: number }
> = {
  "101": {
    title: "What is Git?",
    content:
      "Git is a version control system that helps track code changes over time. It allows developers to collaborate, restore previous versions, and manage project history safely.",
    moduleId: 1,
  },
  "102": {
    title: "Commits and Version History",
    content:
      "A commit is a saved snapshot of your changes. Git keeps a history of commits so you can understand what changed, when it changed, and who changed it.",
    moduleId: 1,
  },
  "103": {
    title: "Branches and Merging",
    content:
      "Branches let you work on features or fixes without affecting the main codebase. Merging combines those changes back into the main branch after review or testing.",
    moduleId: 1,
  },
  "201": {
    title: "Repositories",
    content:
      "A repository stores your code and its full version history. GitHub and GitLab host repositories online so teams can collaborate and manage projects centrally.",
    moduleId: 2,
  },
  "202": {
    title: "Pull Requests and Merge Requests",
    content:
      "A pull request or merge request is how developers propose changes for review before merging into the main branch. This improves code quality and teamwork.",
    moduleId: 2,
  },
  "203": {
    title: "CI/CD Basics",
    content:
      "CI/CD automates the process of testing and deploying code. In GitHub or GitLab, pipelines can run builds, tests, and deployments whenever code changes are pushed.",
    moduleId: 2,
  },
  "301": {
    title: "What is a Container?",
    content:
      "A container packages an application and its dependencies so it can run consistently across environments. Docker is the most common tool used to create and run containers.",
    moduleId: 3,
  },
  "302": {
    title: "Images vs Containers",
    content:
      "An image is a read-only blueprint, while a container is a running instance of that image. You build an image once and run it many times as containers.",
    moduleId: 3,
  },
  "303": {
    title: "Dockerfile Basics",
    content:
      "A Dockerfile is a text file containing instructions to build a Docker image. It defines the base image, copied files, installed packages, and startup command.",
    moduleId: 3,
  },
  "401": {
    title: "What is a Container Registry?",
    content:
      "A container registry is a storage and distribution system for container images. Teams use registries to version, share, and pull images during deployment workflows.",
    moduleId: 4,
  },
  "402": {
    title: "Docker Hub vs ECR vs ACR",
    content:
      "Docker Hub is a public and private image registry, ECR is Amazon’s managed container registry, and ACR is Azure’s managed registry. All help store and distribute images securely.",
    moduleId: 4,
  },
  "403": {
    title: "Push and Pull Workflow",
    content:
      "Developers build an image locally, push it to a registry, and later deployment systems pull the image from that registry into target environments like Kubernetes.",
    moduleId: 4,
  },
  "501": {
    title: "What is Kubernetes?",
    content:
      "Kubernetes is a container orchestration platform used to deploy, manage, and scale containerized applications across clusters of machines.",
    moduleId: 5,
  },
  "502": {
    title: "Pods, Deployments, and Services",
    content:
      "Pods run containers, Deployments manage replica rollout and updates, and Services provide stable networking access to pods.",
    moduleId: 5,
  },
  "503": {
    title: "Namespaces and Scaling",
    content:
      "Namespaces logically separate workloads in a cluster, while scaling increases or decreases the number of running pod replicas based on need.",
    moduleId: 5,
  },
  "601": {
    title: "What is a Service?",
    content:
      "A Kubernetes Service gives stable network access to a group of pods. It helps applications communicate reliably even when pods are recreated.",
    moduleId: 6,
  },
  "602": {
    title: "ClusterIP, NodePort, LoadBalancer",
    content:
      "ClusterIP exposes traffic internally, NodePort exposes through a node port, and LoadBalancer exposes through an external load balancer in cloud environments.",
    moduleId: 6,
  },
  "603": {
    title: "What is Ingress?",
    content:
      "Ingress manages HTTP and HTTPS routing into Kubernetes, allowing path-based and host-based traffic routing to backend services.",
    moduleId: 6,
  },
  "701": {
    title: "What is Rancher?",
    content:
      "Rancher is a container management platform that helps teams manage multiple Kubernetes clusters through a centralized UI and control plane.",
    moduleId: 7,
  },
  "702": {
    title: "Managing Clusters with Rancher",
    content:
      "Rancher can provision, import, and manage Kubernetes clusters across different environments, making operations easier for platform teams.",
    moduleId: 7,
  },
  "703": {
    title: "Projects and Namespaces",
    content:
      "In Rancher, projects organize namespaces and workloads, helping teams separate applications, environments, and access controls.",
    moduleId: 7,
  },
  "801": {
    title: "What is CI/CD?",
    content:
      "CI/CD stands for Continuous Integration and Continuous Delivery or Deployment. It automates software build, test, and release workflows.",
    moduleId: 8,
  },
  "802": {
    title: "Build, Test, and Deploy Flow",
    content:
      "A typical pipeline compiles code, runs tests, builds artifacts or images, pushes them to a registry, and deploys them to a target environment.",
    moduleId: 8,
  },
  "803": {
    title: "Pipeline Troubleshooting Basics",
    content:
      "Troubleshooting a pipeline means checking logs, failed stages, artifact issues, environment variables, and deployment step outputs to find the root cause.",
    moduleId: 8,
  },
};

const moduleLessons: Record<number, number[]> = {
  1: [101, 102, 103],
  2: [201, 202, 203],
  3: [301, 302, 303],
  4: [401, 402, 403],
  5: [501, 502, 503],
  6: [601, 602, 603],
  7: [701, 702, 703],
  8: [801, 802, 803],
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const lesson = lessonContent[id];
  const lessonId = Number(id);

  const [done, setDone] = useState(false);
  const [xpMessage, setXpMessage] = useState("");

  useEffect(() => {
    async function loadLessonState() {
      const completed = await getCompletedLessons();
      setDone(completed.includes(lessonId));
    }

    loadLessonState();
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Lesson not found</h1>
      </div>
    );
  }

  const lessonsInModule = moduleLessons[lesson.moduleId];
  const currentIndex = lessonsInModule.indexOf(lessonId);
  const nextLessonId = lessonsInModule[currentIndex + 1];

  async function handleComplete() {
    await completeLesson(lessonId);
    const totalXp = await rewardLessonXp(lessonId, 10);
    setDone(true);
    setXpMessage(`Lesson completed. Total XP: ${totalXp}`);
  }

  function goNext() {
    if (nextLessonId) {
      router.push(`/lesson/${nextLessonId}`);
    } else {
      router.push(`/module/${lesson.moduleId}`);
    }
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        <div className="bg-gray-800 p-6 rounded-lg text-gray-200 leading-7">
          {lesson.content}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleComplete}
            disabled={done}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
          >
            {done ? "Lesson Completed ✓" : "Mark Lesson Complete"}
          </button>

          <button
            type="button"
            onClick={() => router.push(`/module/${lesson.moduleId}`)}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
          >
            Back to Module
          </button>

          {done ? (
            <button
              type="button"
              onClick={goNext}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              {nextLessonId ? "Next Lesson →" : "Go to Module →"}
            </button>
          ) : null}
        </div>

        {xpMessage ? (
          <div className="mt-4 bg-green-900/30 border border-green-700 rounded-xl p-4">
            <p className="text-green-300">{xpMessage}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}