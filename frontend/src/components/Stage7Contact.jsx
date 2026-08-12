import React from 'react';
import { applySlashRule, applyGlyphInversion } from '../utils/textUtils';
import StructuralNode from './StructuralNode';
import Footer from './Footer';
import './Stage7Contact.css';

const SOCIAL = {
  github: 'https://github.com/cookhassaanmughal',
  linkedin: 'https://www.linkedin.com/in/hassaan-mughal-605603249/',
};

const Stage7Contact = ({ onNavigate }) => {
  return (
    <section className="stage-7-contact section-transition-contrast" id="contact">
      <div className="contact-tier safe-area">
        <span className="contact-end mono-label">[END]</span>
        <h2 className="contact-statement title-text">
          Have a project in mind?<br />
          Let&apos;s build something remarkable together.
        </h2>
        <a href="mailto:hassaanm980@gmail.com" className="contact-cta mono-label" target="_blank" rel="noopener noreferrer">
          LET&apos;S CHAT
        </a>
        <StructuralNode size={14} color="#fff" className="contact-node" />
      </div>

      <div className="social-tier">
        <span className="social-label mono-label">DOWNLOAD RESUME</span>
        <a href="/hassaanmughal-resume.pdf" className="social-link mono-label" target="_blank" rel="noopener noreferrer" aria-label="Download resume">
          <img src="/resume-business-cv-work-job-curriculum-2-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
        </a>
        <span className="social-label mono-label">MORE ABOUT ME?</span>
        <div className="social-row">
          <a href={SOCIAL.github} className="social-link mono-label" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/icons/github-logo.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
          </a>
          <a href={SOCIAL.linkedin} className="social-link mono-label" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/linkedin-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
          </a>
          <a href="mailto:hassaanm980@gmail.com" className="social-link mono-label" aria-label="Email">
            <img src="/mail-svgrepo-com.svg" alt="" className="social-icon" loading="lazy" decoding="async" aria-hidden="true" />
          </a>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </section>
  );
};

export default Stage7Contact;
