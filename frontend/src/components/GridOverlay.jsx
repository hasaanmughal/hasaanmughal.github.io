import React from 'react';

const GridOverlay = ({ variant = 'dark', className = '' }) => (
  <div
    className={`grid-overlay grid-overlay--${variant} ${className}`}
    aria-hidden="true"
  />
);

export default GridOverlay;
