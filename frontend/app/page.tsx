export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-5xl font-bold mb-6 text-center">
        DevOps Quest 🚀
      </h1>

      <p className="text-lg text-gray-400 text-center max-w-2xl mb-8">
        Learn DevOps like a game. Master Git, Docker, Kubernetes, CI/CD and more
        through interactive challenges and real-world scenarios.
      </p>

      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Start Learning
        </a>

        <a
          href="/roadmap"
          className="border border-gray-600 px-6 py-3 rounded-lg"
        >
          View Roadmap
        </a>
      </div>

      <div className="mt-16 text-gray-500 text-sm">
        Built with ❤️ for DevOps beginners
      </div>
    </main>
  );
}
