import React from 'react';

interface IconHeartProps {
  variant?: 'outline' | 'filled';
  size?: number;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function IconHeart({ 
  variant = 'outline', 
  size = 16, 
  color = '#F5F5F5',
  className = '',
  onClick
}: IconHeartProps) {
  if (variant === 'filled') {
    return (
      <div 
        className={`relative ${className}`} 
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        <svg 
          className="block size-full" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 24 24"
        >
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill={color}
          />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 24 24"
      >
        <path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}