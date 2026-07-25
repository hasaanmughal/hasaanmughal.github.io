import React from 'react';
import Stage4About from './Stage4About';
import Stage3Bio from './Stage3Bio';
import Stage6Capabilities from './Stage6Capabilities';

const AboutPage = ({ stage6Ref }) => {
  return (
    <main>
      <Stage4About />
      <Stage3Bio />
      <div ref={stage6Ref}>
        <Stage6Capabilities />
      </div>
    </main>
  );
};

export default AboutPage;
