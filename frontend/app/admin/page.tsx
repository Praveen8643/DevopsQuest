export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">Create and manage modules</div>
        <div className="card">Create lessons, quizzes, and challenges</div>
      </div>
    </div>
  );
}
