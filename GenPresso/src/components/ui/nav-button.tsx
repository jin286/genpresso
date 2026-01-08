import React from "react";
import { Button } from "./button";

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  iconHover: React.ReactNode;
  onClick?: () => void;
}

/**
 * NavButton - 이어하기/둘러보기 섹션 헤더 버튼
 * 
 * 디자인 특징:
 * - 글래스모피즘 배경 (bg-glass-bg)
 * - 기본 상태: 아이콘 currentColor (라이트모드: 검정, 다크모드: 흰색)
 * - 호버 상태: stroke → filled 아이콘 전환 + 파란색
 * - 반응형: 모바일(아이콘만) / 데스크톱(아이콘 + 텍스트)
 */
export function NavButton({ label, icon, iconHover, onClick }: NavButtonProps) {
  return (
    <Button 
      size="icon"
      className="group interactive rounded-full !h-10 !w-10 sm:!h-10 sm:!w-auto sm:min-w-[80px] sm:!px-3 sm:gap-2 backdrop-blur-sm border text-foreground hover:bg-primary/20 hover:border-primary/30 hover:text-primary flex items-center justify-center !p-0 transition-all duration-200"
      style={{
        backgroundColor: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
      }}
      onClick={onClick}
    >
      <div className="h-4 w-4 relative">
        {/* 기본 상태: stroke 아이콘 (currentColor 사용) */}
        <div 
          className="absolute inset-0 group-hover:opacity-0 group-hover:scale-90 transition-all duration-200 ease-out" 
          style={{'--fill-0': 'currentColor'} as React.CSSProperties}
        >
          {icon}
        </div>
        
        {/* 호버 상태: filled 아이콘 (primary 색상) */}
        <div 
          className="absolute inset-0 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out text-primary" 
          style={{'--fill-0': 'var(--primary)'} as React.CSSProperties}
        >
          {iconHover}
        </div>
      </div>
      
      {/* 텍스트 라벨 - 데스크톱에서만 표시 */}
      <span className="hidden sm:inline group-hover:text-primary transition-colors duration-200">
        {label}
      </span>
    </Button>
  );
}
