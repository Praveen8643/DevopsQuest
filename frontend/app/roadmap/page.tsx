const modules = [
  "Git Basics",
  "GitHub / GitLab",
  "Docker",
  "Container Registry",
  "Kubernetes Basics",
  "Services & Ingress",
  "Rancher",
  "CI/CD Pipeline"
];

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-8">DevOps Roadmap</h1>

      <div className="grid gap-4">

        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
          >
            <h2 className="text-xl">{index + 1}. {module}</h2>
          </div>
        ))}

      </div>

    </div>
  );
}