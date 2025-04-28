import React from 'react';

// Simple SVG trophy icon as a fallback
const TrophyFallback = ({ width = 50, height = 50, fill = "gold" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" 
        fill={fill}
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );
};

export default TrophyFallback;
