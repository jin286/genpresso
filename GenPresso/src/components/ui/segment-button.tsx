import { RoundButton } from "./round-button";
import { X, Scissors } from "lucide-react";

interface SegmentButtonProps {
  /** 버튼이 활성화되었는지 여부 (세그먼트 모드가 켜진 상태) */
  isActive?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * 세그먼트 버튼
 * RoundButton 컴포넌트를 사용한 통일된 디자인
 */
export function SegmentButton({ isActive = false, onClick, ariaLabel = "세그먼트" }: SegmentButtonProps) {
  return (
    <RoundButton
      isActive={isActive}
      onClick={onClick}
      ariaLabel={ariaLabel}
      icon={
        <Scissors className="w-5 h-5" strokeWidth={2} />
      }
      activeIcon={
        <X className="w-5 h-5" strokeWidth={2} />
      }
      animated
    />
  );
}
