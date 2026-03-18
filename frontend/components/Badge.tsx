export default function Badge({ name }: { name: string }) {
  return <div className="card text-center font-semibold text-cyan-300">🏆 {name}</div>;
}
