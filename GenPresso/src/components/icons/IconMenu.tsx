interface IconMenuProps {
  className?: string;
}

export function IconMenu({ className = "w-5 h-5" }: IconMenuProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`${className} cursor-pointer hover:scale-110 transition-transform duration-200`}
    >
      <path 
        d="M3 12h18M3 6h18M3 18h18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}