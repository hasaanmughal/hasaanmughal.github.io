const API_BASE = '/api';

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export const fallbackProjects = [
  {
    _id: '1',
    title: 'Matching Cards',
    tags: ['PRODUCT DESIGNER', 'USABILITY TESTER'],
    imageUrl: 'https://picsum.photos/seed/matching/800/600',
    category: 'UX/UI',
  },
  {
    _id: '2',
    title: 'The Road Home',
    tags: ['WEB DESIGN', 'UX/UI'],
    imageUrl: 'https://picsum.photos/seed/roadhome/800/600',
    category: 'WEB DESIGN',
  },
  {
    _id: '3',
    title: 'Pulse Analytics',
    tags: ['USER RESEARCH', 'PRODUCT DESIGNER'],
    imageUrl: 'https://picsum.photos/seed/pulse/800/600',
    category: 'USER RESEARCH',
  },
  {
    _id: '4',
    title: 'Neon Quest',
    tags: ['GAME DESIGN', 'UX/UI'],
    imageUrl: 'https://picsum.photos/seed/neonquest/800/600',
    category: 'GAME DESIGN',
  },
];
