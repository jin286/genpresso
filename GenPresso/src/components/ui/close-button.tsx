interface CloseButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 통일된 X 닫기 버튼 컴포넌트
 * 
 * 라이트/다크모드 자동 대응:
 * - 라이트모드: 밝은 회색 배경 (rgba(0,0,0,0.08~0.06)) + 어두운 테두리 + 진한 회색 X 아이콘 (#333333)
 * - 다크모드: 밝은 배경 (rgba(255,255,255,0.1~0.05)) + 흰색 X 아이콘 (#f5f5f5)
 * - 크기: 16px (sm, 기본값) / 22px (md) / 26px (lg)
 * - 호버: X 아이콘 파란색(#4fa8d8)으로 변경 + scale 1.1배
 * - 클릭: scale 0.95배
 */
export function CloseButton({ 
  onClick, 
  className = "", 
  ariaLabel = "닫기",
  size = "sm"
}: CloseButtonProps) {
  const sizeConfig = {
    sm: {
      container: "size-4",  // 16px
      iconSize: 8,
      viewBox: "0 0 10 10",
      paths: {
        line1: "M7.5 2.5L2.5 7.5",
        line2: "M2.5 2.5L7.5 7.5"
      }
    },
    md: {
      container: "size-[22px]", // 22px
      iconSize: 12,
      viewBox: "0 0 14 14",
      paths: {
        line1: "M10.5 3.5L3.5 10.5",
        line2: "M3.5 3.5L10.5 10.5"
      }
    },
    lg: {
      container: "size-[26px]", // 26px
      iconSize: 14,
      viewBox: "0 0 16 16",
      paths: {
        line1: "M12.5 3.5L3.5 12.5",
        line2: "M3.5 3.5L12.5 12.5"
      }
    }
  };

  const config = sizeConfig[size];

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      className={`
        group
        relative 
        ${config.container}
        rounded-2xl
        backdrop-blur-md
        transition-all 
        duration-200 
        cursor-pointer
        hover:scale-110
        active:scale-95
        focus:outline-none 
        focus:ring-2 
        focus:ring-primary/50
        ${className}
      `}
      style={{
        background: 'linear-gradient(180deg, var(--close-btn-bg-start) 0%, var(--close-btn-bg-end) 100%)',
      }}
    >
      {/* 테두리 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          border: '0.5px solid var(--close-btn-border)',
          boxShadow: 'var(--close-btn-shadow)',
        }}
      />
      
      {/* X 아이콘 - CSS 변수로 색상 제어 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          width={config.iconSize} 
          height={config.iconSize} 
          viewBox={config.viewBox}
          fill="none"
          className="block"
        >
          <path 
            d={config.paths.line1}
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-200"
            style={{
              stroke: 'var(--close-btn-icon)',
            }}
          />
          <path 
            d={config.paths.line2}
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-200"
            style={{
              stroke: 'var(--close-btn-icon)',
            }}
          />
        </svg>
      </div>
      
      {/* 호버 시 파란색 X 아이콘 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg 
          width={config.iconSize} 
          height={config.iconSize} 
          viewBox={config.viewBox}
          fill="none"
          className="block"
        >
          <path 
            d={config.paths.line1}
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              stroke: 'var(--close-btn-icon-hover)',
            }}
          />
          <path 
            d={config.paths.line2}
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              stroke: 'var(--close-btn-icon-hover)',
            }}
          />
        </svg>
      </div>
    </button>
  );
}
