export default function LessonPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lesson {params.id}</h1>
      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">What is Git?</h2>
        <p className="text-slate-300">Git is a distributed version control system that tracks changes in files and helps teams collaborate safely.</p>
        <button className="btn-primary">Mark Complete</button>
      </div>
    </div>
  );
}
