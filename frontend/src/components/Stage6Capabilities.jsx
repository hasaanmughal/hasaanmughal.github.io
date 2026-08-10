import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { capabilities } from '../data/capabilities';
import { techStack } from '../data/techStack';
import SectionLabel from './SectionLabel';
import StructuralNode from './StructuralNode';
import './Stage6Capabilities.css';

/** Detect mobile once on mount (≤768 px). */
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

const TechLogo = ({ tech }) => (
  <div className="tech-logo-card">
    <img
      src={tech.image}
      alt={tech.name}
      className={`tech-logo-image ${tech.id === 'nodejs' ? 'tech-logo-image--large' : ''}`}
      loading="lazy"
      decoding="async"
    />
    <span className="tech-logo mono-label">{tech.name}</span>
  </div>
);

const Stage6Capabilities = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });

  // On mobile: freeze parallax values to skip heavy scroll-scrubbing/repaint
  const waveOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0, 0, 0] : [0, 1, 0]
  );
  const bgProgress = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    isMobile ? [1, 1, 1] : [0, 0.5, 1]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    isMobile ? [0, 0, 0] : [0, 1, 0]
  );

  return (
    <section ref={ref} className="stage-6-capabilities section-transition-contrast" aria-labelledby="capabilities-heading">
      {/* Wave overlay: skip entirely on mobile to remove parallax repaint cost */}
      {!isMobile && (
        <motion.div className="stage-6-wave" style={{ opacity: waveOpacity }}>
          <motion.div className="stage-6-transition-dot" style={{ opacity: dotOpacity }}>
            <StructuralNode size={14} color="#ffffff" />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="stage-6-bg"
        style={{
          opacity: bgProgress,
        }}
      />

      <div className="stage-6-content safe-area">
        <div className="stage-6-grid-lines" aria-hidden="true" />
        <motion.div
          className="stage-6-layout"
          initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
          transition={{ duration: isMobile ? 0.25 : 0.4 }}
        >
          <SectionLabel className="stage-6-label">WHAT I CAN DO</SectionLabel>
          <h2 id="capabilities-heading" className="capabilities-title title-text">I build with the modern stack that scales.</h2>
          <div className="stage-6-main">
            <ul className="capabilities-list">
              {capabilities.map((cap) => (
                <li key={cap} className="capability-item title-text">
                  {cap}
                </li>
              ))}
            </ul>
            <StructuralNode size={10} color="#fff" className="stage-6-node" />
          </div>

          <SectionLabel className="stage-6-label">SOFTWARE</SectionLabel>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.id} className="tech-box">
                <TechLogo tech={tech} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stage6Capabilities;
