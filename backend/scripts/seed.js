require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');

const seedProjects = [
  {
    title: 'PACMAN',
    tags: ['PRODUCT DESIGNER', 'USABILITY TESTER', 'C++'],
    imageUrl: '/pacman-oop-c++.jpg',
    category: 'UX/UI',
    url: 'https://pacman-web-seven.vercel.app/',
  },
  {
    title: 'HALAL SCAN',
    tags: ['UI/UX', 'PROTOTYPING', 'FIGMA'],
    imageUrl: '/halal-scan project-card.jpg',
    category: 'WEB DESIGN',
    url: 'https://www.figma.com/proto/fIeY2t0aG5CpTGZ7hHsETz/HalalScan-AHCI-?node-id=62-338&t=zW6iHPqzBAyz0CKH-1&starting-point-node-id=62%3A338',
  },
  {
    title: 'QUEUEFREE',
    tags: ['UI/UX', 'PROTOTYPING', 'FIGMA'],
    imageUrl: '/queuefree-projectcard.png',
    category: 'USER RESEARCH',
    url: 'https://www.figma.com/proto/PbdItJpVxvbLl3YTUPsgZS/QueueFree-Final_Version?node-id=1-306',
  },
  {
    title: 'BATTLE CITY AI',
    tags: ['PYTHON', 'AI'],
    imageUrl: '/battle-city-AI.png',
    category: 'GAME DESIGN',
  },
];

async function seed() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
  await mongoose.connect(mongoURI);
  await Project.deleteMany({});
  await Project.insertMany(seedProjects);
  console.log('Seeded', seedProjects.length, 'projects');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
