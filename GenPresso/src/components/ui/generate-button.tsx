import React from 'react';
import { IconSparkles } from '../icons/IconSparkles';
import { cn } from './utils';

interface GenerateButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'primary' | 'outline';
}

export function GenerateButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText,
  className,
  size = 'default',
  variant = 'primary',
}: GenerateButtonProps) {
  const sizeClasses = {
    sm: 'h-8 px-3 gap-1.5 min-w-[80px]',
    default: 'h-10 px-4 gap-2 min-w-[96px]',
    lg: 'h-12 px-5 gap-2.5 min-w-[112px]',
  };

  const iconSizes = {
    sm: 14,
    default: 16,
    lg: 18,
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground',
    outline: 'bg-transparent border border-input hover:bg-secondary hover:text-secondary-foreground',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'group rounded-full flex items-center justify-center transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      <IconSparkles 
        size={iconSizes[size]} 
        className="transition-colors duration-200"
        color="currentColor"
      />
      <span className="font-bold transition-colors duration-200">
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  );
}
