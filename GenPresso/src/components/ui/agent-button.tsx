import { RoundButton } from "./round-button";
import { X } from "lucide-react";
import svgPathsAgent from "../../imports/svg-cc033hizjh";

interface AgentButtonProps {
  /** 버튼이 활성화되었는지 여부 (에이전트 패널이 열린 상태) */
  isActive?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 접근성을 위한 aria-label */
  ariaLabel?: string;
}

/**
 * AI 에이전트 버튼
 * RoundButton 컴포넌트를 사용한 통일된 디자인
 */
export function AgentButton({ isActive = false, onClick, ariaLabel = "AI 에이전트" }: AgentButtonProps) {
  return (
    <RoundButton
      isActive={isActive}
      onClick={onClick}
      ariaLabel={ariaLabel}
      icon={
        <svg className="w-full h-full" fill="none" viewBox="0 0 517 498">
          <g clipPath="url(#clip0_agent_btn)">
            <path d={svgPathsAgent.p33488d80} />
            <path d={svgPathsAgent.p3ad6b800} />
            <path d={svgPathsAgent.pf259e00} />
            <path d={svgPathsAgent.p3542bef0} />
          </g>
          <defs>
            <clipPath id="clip0_agent_btn">
              <rect fill="white" height="497.35" width="516.37" />
            </clipPath>
          </defs>
        </svg>
      }
      activeIcon={
        <X className="w-full h-full" strokeWidth={2} />
      }
    />
  );
}
