import React from "react";

interface MobileQuickActionProps {
  /** 아이콘 컴포넌트 */
  Icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  /** 버튼 라벨 */
  label: string;
  /** 배지 숫자 (선택적) */
  badge?: number;
  /** 클릭 핸들러 (선택적) */
  onClick?: () => void;
}

/**
 * MobileQuickAction - 모바일 헤더 빠른 액션 버튼
 * 알림, 메시지, 설정 등의 빠른 액션 제공
 */
export function MobileQuickAction({ Icon, label, badge, onClick }: MobileQuickActionProps) {
  return (
    <div className="flex-1 relative rounded-2xl">
      <div className="flex flex-col items-center justify-center h-full">
        <div 
          className="group box-border flex flex-col gap-1 items-center justify-center p-2.5 w-full h-full transition-colors duration-200 cursor-pointer rounded-2xl"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={onClick}
        >
          <div className="h-5 w-5 flex items-center justify-center relative shrink-0">
            <Icon size={20} style={{ color: 'var(--color-glass-text)' }} />
            {badge !== undefined && badge > 0 && (
              <div className="absolute bg-destructive left-3 rounded-full size-2 top-0" />
            )}
          </div>
          <span className="text-sm text-center whitespace-nowrap" style={{ color: 'var(--color-glass-text)' }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
