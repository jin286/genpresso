import React from 'react';
import { cn } from '../ui/utils';

interface CreditCardProps {
  currentCredit: number;
  className?: string;
  // Allow any other props for DialogTrigger spread
  [key: string]: any; 
}

export const CreditCard = React.forwardRef<HTMLDivElement, CreditCardProps>(
  ({ currentCredit, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative rounded-[24px] shrink-0 w-full overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-200",
          className
        )}
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'var(--color-glass-bg)',
          boxShadow: 'var(--glass-shadow)',
        }}
        {...props}
      >
        <div aria-hidden="true" className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[24px]" style={{ borderColor: 'var(--color-glass-border)' }} />
        <div className="flex items-center justify-between p-3 pl-3 pr-6 relative z-10 h-[72px]">
          <div className="bg-neutral-900/40 rounded-full px-5 py-2.5 flex items-center gap-3 h-full border border-white/5">
            <div className="relative shrink-0 size-[24px] flex items-center justify-center text-white">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-[43.36%_6.25%_15.63%_6.25%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 10">
                    <path d="M0 7.21875C0 7.91494 0.276562 8.58262 0.768845 9.07491C1.26113 9.56719 1.92881 9.84375 2.625 9.84375H18.375C19.0712 9.84375 19.7389 9.56719 20.2312 9.07491C20.7234 8.58262 21 7.91494 21 7.21875V0H0V7.21875ZM3.09375 3.65625C3.09375 3.28329 3.24191 2.9256 3.50563 2.66188C3.76935 2.39816 4.12704 2.25 4.5 2.25H6.75C7.12296 2.25 7.48065 2.39816 7.74437 2.66188C8.00809 2.9256 8.15625 3.28329 8.15625 3.65625V4.59375C8.15625 4.96671 8.00809 5.3244 7.74437 5.58812C7.48065 5.85184 7.12296 6 6.75 6H4.5C4.12704 6 3.76935 5.85184 3.50563 5.58812C3.24191 5.3244 3.09375 4.96671 3.09375 4.59375V3.65625Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute inset-[15.63%_6.25%_68.36%_6.25%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 4">
                    <path d="M18.375 0H2.625C1.92881 0 1.26113 0.276562 0.768845 0.768845C0.276562 1.26113 0 1.92881 0 2.625V3.84375H21V2.625C21 1.92881 20.7234 1.26113 20.2312 0.768845C19.7389 0.276562 19.0712 0 18.375 0V0Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-xl leading-[1.2] font-bold whitespace-nowrap text-white">1,250</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-lg font-medium whitespace-nowrap text-neutral-300 mr-4">Credit</span>
          </div>
        </div>
      </div>
    );
  }
);

CreditCard.displayName = "CreditCard";
