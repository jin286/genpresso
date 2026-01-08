import { RoundButton } from "./round-button";
import { X } from "lucide-react";
import IconStrokeHelp from "../../imports/IconStrokeHelp";

interface HelpButtonProps {
  /** 버튼이 활성화되었는지 여부 (도움말 패널이 열린 상태) */
  isActive?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * 도움말 버튼
 * RoundButton 컴포넌트를 사용한 통일된 디자인
 */
export function HelpButton({ isActive = false, onClick, ariaLabel = "도움말" }: HelpButtonProps) {
  return (
    <RoundButton
      isActive={isActive}
      onClick={onClick}
      ariaLabel={ariaLabel}
      icon={
        <div className="w-full h-full flex items-center justify-center">
          <IconStrokeHelp />
        </div>
      }
      activeIcon={
        <X className="w-full h-full" strokeWidth={2} />
      }
      animated
    />
  );
}
