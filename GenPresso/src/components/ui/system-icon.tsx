import { cn } from "./utils";

export interface SystemIconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  xs: "w-3 h-3",      // 12px
  sm: "w-4 h-4",      // 16px  
  md: "w-5 h-5",      // 20px
  lg: "w-6 h-6",      // 24px
  xl: "w-8 h-8",      // 32px
};

export function SystemIcon({ size = "md", className, children }: SystemIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center shrink-0",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}

// 공통 아이콘들 - ExpandableSidebar 전용
export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-4 h-4 text-foreground", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-4 h-4 text-foreground", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}