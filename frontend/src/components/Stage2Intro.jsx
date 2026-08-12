import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import StructuralNode from './StructuralNode';
import './Stage2Intro.css';

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

const Stage2Intro = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  // On mobile, freeze parallax values so the sticky strip doesn't scrub
  const stripHeight = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['0vh', '0vh'] : ['15vh', '0vh']
  );
  const stripOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    isMobile ? [0, 0] : [1, 0]
  );

  return (
    <section ref={ref} className="stage-2-intro section-transition-contrast">
      {/* Parallax cloud strip — hidden on mobile to eliminate scroll lag */}
      {!isMobile && (
        <motion.div
          className="s2-sticky-strip"
          style={{ height: stripHeight, opacity: stripOpacity }}
        >
          <div className="s2-cloud-container">
            <motion.div
              className="s2-orb s2-orb-1"
              animate={{ x: ['0vw', '40vw', '0vw'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="s2-orb s2-orb-2"
              animate={{ x: ['0vw', '-40vw', '0vw'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="s2-orb s2-orb-3"
              animate={{ x: ['0vw', '30vw', '0vw'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="s2-white-fade" />
          </div>
        </motion.div>
      )}

      <div className="intro-grid">
        <div className="intro-left-col">
          <SectionLabel>INTRO</SectionLabel>
        </div>
        <div className="intro-right-col">
          <StructuralNode size={14} color="#000000" className="intro-node" />
          <motion.h2
            className="intro-headline title-text"
            initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
            transition={{ duration: isMobile ? 0.25 : 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            Experienced software engineer and MERN stack enthusiast, adept at crafting efficient, user-friendly web applications. Eager to learn and stay updated with the latest industry trends. Skilled in full-stack development, collaborating with cross-functional teams to deliver high-quality products. Seeking new opportunities for professional growth and contribution to company success.
          </motion.h2>
          <div className="intro-divider" />
          <motion.div
            className="intro-stats"
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01, margin: "0px 0px -50px 0px" }}
            transition={{ duration: isMobile ? 0.25 : 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="stat-item">
              <span className="stat-value">2+</span>
              <span className="stat-label mono-label">Years of Practice</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">8+</span>
              <span className="stat-label mono-label">Projects Shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">DEVELOPMENT</span>
              <span className="stat-label mono-label">Core Discipline</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stage2Intro;
