import React from "react";
import { cn } from "../ui/utils";

interface MobileMenuButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  iconFilled: React.ComponentType<{ className?: string; color?: string }>;
  onClick: () => void;
}

export const MobileMenuButton = ({ label, icon: Icon, iconFilled: IconFilled, onClick }: MobileMenuButtonProps) => {
  return (
    <button 
      className="group w-full py-3 flex items-center gap-5 px-4 rounded-[20px] transition-all duration-200 text-left hover:bg-[var(--color-glass-hover-bg)]"
      onClick={onClick}
    >
      <div className="relative size-8 flex items-center justify-center shrink-0">
        {/* Stroke Icon (Default) */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out group-hover:opacity-0 group-hover:scale-90">
          <Icon className="w-full h-full" color="var(--color-glass-icon)" />
        </div>
        {/* Filled Icon (Hover) - Ensure text-primary is applied for currentColor fallback */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 text-primary">
          <IconFilled className="w-full h-full" color="var(--color-primary)" />
        </div>
      </div>
      <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
        {label}
      </span>
    </button>
  );
};
