// components/design/C64Logo.tsx
import React from 'react';

// Inline SVG for C64 Logo
const C64Logo: React.FC = () => {
  return (
    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* C64 Body Outline (simplified vector look) */}
      <rect x="10" y="10" width="180" height="130" rx="10" ry="10" fill="#AA0000" stroke="#800000" stroke-width="2"/>
      
      {/* The "C" (Stylized blocky C) */}
      <path d="M10 30 L20 30 L20 120 L10 120 L10 30 Z" fill="#CCCCCC" stroke="#888888" stroke-width="1"/>
      
      {/* The "6" */}
      <path d="M50 30 Q 70 20, 90 30 T 110 30 L110 120 Q 90 130, 70 120 Q 50 130, 50 120 Z" fill="#CCCCCC" stroke="#888888" stroke-width="1"/>
      
      {/* The "4" (Very simplified for CSS/SVG constraints) */}
      <path d="M140 30 L160 30 L160 120 L140 120 Z" fill="#CCCCCC" stroke="#888888" stroke-width="1" />
      
      {/* Branding Text (Pixely style simulation) */}
      <text x="100" y="135" fontFamily="monospace" fontSize="24" fill="#000000" letterSpacing="3">
        C= 64
      </text>

      {/* Subtle connection lines (optional details) */}
      <line x1="20" y1="40" x2="70" y2="40" stroke="#666666" stroke-width="2"/>
      <line x1="90" y1="40" x2="140" y2="40" stroke="#666666" stroke-width="2"/>
    </svg>
  );
};

export default C64Logo;