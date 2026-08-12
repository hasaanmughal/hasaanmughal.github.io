import React from 'react';
import { applyGlyphInversion } from '../utils/textUtils';
import './Stage1Hero.css';

const Stage1Hero = ({ heroReveal = 0 }) => {
  return (
    <section className="stage-1-hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <h1 id="hero-heading" className={`hero-name${heroReveal > 0.01 ? ' hero-name--collapsed' : ''}`}>
          <span className="text-line">{applyGlyphInversion('HASSAAN')}</span>
          <span className="text-line text-line-mobile">{applyGlyphInversion('MUGHAL')}</span>
        </h1>
      </div>
    </section>
  );
};

export default Stage1Hero;
