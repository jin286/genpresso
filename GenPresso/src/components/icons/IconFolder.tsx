import { BaseIconProps } from "./index";

export function IconFolder({ size = 16, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative group ${className}`} 
      style={{ width: size, height: size }}
      data-name="folder-icon"
    >
      {/* Outline version (default) */}
      <div className="group-hover:opacity-0 transition-opacity duration-200">
        <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      
      {/* Filled version (hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0">
        <svg className="block size-full" fill={color} stroke="none" viewBox="0 0 24 24">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </div>
  );
}