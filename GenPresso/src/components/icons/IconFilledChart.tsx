import React from "react";

interface IconProps {
  className?: string;
  color?: string;
}

export function IconFilledChart({ className, color = "currentColor" }: IconProps) {
  return (
    <div className={className} data-name="IconFilledChart">
      <svg className="block size-full" stroke="none" viewBox="0 0 24 24" style={{ fill: color }}>
        <rect x="10" y="10" width="4" height="10" rx="1" />
        <rect x="16" y="4" width="4" height="16" rx="1" />
        <rect x="4" y="16" width="4" height="4" rx="1" />
      </svg>
    </div>
  );
}
