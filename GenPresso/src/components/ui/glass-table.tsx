import React from "react";
import { cn } from "./utils";
import { GlassCard } from "../settings/components/GlassCard";

// ----------------------------------------------------------------------
// Glass Table Components
// ----------------------------------------------------------------------

interface GlassTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export function GlassTable({ className, containerClassName, children, ...props }: GlassTableProps) {
  return (
    <GlassCard className={cn("!p-0 overflow-hidden", containerClassName)}>
      <div className="overflow-x-auto">
        <table className={cn("w-full text-sm text-left", className)} {...props}>
          {children}
        </table>
      </div>
    </GlassCard>
  );
}

export function GlassTableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLSectionElement>) {
  return (
    <thead className={cn("text-xs text-muted-foreground bg-muted/30 border-b border-border/50", className)} {...props}>
      {children}
    </thead>
  );
}

export function GlassTableBody({ className, children, ...props }: React.HTMLAttributes<HTMLSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-border/50", className)} {...props}>
      {children}
    </tbody>
  );
}

export function GlassTableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("group hover:bg-muted/20 transition-colors", className)} {...props}>
      {children}
    </tr>
  );
}

export function GlassTableHead({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th 
      className={cn(
        "px-6 py-4 h-10 text-left align-middle font-medium whitespace-nowrap", 
        className
      )} 
      {...props}
    >
      {children}
    </th>
  );
}

export function GlassTableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td 
      className={cn(
        "px-6 py-4 align-middle whitespace-nowrap", 
        className
      )} 
      {...props}
    >
      {children}
    </td>
  );
}

// ----------------------------------------------------------------------
// Glass Badge Component
// ----------------------------------------------------------------------

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md";
}

export function GlassBadge({ className, variant = "default", size = "sm", children, ...props }: GlassBadgeProps) {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    error:   "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    info:    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    outline: "bg-transparent text-muted-foreground border-border",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium border backdrop-blur-sm transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
