import React from 'react';

interface IconBookmarkProps {
  variant?: 'outline' | 'filled';
  size?: number;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function IconBookmark({ 
  variant = 'outline', 
  size = 16, 
  color = '#F5F5F5',
  className = '',
  onClick
}: IconBookmarkProps) {
  return (
    <div 
      className={`${className} relative group transition-colors duration-200`}
      style={{ 
        width: size, 
        height: size,
        color: variant === 'filled' ? 'var(--primary)' : '#ffffff',
        filter: 'brightness(1)'
      }}
      onMouseEnter={(e) => {
        if (variant !== 'filled') {
          e.currentTarget.style.color = 'var(--primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant !== 'filled') {
          e.currentTarget.style.color = '#ffffff';
        }
      }}
      onClick={onClick}
    >
      <svg 
        className="block size-full transition-colors duration-200" 
        fill="none" 
        preserveAspectRatio="xMidYMid meet" 
        viewBox="0 0 24 24"
      >
        {variant === 'filled' ? (
          // Filled 버전 - 완전히 채워진 형태 (파란색)
          <path 
            d="M5 2a2 2 0 0 0-2 2v16l7-3 7 3V4a2 2 0 0 0-2-2H5z"
            fill="currentColor"
          />
        ) : (
          // Outline 버전 - 테두리만 있는 형태 (흰색 → 호버 시 파란색)
          <path 
            d="M5 2a2 2 0 0 0-2 2v16l7-3 7 3V4a2 2 0 0 0-2-2H5z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}