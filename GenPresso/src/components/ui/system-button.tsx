import { RoundButton } from "./round-button";
import { X } from "lucide-react";
import svgPaths from "../../imports/svg-0qpju8m9c1";

interface SystemButtonProps {
  /** 버튼이 활성화되었는지 여부 (Drawer가 열린 상태) */
  isActive?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * 시스템 햄버거 메뉴 버튼
 * RoundButton 컴포넌트를 사용한 통일된 디자인
 */
export function SystemButton({ isActive = false, onClick, ariaLabel = "메뉴" }: SystemButtonProps) {
  return (
    <RoundButton
      isActive={isActive}
      onClick={onClick}
      ariaLabel={ariaLabel}
      icon={
        <svg className="w-full h-full" fill="none" viewBox="0 0 16 16">
          <path 
            d={svgPaths.p26d06be0} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33273" 
          />
        </svg>
      }
      activeIcon={
        <X className="w-full h-full" strokeWidth={2} />
      }
      animated
    />
  );
}
