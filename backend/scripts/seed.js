require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');

const seedProjects = [
  {
    title: 'Matching Cards',
    tags: ['PRODUCT DESIGNER', 'USABILITY TESTER'],
    imageUrl: 'https://picsum.photos/seed/matching/800/600',
    category: 'UX/UI',
  },
  {
    title: 'The Road Home',
    tags: ['WEB DESIGN', 'UX/UI'],
    imageUrl: 'https://picsum.photos/seed/roadhome/800/600',
    category: 'WEB DESIGN',
  },
  {
    title: 'Pulse Analytics',
    tags: ['USER RESEARCH', 'PRODUCT DESIGNER'],
    imageUrl: 'https://picsum.photos/seed/pulse/800/600',
    category: 'USER RESEARCH',
  },
  {
    title: 'Neon Quest',
    tags: ['GAME DESIGN', 'UX/UI'],
    imageUrl: 'https://picsum.photos/seed/neonquest/800/600',
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
