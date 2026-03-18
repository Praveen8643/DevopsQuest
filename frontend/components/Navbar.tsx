import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-cyan-400">DevOps Quest</Link>
        <div className="flex gap-4 text-sm text-slate-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/badges">Badges</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
