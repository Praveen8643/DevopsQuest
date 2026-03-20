"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  completeLesson,
  getCompletedLessons,
  rewardLessonXp,
} from "@/lib/progress";

const lessonContent: Record<string, { title: string; content: string }> = {
  "101": {
    title: "What is Git?",
    content:
      "Git is a version control system that helps track code changes over time. It allows developers to collaborate, restore previous versions, and manage project history safely.",
  },
  "102": {
    title: "Commits and Version History",
    content:
      "A commit is a saved snapshot of your changes. Git keeps a history of commits so you can understand what changed, when it changed, and who changed it.",
  },
  "103": {
    title: "Branches and Merging",
    content:
      "Branches let you work on features or fixes without affecting the main codebase. Merging combines those changes back into the main branch after review or testing.",
  },
  "201": {
    title: "Repositories",
    content:
      "A repository stores your code and its full version history. GitHub and GitLab host repositories online so teams can collaborate and manage projects centrally.",
  },
  "202": {
    title: "Pull Requests and Merge Requests",
    content:
      "A pull request or merge request is how developers propose changes for review before merging into the main branch. This improves code quality and teamwork.",
  },
  "203": {
    title: "CI/CD Basics",
    content:
      "CI/CD automates the process of testing and deploying code. In GitHub or GitLab, pipelines can run builds, tests, and deployments whenever code changes are pushed.",
  },
  "301": {
    title: "What is a Container?",
    content:
      "A container packages an application and its dependencies so it can run consistently across environments. Docker is the most common tool used to create and run containers.",
  },
  "302": {
    title: "Images vs Containers",
    content:
      "An image is a read-only blueprint, while a container is a running instance of that image. You build an image once and run it many times as containers.",
  },
  "303": {
    title: "Dockerfile Basics",
    content:
      "A Dockerfile is a text file containing instructions to build a Docker image. It defines the base image, copied files, installed packages, and startup command.",
  },
  "401": {
    title: "What is a Container Registry?",
    content:
      "A container registry is a storage and distribution system for container images. Teams use registries to version, share, and pull images during deployment workflows.",
  },
  "402": {
    title: "Docker Hub vs ECR vs ACR",
    content:
      "Docker Hub is a public and private image registry, ECR is Amazon’s managed container registry, and ACR is Azure’s managed registry. All help store and distribute images securely.",
  },
  "403": {
    title: "Push and Pull Workflow",
    content:
      "Developers build an image locally, push it to a registry, and later deployment systems pull the image from that registry into target environments like Kubernetes.",
  },
  "501": {
    title: "What is Kubernetes?",
    content:
      "Kubernetes is a container orchestration platform used to deploy, manage, and scale containerized applications across clusters of machines.",
  },
  "502": {
    title: "Pods, Deployments, and Services",
    content:
      "Pods run containers, Deployments manage replica rollout and updates, and Services provide stable networking access to pods.",
  },
  "503": {
    title: "Namespaces and Scaling",
    content:
      "Namespaces logically separate workloads in a cluster, while scaling increases or decreases the number of running pod replicas based on need.",
  },
  "601": {
    title: "What is a Service?",
    content:
      "A Kubernetes Service gives stable network access to a group of pods. It helps applications communicate reliably even when pods are recreated.",
  },
  "602": {
    title: "ClusterIP, NodePort, LoadBalancer",
    content:
      "ClusterIP exposes traffic internally, NodePort exposes through a node port, and LoadBalancer exposes through an external load balancer in cloud environments.",
  },
  "603": {
    title: "What is Ingress?",
    content:
      "Ingress manages HTTP and HTTPS routing into Kubernetes, allowing path-based and host-based traffic routing to backend services.",
  },
  "701": {
    title: "What is Rancher?",
    content:
      "Rancher is a container management platform that helps teams manage multiple Kubernetes clusters through a centralized UI and control plane.",
  },
  "702": {
    title: "Managing Clusters with Rancher",
    content:
      "Rancher can provision, import, and manage Kubernetes clusters across different environments, making operations easier for platform teams.",
  },
  "703": {
    title: "Projects and Namespaces",
    content:
      "In Rancher, projects organize namespaces and workloads, helping teams separate applications, environments, and access controls.",
  },
  "801": {
    title: "What is CI/CD?",
    content:
      "CI/CD stands for Continuous Integration and Continuous Delivery or Deployment. It automates software build, test, and release workflows.",
  },
  "802": {
    title: "Build, Test, and Deploy Flow",
    content:
      "A typical pipeline compiles code, runs tests, builds artifacts or images, pushes them to a registry, and deploys them to a target environment.",
  },
  "803": {
    title: "Pipeline Troubleshooting Basics",
    content:
      "Troubleshooting a pipeline means checking logs, failed stages, artifact issues, environment variables, and deployment step outputs to find the root cause.",
  },
};

export default function LessonPage() {
  const params = useParams();
  const id = params?.id as string;

  const lesson = lessonContent[id];
  const lessonId = Number(id);

  const [done, setDone] = useState(false);
  const [xpMessage, setXpMessage] = useState("");

  useEffect(() => {
    const completed = getCompletedLessons();
    setDone(completed.includes(lessonId));
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Lesson not found</h1>
      </div>
    );
  }

  function handleComplete() {
    completeLesson(lessonId);
    const totalXp = rewardLessonXp(lessonId, 10);
    setDone(true);
    setXpMessage(`Lesson completed. Total XP: ${totalXp}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        <div className="bg-gray-800 p-6 rounded-lg text-gray-200 leading-7">
          {lesson.content}
        </div>

        <button
          type="button"
          onClick={handleComplete}
          disabled={done}
          className="mt-6 bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
        >
          {done ? "Lesson Completed ✓" : "Mark Lesson Complete"}
        </button>

        {xpMessage && (
          <div className="mt-4 bg-green-900/30 border border-green-700 rounded-xl p-4">
            <p className="text-green-300">{xpMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}