import { motion } from "motion/react";
import { ReactNode } from "react";

interface RoundButtonProps {
  /** 버튼이 활성화되었는지 여부 (클릭되어 패널이 열린 상태) */
  isActive?: boolean;
  /** 기본 상태의 아이콘 */
  icon: ReactNode;
  /** 활성 상태의 아이콘 (기본값: X 아이콘) */
  activeIcon?: ReactNode;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 클래스명 */
  className?: string;
  /** 애니메이션 적용 여부 */
  animated?: boolean;
}

/**
 * 통일된 원형 버튼 컴포넌트
 * 
 * 햄버거 버튼을 기준으로 한 디자인 시스템:
 * - 크기: 44x44px (최소 터치 타겟)
 * - 배경: 글래스모피즘 효과
 * - 테두리: 0.5px solid border
 * - 그림자: 0px 4px 4px rgba(0,0,0,0.25)
 * - 기본 상태: 회색 아이콘
 * - 호버: 아이콘 파란색으로 변경
 * - 활성: 아이콘 파란색 + X 아이콘으로 변경
 */
export function RoundButton({
  isActive = false,
  icon,
  activeIcon,
  ariaLabel,
  onClick,
  className = "",
  animated = false
}: RoundButtonProps) {
  const iconContent = isActive && activeIcon ? activeIcon : icon;

  const IconWrapper = animated ? motion.div : "div";
  const animationProps = animated ? {
    initial: false,
    animate: {
      rotate: isActive ? 180 : 0,
    },
    transition: { duration: 0.3, ease: "easeInOut" }
  } : {};

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`round-button-wrapper group relative rounded-full size-11 bg-[var(--color-glass-bg)] backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
    >
      {/* 테두리와 그림자 */}
      <div
        aria-hidden="true"
        className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-full"
        style={{
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)'
        }}
      />
      
      {/* 아이콘 - 호버 시와 활성 시 파란색 */}
      <IconWrapper
        className={`round-button-icon absolute left-3.5 top-3.5 w-4 h-4 flex items-center justify-center transition-colors duration-200 ${isActive ? 'active' : ''}`}
        {...animationProps}
      >
        {iconContent}
      </IconWrapper>
    </button>
  );
}
