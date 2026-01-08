import React from "react";

interface IconProps {
  className?: string;
}

export function IconStrokeNote({ className }: IconProps) {
  return (
    <div className={className} data-name="IconStrokeNote">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path 
          fill="var(--fill-0, currentColor)" 
          fillRule="evenodd" 
          clipRule="evenodd"
          d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8.82843C20 8.29799 19.7893 7.78929 19.4142 7.41421L14.5858 2.58579C14.2107 2.21071 13.702 2 13.1716 2H6ZM13 3.5V8C13 8.55228 13.4477 9 14 9H18.5V20H6V4H13ZM14.5 3.5L18.5 7.5H15C14.7239 7.5 14.5 7.27614 14.5 7V3.5ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H8Z" 
        />
      </svg>
    </div>
  );
}
