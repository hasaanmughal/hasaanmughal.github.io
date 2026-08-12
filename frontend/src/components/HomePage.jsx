import React from 'react';
import Stage1Hero from './Stage1Hero';
import Stage2Intro from './Stage2Intro';
import Stage5Projects from './Stage5Projects';
import Stage7Contact from './Stage7Contact';

const HomePage = ({ heroRef, stage2Ref, stage6Ref, cloudState, heroReveal, onNavigate }) => {
  return (
    <main className="app-container wave-container" data-cloud-state={cloudState}>
      <div className="hero-glow-mask" aria-hidden="true">
        <div className="hero-glow">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
      </div>

      <div ref={heroRef} id="hero">
        <Stage1Hero heroReveal={heroReveal} />
      </div>

      <div ref={stage2Ref}>
        <Stage2Intro />
      </div>

      <div id="projects">
        <Stage5Projects />
      </div>

      <Stage7Contact onNavigate={onNavigate} />
    </main>
  );
};

export default HomePage;
