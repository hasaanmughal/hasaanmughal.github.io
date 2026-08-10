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
    title: 'PACMAN',
    tags: ['PRODUCT DESIGNER', 'USABILITY TESTER', 'C++'],
    imageUrl: '/pacman-oop-c++.jpg',
    category: 'UX/UI',
    url: 'https://pacman-web-seven.vercel.app/',
  },
  {
    _id: '2',
    title: 'HALAL SCAN',
    tags: ['UI/UX', 'PROTOTYPING', 'FIGMA'],
    imageUrl: '/halal-scan project-card.jpg',
    category: 'WEB DESIGN',
    url: 'https://www.figma.com/proto/fIeY2t0aG5CpTGZ7hHsETz/HalalScan-AHCI-?node-id=62-338&t=zW6iHPqzBAyz0CKH-1&starting-point-node-id=62%3A338',
  },
  {
    _id: '3',
    title: 'QUEUEFREE',
    tags: ['UI/UX', 'PROTOTYPING', 'FIGMA'],
    imageUrl: '/queuefree-projectcard.png',
    category: 'USER RESEARCH',
    url: 'https://www.figma.com/proto/PbdItJpVxvbLl3YTUPsgZS/QueueFree-Final_Version?node-id=1-306',
  },
  {
    _id: '4',
    title: 'BATTLE CITY AI',
    tags: ['PYTHON', 'AI'],
    imageUrl: '/battle-city-AI.png',
    category: 'GAME DESIGN',
  },
];
