import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const titleUrl = project.url || (project.title === 'PACMAN' ? 'https://pacman-web-seven.vercel.app/' : null);

  return (
    <article className="project-card-wrap">
      <div className="project-card">
        <img
          src={project.imageUrl}
          alt={`${project.title} project preview`}
          className="project-card__image"
          loading="lazy"
          decoding="async"
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
      {titleUrl ? (
        <a href={titleUrl} target="_blank" rel="noopener noreferrer" className="project-card__title-link">
          <h3 className="project-card__title title-text">
            {project.title}
            <img
              src="/icons/open-in-new-window-svgrepo-com.svg"
              alt=""
              className="project-card__title-icon"
              aria-hidden="true"
            />
          </h3>
        </a>
      ) : (
        <h3 className="project-card__title title-text">{project.title}</h3>
      )}
    </article>
  );
};

export default ProjectCard;
