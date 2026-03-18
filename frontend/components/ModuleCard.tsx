import Link from 'next/link';

type Props = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
};

export default function ModuleCard({ id, title, description, difficulty }: Props) {
  return (
    <Link href={`/module/${id}`} className="card block hover:border-cyan-500">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300">{difficulty}</span>
      </div>
      <p className="text-sm text-slate-300">{description}</p>
    </Link>
  );
}
