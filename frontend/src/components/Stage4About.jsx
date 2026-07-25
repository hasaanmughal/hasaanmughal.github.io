import React from 'react';
import { applySlashRule, applyGlyphInversion } from '../utils/textUtils';
import StructuralNode from './StructuralNode';
import PendulumBadge from './PendulumBadge';
import './Stage4About.css';

const Stage4About = () => {
  return (
    <section className="stage-4-about section-transition-contrast" id="about-hero">
      <div className="about-safe safe-area">
        <StructuralNode size={14} color="#000" className="about-node" />
        <div className="about-title-block">
          <h2 className="about-title display-text">
            {applySlashRule('ABOUT')} {applyGlyphInversion('HASSAAN')}
          </h2>
          <div className="about-greetings">
            <span className="mono-label about-greeting">HELLO</span>
            <span className="mono-label about-greeting">HOLA</span>
          </div>
        </div>
      </div>
      <PendulumBadge />
    </section>
  );
};

export default Stage4About;
