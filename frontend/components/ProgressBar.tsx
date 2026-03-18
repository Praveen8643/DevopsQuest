export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full rounded-full bg-slate-800">
      <div className="h-3 rounded-full bg-cyan-500" style={{ width: `${value}%` }} />
    </div>
  );
}
