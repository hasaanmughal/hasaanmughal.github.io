import React from 'react';
import { applyGlyphInversion } from '../utils/textUtils';
import './Stage1Hero.css';

const Stage1Hero = () => {
  return (
    <section className="stage-1-hero">
      <div className="hero-content">
        <h1 className="hero-name">
          <span className="text-line">{applyGlyphInversion('HASSAAN')}</span>
        </h1>
        <div className="hero-subtitle-row">
          <p className="hero-subtitle">Product Designer</p>
          <span className="subtitle-sep">/</span>
          <p className="hero-subtitle">Researcher</p>
        </div>
      </div>
    </section>
  );
};

export default Stage1Hero;
