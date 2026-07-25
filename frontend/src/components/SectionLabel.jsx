import React from 'react';

const SectionLabel = ({ children, className = '' }) => (
  <span className={`section-label mono-label ${className}`}>{children}</span>
);

export default SectionLabel;
