import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/capabilities';
import { fetchProjects, fallbackProjects } from '../services/api';
import StructuralNode from './StructuralNode';
import ProjectCard from './ProjectCard';
import './Stage5Projects.css';

/** Detect mobile once on mount (≤68px). */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

const Stage5Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.length ? data : fallbackProjects))
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  const normalizedProjects = projects.map((project) => {
    if (project.title === 'Matching Cards' || project.imageUrl === '/pacman-oop-c++.jpg') {
      return {
        ...project,
        title: 'PACMAN',
      };
    }
    return project;
  });

  const filtered = activeCategory
    ? normalizedProjects.filter((p) => p.category === activeCategory)
    : normalizedProjects;

  return (
    <section className="stage-5-projects section-transition-contrast" id="projects" aria-labelledby="projects-heading">
      <div className="projects-header safe-area">
        <h2 id="projects-heading" className="projects-mega-title display-text">SELECTED WORKS</h2>
        <div className="projects-categories">
          {categories.map((cat, i) => (
            <React.Fragment key={cat}>
              {i === 2 && <StructuralNode size={10} color="#000" />}
              <button
                type="button"
                className={`projects-cat mono-label ${activeCategory === cat ? 'projects-cat--active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="projects-grid safe-area">
        {loading ? (
          <p className="projects-loading mono-label">LOADING PROJECTS...</p>
        ) : (
          filtered.map((project, i) => (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
              transition={{ duration: isMobile ? 0.25 : 0.4, delay: isMobile ? 0 : i * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default Stage5Projects;
