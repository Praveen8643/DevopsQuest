export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md card">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form className="space-y-4">
        <input className="w-full rounded-xl bg-slate-800 p-3" placeholder="Email" />
        <input className="w-full rounded-xl bg-slate-800 p-3" type="password" placeholder="Password" />
        <button className="btn-primary w-full" type="submit">Login</button>
      </form>
    </div>
  );
}
