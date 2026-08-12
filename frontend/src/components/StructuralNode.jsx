import React from 'react';

const StructuralNode = ({ size = 12, color = 'currentColor', className = '', style = {} }) => (
  <span
    className={`structural-node ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      ...style,
    }}
    aria-hidden="true"
  />
);

export default StructuralNode;
