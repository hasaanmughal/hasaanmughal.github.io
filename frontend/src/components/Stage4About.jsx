import React from 'react';
import { applySlashRule, applyGlyphInversion } from '../utils/textUtils';
import StructuralNode from './StructuralNode';
import PendulumBadge from './PendulumBadge';
import './Stage4About.css';

const SOCIAL = {
  github: 'https://github.com/cookhassaanmughal',
  linkedin: 'https://www.linkedin.com/in/hassaan-mughal-605603249/',
  instagram: 'https://www.instagram.com/hasaannmughal/',
  twitter: 'https://x.com/hassaanmughal_',
};

const Stage4About = () => {
  return (
    <section className="stage-4-about section-transition-contrast" id="about-hero">
      <div className="about-safe safe-area">
        <StructuralNode size={14} color="#000" className="about-node" />
        <div className="about-title-block">
          <h2 className="about-title display-text">
            {applySlashRule('ABOUT')} {applyGlyphInversion('HASSAAN')}
          </h2>
          <div className="about-social-tier">
            <span className="social-label mono-label">DOWNLOAD RESUME</span>
            <a href="/hassaanmughal-resume.pdf" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Download resume">
              <img src="/resume-business-cv-work-job-curriculum-2-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
            </a>
            <span className="social-label mono-label">CONNECT WITH ME</span>
            <div className="social-row about-social-row">
              <a href={SOCIAL.github} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="/icons/github-logo.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
              </a>
              <a href={SOCIAL.linkedin} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/linkedin-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
              </a>
              <a href="mailto:hassaanm980@gmail.com" className="social-link" aria-label="Email">
                <img src="/mail-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
              </a>
              <a href={SOCIAL.instagram} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/instagram-logo-facebook-2-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
              </a>
              <a href={SOCIAL.twitter} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src="/twitter-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <PendulumBadge />
    </section>
  );
};

export default Stage4About;
