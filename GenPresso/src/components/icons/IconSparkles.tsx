import React from 'react';

interface IconSparklesProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function IconSparkles({
  className = '',
  size = 16,
  color = 'currentColor',
  onClick,
}: IconSparklesProps) {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size, color }}
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v16m0-16l-5 5m5-5l5 5" />
      </svg>
    </div>
  );
}