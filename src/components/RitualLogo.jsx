import React from 'react';

const RitualLogo = ({ size = 40, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ritual Celtic Knot Diamond - based on the brand logo */}
    <g transform="translate(50,50)">
      {/* Diamond shape outer */}
      <path
        d="M50,0 L100,50 L50,100 L0,50 Z"
        transform="translate(-50,-50)"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      {/* Inner knot weave pattern */}
      <g stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
        {/* Top-left to bottom-right weave */}
        <path d="M-30,-10 L-10,-30" />
        <path d="M10,30 L30,10" />
        <path d="M-10,-10 L10,10" />
        
        {/* Top-right to bottom-left weave */}
        <path d="M30,-10 L10,-30" />
        <path d="M-10,30 L-30,10" />
        
        {/* Horizontal bars */}
        <path d="M-30,0 L-10,0" />
        <path d="M10,0 L30,0" />
        
        {/* Vertical bars */}
        <path d="M0,-30 L0,-10" />
        <path d="M0,10 L0,30" />
        
        {/* Center knot */}
        <rect x="-8" y="-8" width="16" height="16" rx="2" transform="rotate(45)" />
      </g>
      
      {/* Corner diamonds */}
      <g fill={color}>
        <rect x="-3" y="-3" width="6" height="6" transform="translate(0,-38) rotate(45)" />
        <rect x="-3" y="-3" width="6" height="6" transform="translate(0,38) rotate(45)" />
        <rect x="-3" y="-3" width="6" height="6" transform="translate(-38,0) rotate(45)" />
        <rect x="-3" y="-3" width="6" height="6" transform="translate(38,0) rotate(45)" />
      </g>
    </g>
  </svg>
);

export default RitualLogo;
