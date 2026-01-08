import React, { ReactNode } from "react";
import { TermsFooter } from "../ui/terms-footer";

interface MobileGlassLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  showFooter?: boolean;
}

/**
 * 모바일 환경에서 메인 화면과 설정 화면의 레이아웃을 통일하기 위한 래퍼 컴포넌트입니다.
 * 사용자가 가장 조화롭다고 판단한 메인 화면의 레이아웃 구조(헤더 여백, 카드 스타일, 푸터 위치)를 강제합니다.
 */
export const MobileGlassLayout = ({ 
  children, 
  className = "", 
  contentClassName = "",
  showFooter = true 
}: MobileGlassLayoutProps) => {
  return (
    <main className={`md:hidden block w-full h-[100dvh] overflow-hidden ${className}`}>
      {/* 전체 스크롤 없이 고정된 레이아웃 (메인 화면과 동일 구조) */}
      <div className="w-full h-full flex flex-col px-2 pt-24 pb-2">
          
        {/* 글래스모피즘 카드 영역 - 남은 높이 모두 차지 */}
        <div 
          className={`flex-1 border rounded-2xl relative overflow-hidden shadow-lg flex flex-col ${contentClassName}`}
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

        {/* 푸터 영역: 카드 하단이 아닌, 필요하다면 내부에 넣거나 제거 (메인 화면은 푸터를 모바일에서 숨기거나 내부에 포함함) */}
        {showFooter && (
          <div className="shrink-0 mt-4 px-2">
            <TermsFooter />
          </div>
        )}
      </div>
    </main>
  );
};
