import React from "react";

interface HoverableListItemProps {
  icon: React.ReactNode;
  iconHover: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  dataName?: string; // data-name 속성 추가
}

/**
 * 통일된 호버 가능한 리스트 아이템 컴포넌트
 * 
 * 디자인 스펙:
 * - border-radius: 16px (통일된 곡률)
 * - 높이: 40px (10 = 2.5rem)
 * - 패딩: px-3 py-2
 * - 호버: 배경색 변경 + 아이콘 전환
 * 
 * 사용처:
 * - Side Nav 확장형 메뉴 항목
 * - Help 패널 리스트 항목
 * - 기타 네비게이션 메뉴
 */
export function HoverableListItem({
  icon,
  iconHover,
  label,
  onClick,
  className = "",
  dataName,
}: HoverableListItemProps) {

  return (
    <button
      className={`group w-full h-10 px-3 flex items-center gap-2 rounded-2xl transition-all duration-200 justify-start py-2 border-2 border-transparent hover:border-transparent active:border-primary ${className}`}
      style={{ backgroundColor: 'transparent' }}
      data-name={dataName || label}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={onClick}
    >
      {/* 아이콘 영역 */}
      <div className="h-4 w-4 flex items-center justify-center relative shrink-0 hoverable-icon-wrapper">
        {/* 기본 아이콘 (stroke) - 회색 */}
        <div
          className="absolute inset-0 group-hover:opacity-0 group-hover:scale-90 transition-all duration-200 ease-out"
          style={{ color: "var(--color-glass-icon)" }}
        >
          {icon}
        </div>
        {/* 호버 아이콘 (filled) - 파란색 */}
        <div
          className="absolute inset-0 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out"
          style={{ color: "var(--color-primary)" }}
        >
          {iconHover}
        </div>
      </div>

      {/* 텍스트 */}
      <span className="text-sm leading-none text-foreground group-hover:text-primary transition-colors">{label}</span>
    </button>
  );
}