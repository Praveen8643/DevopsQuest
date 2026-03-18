import Link from 'next/link';

export default function ModulePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Module {params.id}</h1>
      <div className="card">
        <h2 className="mb-2 text-xl font-semibold">Git Basics</h2>
        <p className="text-slate-300">Learn commits, branches, merging, and why version control matters in DevOps.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/lesson/1" className="btn-primary">Start Lesson</Link>
          <Link href="/quiz/1" className="rounded-xl border border-slate-700 px-4 py-2">Take Quiz</Link>
        </div>
      </div>
    </div>
  );
}
