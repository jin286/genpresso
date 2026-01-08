import React from "react";

interface IconProps {
  className?: string;
  color?: string;
}

export function IconStrokeChart({ className, color = "currentColor" }: IconProps) {
  return (
    <div className={className} data-name="IconStrokeChart">
      <svg className="block size-full" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ stroke: color }}>
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    </div>
  );
}
