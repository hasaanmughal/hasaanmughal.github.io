import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card-wrap">
      <div className="project-card">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__vignette" />
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag mono-label">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="project-card__title title-text">{project.title}</h3>
    </article>
  );
};

export default ProjectCard;
