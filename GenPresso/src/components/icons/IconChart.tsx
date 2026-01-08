import { BaseIconProps } from "./index";

export function IconChart({ size = 16, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative group ${className}`}
      style={{ width: size, height: size }}
      data-name="chart-icon"
    >
      {/* Stroke version (default) - 호버 전 */}
      <div className="group-hover:opacity-0 transition-opacity duration-200">
        <svg className="block size-full" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ stroke: 'var(--color-glass-icon)' }}>
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      </div>
      
      {/* Filled version (hover) - 호버 후 */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0">
        <svg className="block size-full" stroke="none" viewBox="0 0 24 24" style={{ fill: 'var(--color-primary)' }}>
          <rect x="10" y="10" width="4" height="10" rx="1" />
          <rect x="16" y="4" width="4" height="16" rx="1" />
          <rect x="4" y="16" width="4" height="4" rx="1" />
        </svg>
      </div>
    </div>
  );
}
