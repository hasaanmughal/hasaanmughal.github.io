import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import StructuralNode from './StructuralNode';
import './Stage2Intro.css';

const Stage2Intro = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const stripHeight = useTransform(scrollYProgress, [0, 1], ['15vh', '0vh']);
  const stripOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="stage-2-intro section-transition-contrast">
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

      <div className="intro-grid">
        <div className="intro-left-col">
          <SectionLabel>INTRO</SectionLabel>
        </div>
        <div className="intro-right-col">
          <StructuralNode size={14} color="#000000" className="intro-node" />
          <motion.h2
            className="intro-headline title-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            I design digital products that feel as good as they look — blending user empathy, sharp visual systems, and functional logic into experiences people actually enjoy.
          </motion.h2>
          <div className="intro-divider" />
          <motion.div
            className="intro-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="stat-item">
              <span className="stat-value">3+</span>
              <span className="stat-label mono-label">Years of Practice</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12+</span>
              <span className="stat-label mono-label">Projects Shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">UX / UI</span>
              <span className="stat-label mono-label">Core Discipline</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stage2Intro;
