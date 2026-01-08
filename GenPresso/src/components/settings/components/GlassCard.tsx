import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

const BASE_GLASS_STYLE = {
  backgroundColor: 'var(--glass-bg)',
  backdropFilter: 'blur(var(--glass-backdrop))',
  WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
  borderColor: 'var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
};

export function GlassCard({ 
  children, 
  className = "", 
  noPadding = false, 
  highlighted = false, 
  onClick 
}: GlassCardProps) {
  // If className explicitly sets p-0, disable default padding to avoid CSS conflicts
  const showPadding = !noPadding && !className.includes('p-0');

  const cardStyle = highlighted 
    ? { ...BASE_GLASS_STYLE, borderColor: 'var(--color-primary)', borderWidth: '2px' }
    : BASE_GLASS_STYLE;
  
  return (
    <div
      className={`rounded-2xl border border-solid ${showPadding ? 'px-6 py-4' : ''} overflow-hidden flex flex-col w-full ${className}`}
      style={{ 
        ...cardStyle, 
        // Priority: Highlighted prop > ClassName match > Default Glass Style
        borderColor: (highlighted || className.includes('border-primary')) 
          ? 'var(--primary)' 
          : 'var(--glass-border, rgba(255, 255, 255, 0.2))',
        borderWidth: '1px',
        // Manage effects based on padding state
        boxShadow: showPadding ? cardStyle.boxShadow : 'none',
        backdropFilter: showPadding ? cardStyle.backdropFilter : 'none',
        WebkitBackdropFilter: showPadding ? cardStyle.WebkitBackdropFilter : 'none',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
