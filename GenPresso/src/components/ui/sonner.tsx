"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";
import { useIsMobile } from "./use-mobile";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Sonner
      key={isMobile ? "mobile" : "desktop"}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      expand={false}
      gap={8}
      richColors
      offset={isMobile ? 80 : 10}
      visibleToasts={1}
      style={
        {
          "--normal-bg": "hsl(var(--card))",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "group w-full min-w-[280px] max-w-[340px] rounded-2xl border-[0.5px] px-3 py-2 shadow-lg flex items-center gap-2.5",
          title: "text-sm leading-tight flex-1",
          description: "text-xs opacity-75 mt-1 leading-relaxed",
          actionButton: "bg-zinc-400 text-zinc-950",
          cancelButton: "bg-orange-400 text-orange-950",
          info: "toast-glass-info",
          success: "toast-glass-success",
          error: "toast-glass-error",
          warning: "toast-glass-warning",
        },
      }}
      icons={{
        info: (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M7 4.5V7.5M7 9.5H7.005" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        ),
        success: (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4L5.5 9.5L3 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ),
        error: (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M7 4.5V7.5M7 9.5H7.005" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        ),
        warning: (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4.5V7.5M7 9.5H7.005M3 11.5L7 3.5L11 11.5H3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
