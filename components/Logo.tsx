
import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#2DD4BF" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L4 6V12C4 16.97 7.58 21.5 12 22C16.42 21.5 20 16.97 20 12V6L12 2Z"
      fill="url(#logoGradient)" 
    />
    <path 
      d="M9 9V14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14V9"
      stroke="#FFFFFF" 
      strokeOpacity="0.9"
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default Logo;
