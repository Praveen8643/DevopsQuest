import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="card text-center">
        <h1 className="mb-4 text-4xl font-bold">Learn DevOps like a game</h1>
        <p className="mx-auto max-w-2xl text-slate-300">
          Master GitHub, GitLab, Docker, registries, Kubernetes, Rancher, and Ingress through quests, quizzes, and drag-and-drop challenges.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/signup" className="btn-primary">Start Learning</Link>
          <Link href="/roadmap" className="rounded-xl border border-slate-700 px-4 py-2">View Roadmap</Link>
        </div>
      </section>
    </div>
  );
}
