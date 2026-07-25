import React from 'react';
import Stage1Hero from './Stage1Hero';
import Stage2Intro from './Stage2Intro';
import Stage5Projects from './Stage5Projects';
import Stage6Capabilities from './Stage6Capabilities';
import Stage7Contact from './Stage7Contact';

const HomePage = ({ heroRef, stage6Ref, cloudState }) => {
  return (
    <div className="app-container wave-container" data-cloud-state={cloudState}>
      <div className="hero-glow-mask" aria-hidden="true">
        <div className="hero-glow">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
      </div>

      <div ref={heroRef} id="hero">
        <Stage1Hero />
      </div>

      <Stage2Intro />

      <div id="projects">
        <Stage5Projects />
      </div>

      <div ref={stage6Ref} id="capabilities">
        <Stage6Capabilities />
      </div>

      <Stage7Contact />
    </div>
  );
};

export default HomePage;
