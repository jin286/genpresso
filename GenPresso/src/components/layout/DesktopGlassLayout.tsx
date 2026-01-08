import React, { ReactNode } from "react";
import { 
  calculateMarginLeft, 
  calculateMarginRight 
} from "./layout-constants";

interface DesktopGlassLayoutProps {
  children: ReactNode;
  sidebarExpansionLevel: 0 | 1 | 2;
  className?: string;
}

/**
 * 데스크톱 환경에서 사이드바 확장에 따른 마진 계산과 
 * 글래스모피즘 컨테이너 스타일을 적용하는 공통 레이아웃 컴포넌트
 */
export const DesktopGlassLayout = ({ 
  children, 
  sidebarExpansionLevel,
  className = ""
}: DesktopGlassLayoutProps) => {
  return (
    <main 
      className={`transition-all duration-300 min-h-screen hidden md:block ${className}`}
      style={{
        marginLeft: `${calculateMarginLeft(sidebarExpansionLevel)}px`,
        marginRight: `${calculateMarginRight()}px`,
      }}
    >
      <div className="px-0 py-0 max-w-none">
        <div className="flex-1 h-screen overflow-hidden">
          <div 
            className="border rounded-2xl max-w-none ml-2 mr-2 sm:ml-3 sm:mr-4 md:ml-4 md:mr-6 mt-2 md:mt-16 mb-6 md:mb-10 h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] mobile-compact-container relative"
            style={{
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-backdrop))',
              WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
              borderColor: 'var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
