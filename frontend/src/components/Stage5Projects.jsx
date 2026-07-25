import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/capabilities';
import { fetchProjects, fallbackProjects } from '../services/api';
import StructuralNode from './StructuralNode';
import ProjectCard from './ProjectCard';
import './Stage5Projects.css';

const Stage5Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.length ? data : fallbackProjects))
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <section className="stage-5-projects section-transition-contrast" id="projects">
      <div className="projects-header safe-area">
        <h2 className="projects-mega-title display-text">SELECTED WORKS</h2>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
