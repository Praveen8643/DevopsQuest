const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function fetchModules() {
  const res = await fetch(`${API_BASE}/modules`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch modules');
  return res.json();
}
