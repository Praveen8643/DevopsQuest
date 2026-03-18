import ModuleCard from '../../components/ModuleCard';

const modules = [
  { id: 1, title: 'Git Basics', description: 'Commits, branches, and merge flow.', difficulty: 'Beginner' },
  { id: 2, title: 'GitHub & GitLab', description: 'Repos, PRs, MRs, and CI basics.', difficulty: 'Beginner' },
  { id: 3, title: 'Docker', description: 'Images, containers, and Dockerfiles.', difficulty: 'Beginner' },
  { id: 4, title: 'Kubernetes', description: 'Pods, deployments, and services.', difficulty: 'Intermediate' },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Learning Roadmap</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <ModuleCard key={module.id} {...module} />
        ))}
      </div>
    </div>
  );
}
