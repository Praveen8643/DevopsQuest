export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quiz {params.id}</h1>
      <div className="card space-y-4">
        <p className="font-medium">Which Git command creates a new branch?</p>
        <div className="space-y-2">
          <label className="block rounded-xl bg-slate-800 p-3"><input type="radio" name="q1" className="mr-2" />git new branch</label>
          <label className="block rounded-xl bg-slate-800 p-3"><input type="radio" name="q1" className="mr-2" />git branch</label>
          <label className="block rounded-xl bg-slate-800 p-3"><input type="radio" name="q1" className="mr-2" />git checkout merge</label>
        </div>
        <button className="btn-primary">Submit Quiz</button>
      </div>
    </div>
  );
}
