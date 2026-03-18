import ProgressBar from '../../components/ProgressBar';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          <span className="text-cyan-300">Level 3</span>
        </div>
        <ProgressBar value={35} />
        <p className="mt-3 text-sm text-slate-300">35% complete • 420 XP • 3 badges earned</p>
      </div>
    </div>
  );
}
