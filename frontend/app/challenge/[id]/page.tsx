export default function ChallengePage({ params }: { params: { id: string } }) {
  const items = ['Code', 'Build Image', 'Push to Registry', 'Deploy to Kubernetes'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Challenge {params.id}</h1>
      <div className="card space-y-4">
        <p className="text-slate-300">Arrange the CI/CD steps in the correct order.</p>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="cursor-move rounded-xl bg-slate-800 p-3">{item}</div>
          ))}
        </div>
        <button className="btn-primary">Submit Challenge</button>
      </div>
    </div>
  );
}
