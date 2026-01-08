import { BaseIconProps } from "./index";

export function IconBookmarks({ size = 16, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative group ${className}`} 
      style={{ width: size, height: size }}
      data-name="bookmarks-icon"
    >
      {/* Stroke version (default) */}
      <div className="group-hover:opacity-0 transition-opacity duration-200">
        <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M15 7v12.97l-4.21-3.97L6.58 19.94V7.03L15 7m1-2H6c-1.1 0-2 .9-2 2v16l6-5.5L16 23V7c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
      
      {/* Filled version (hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0">
        <svg className="block size-full" fill={color} stroke="none" viewBox="0 0 24 24">
          <path d="M15 7v12.97l-4.21-3.97L6.58 19.94V7.03L15 7z M16 5H6c-1.1 0-2 .9-2 2v16l6-5.5L16 23V7c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  );
}