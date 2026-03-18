import Badge from '../../components/Badge';

export default function BadgesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Badges</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Badge name="Git Explorer" />
        <Badge name="Docker Builder" />
        <Badge name="Pipeline Starter" />
      </div>
    </div>
  );
}
