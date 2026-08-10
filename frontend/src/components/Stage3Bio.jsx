import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { bioContent } from '../data/bioContent';
import SectionLabel from './SectionLabel';
import StructuralNode from './StructuralNode';
import './Stage3Bio.css';

/** Detect mobile once on mount (≤68 px). */
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

const Stage3Bio = () => {
  const { introduction, education, backstory, skills } = bioContent;
  const isMobile = useIsMobile();
  const highlightedQuote = '"You bring the vision. I’ll bring the engine."';
  const [beforeQuote, afterQuote] = introduction.split(highlightedQuote);

  return (
    <section className="stage-3-bio section-transition-contrast">
      <motion.div
        className="bio-row bio-row--white"
        initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
        transition={{ duration: isMobile ? 0.25 : 0.4 }}
      >
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
      </motion.div>

      <div className="bio-divider" />

      <motion.div
        className="bio-row bio-row--gray"
        initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
        transition={{ duration: isMobile ? 0.25 : 0.4 }}
      >
        <div className="bio-grid">
          <SectionLabel>EDUCATION</SectionLabel>
          <div className="education-row">
            {education.map((item) => (
              <motion.div
                key={item.id}
                className="education-card"
                initial={{ opacity: 0, y: isMobile ? 8 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: isMobile ? 0.2 : 0.4 }}
              >
                <div
                  className={`education-logo ${item.logo ? 'education-logo--image' : ''}`}
                  style={!item.logo ? { backgroundColor: item.color } : undefined}
                >
                  {item.logo ? (
                    <img src={item.logo} alt={`${item.institution} logo`} className="education-logo-image" loading="lazy" decoding="async" />
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
      </motion.div>

      <div className="bio-divider" />

      <motion.div
        className="bio-row bio-row--white"
        initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
        transition={{ duration: isMobile ? 0.25 : 0.4 }}
      >
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
      </motion.div>

      <div className="bio-divider" />

      <motion.div
        className="bio-row bio-row--gray"
        initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
        transition={{ duration: isMobile ? 0.25 : 0.4 }}
      >
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
      </motion.div>
    </section>
  );
};

export default Stage3Bio;
