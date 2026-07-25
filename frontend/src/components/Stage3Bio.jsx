import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { bioContent } from '../data/bioContent';
import SectionLabel from './SectionLabel';
import StructuralNode from './StructuralNode';
import './Stage3Bio.css';

const Stage3Bio = () => {
  const { introduction, education, backstory, skills } = bioContent;
  const highlightedQuote = '"You bring the vision. I’ll bring the engine."';
  const [beforeQuote, afterQuote] = introduction.split(highlightedQuote);

  return (
    <section className="stage-3-bio section-transition-contrast">
      <div className="bio-row bio-row--white">
        <div className="bio-grid">
          <SectionLabel>INTRODUCTION</SectionLabel>
          <p className="bio-intro-text body-text">
            {beforeQuote}
            {highlightedQuote ? (
              <span className="bio-intro-quote">{highlightedQuote}</span>
            ) : null}
            {afterQuote}
          </p>
        </div>
      </div>

      <div className="bio-divider" />

      <div className="bio-row bio-row--gray">
        <div className="bio-grid">
          <SectionLabel>EDUCATION</SectionLabel>
          <div className="education-row">
            {education.map((item) => (
              <motion.div
                key={item.id}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`education-logo ${item.logo ? 'education-logo--image' : ''}`}
                  style={!item.logo ? { backgroundColor: item.color } : undefined}
                >
                  {item.logo ? (
                    <img src={item.logo} alt={item.institution} className="education-logo-image" />
                  ) : (
                    item.initials
                  )}
                </div>
                <h3 className="education-degree title-text">{item.degree}</h3>
                <p className="education-meta mono-label">{item.institution} · {item.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bio-divider" />

      <div className="bio-row bio-row--white">
        <div className="bio-grid">
          <SectionLabel>BACKSTORY</SectionLabel>
          <div className="registry">
            <div className="registry-labels">
              {backstory.map((row) => (
                <span key={row.key} className="registry-key mono-label">{row.key}</span>
              ))}
            </div>
            <div className="registry-values">
              {backstory.map((row) => (
                <span key={row.key} className="registry-value title-text">{row.value}</span>
              ))}
            </div>
          </div>
          <StructuralNode size={10} color="rgba(0,0,0,0.15)" className="bio-anchor-dot" />
        </div>
      </div>

      <div className="bio-divider" />

      <div className="bio-row bio-row--gray">
        <div className="bio-grid">
          <SectionLabel>SKILLS</SectionLabel>
          <div className="skills-block">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-row">
                <span className="skill-name mono-label">{skill.name}</span>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                  <div className="skill-bar-tip" />
                </div>
              </div>
            ))}
            <div className="skill-locked">
              <Lock size={20} strokeWidth={1.5} />
              <span className="mono-label">HIRE TO UNLOCK OTHER ABILITY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stage3Bio;
