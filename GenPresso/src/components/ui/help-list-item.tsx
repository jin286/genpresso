import React from "react";

interface HelpListItemProps {
  iconStroke: React.ReactNode;
  iconFilled: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * Help 패널 전용 리스트 아이템 컴포넌트
 * 
 * 특징:
 * - CSS 변수 --fill-0를 사용하는 피그마 import 아이콘과 호환
 * - stroke 아이콘 → filled 아이콘 전환
 * - 글래스 배경 호버 효과
 * - currentColor 사용으로 아이콘 색상 자동 전환 (회색 → 파란색)
 */
export function HelpListItem({ iconStroke, iconFilled, label, onClick }: HelpListItemProps) {
  return (
    <button
      className="group w-full h-10 flex items-center rounded-2xl transition-all duration-200 text-left border-2 border-transparent hover:border-transparent active:border-primary"
      style={{
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 px-3 py-2 w-full">
        <div className="overflow-clip shrink-0 w-4 h-4 relative">
          {/* 기본 아이콘 (stroke) */}
          <div 
            className="absolute inset-0 group-hover:opacity-0 group-hover:scale-90 transition-all duration-200 ease-out" 
            style={{'--fill-0': 'var(--foreground)'} as React.CSSProperties}
          >
            {iconStroke}
          </div>
          {/* 호버 아이콘 (filled) */}
          <div 
            className="absolute inset-0 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out" 
            style={{'--fill-0': '#4fa8d8'} as React.CSSProperties}
          >
            {iconFilled}
          </div>
        </div>
        <p className="text-sm leading-none text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
      </div>
    </button>
  );
}
