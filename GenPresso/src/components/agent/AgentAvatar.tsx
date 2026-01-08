import AgentCharacter from "../../imports/___1-283-645";

interface AgentAvatarProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Agent 아바타 컴포넌트
 * - 모든 Agent 패널에서 공통으로 사용
 * - 피그마 디자인 기반 캐릭터 아이콘
 */
export function AgentAvatar({ size = "sm", className = "" }: AgentAvatarProps) {
  const sizeClass = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  
  return (
    <div 
      className={`${sizeClass} rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ '--fill-0': 'var(--primary)' } as React.CSSProperties}
    >
      <AgentCharacter />
    </div>
  );
}
