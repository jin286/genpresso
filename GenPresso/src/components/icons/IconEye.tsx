import React from 'react';
import svgPaths from "../../imports/svg-mq2l5pieif";

interface IconEyeProps {
  size?: number;
  color?: string;
  className?: string;
}

export function IconEye({ 
  size = 16, 
  color = '#F5F5F5',
  className = '' 
}: IconEyeProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* 눈 외곽선 */}
      <div className="absolute inset-[18.75%_3.12%_18.75%_3.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 15">
          <path 
            clipRule="evenodd" 
            d={svgPaths.p13659380} 
            fill={color} 
            fillRule="evenodd" 
          />
        </svg>
      </div>
      {/* 동공 */}
      <div className="absolute inset-[31.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <path 
            clipRule="evenodd" 
            d={svgPaths.p22e7e280} 
            fill={color} 
            fillRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
}