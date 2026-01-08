import React from "react";
import { Plus, Combine } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { toast } from "sonner@2.0.3";
import IconStrokeImage from "../../imports/IconStrokeImage-284-1472";
import IconFilledImage from "../../imports/IconFilledImage-284-1480";
import IconStrokeVideo from "../../imports/IconStrokeVideo-252-9590";
import IconFilledVideo from "../../imports/IconFilledVideo";

interface FileAttachPopoverProps {
  /** Popover 정렬 위치 (기본값: "center") */
  align?: "start" | "center" | "end";
  /** Popover 표시 방향 (기본값: "top") */
  side?: "top" | "bottom" | "left" | "right";
  /** Popover 간격 (기본값: 8px) */
  sideOffset?: number;
  /** + 버튼 추가 클래스 */
  buttonClassName?: string;
  /** 버튼 텍스트 라벨 표시 여부 (기본값: false) */
  showLabel?: boolean;
  /** 믹스노드 생성 콜백 (캔버스 전용) */
  onMixNodeCreate?: () => void;
}

/**
 * 파일 첨부 Popover 컴포넌트
 * 
 * 이미지/동영상 업로드 옵션을 제공하는 통합 컴포넌트
 * 
 * **사용 위치**:
 * - AgentChatPanel (Agent 패널 채팅창)
 * - GenPressoLayout (메인 화면 하단 채팅창)
 * - CanvasWorkspace (캔버스 하단 채팅창)
 * 
 * **중요**: 이 컴포넌트를 수정하면 모든 사용처에 자동 반영됩니다!
 * 
 * **디자인 원칙** (NavButton 패턴):
 * - ✅ 호버 시 아이콘/텍스트만 파란색 (배경은 투명도 20%)
 * - ✅ Stroke → Filled 아이콘 전환 (크로스페이드)
 * - ✅ Tailwind 클래스 사용 (bg-primary/20, text-primary)
 * - ❌ 하드코딩된 색상/크기 금지
 * 
 * @example
 * ```tsx
 * // 기본 사용
 * <FileAttachPopover />
 * 
 * // 커스터마이징
 * <FileAttachPopover 
 *   align="center" 
 *   side="top" 
 *   sideOffset={8}
 *   buttonClassName="h-8 w-8"
 * />
 * ```
 */
export function FileAttachPopover({ 
  align = "center", 
  side = "top", 
  sideOffset = 8,
  buttonClassName = "",
  showLabel = false,
  onMixNodeCreate
}: FileAttachPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          size={showLabel ? "default" : "icon"}
          className={`rounded-full backdrop-blur-sm border text-foreground hover:bg-primary/20 hover:border-primary/30 hover:text-primary flex-shrink-0 transition-all h-10 ${showLabel ? 'gap-1 px-4 min-w-[100px]' : 'w-10'} ${buttonClassName}`}
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
          }}
        >
          <Plus className="w-5 h-5 transition-colors" />
          {showLabel && <span className="text-sm transition-colors">파일첨부</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 border-0 bg-transparent shadow-none z-[100]"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <div 
          className="rounded-2xl px-3 py-2.5 border min-w-[140px] backdrop-blur-md"
          style={{
            backgroundColor: 'var(--popover-bg)',
            borderColor: 'var(--popover-border)',
            boxShadow: 'var(--popover-shadow)',
          }}
        >
          <h3 className="text-xs text-foreground mb-2">파일첨부</h3>
          
          <div className="space-y-1.5">
            <FileAttachButton
              label="이미지 업로드"
              onClick={() => toast.success("이미지 업로드 기능을 준비 중입니다.")}
              iconStroke={<IconStrokeImage className="w-5 h-5" />}
              iconFilled={<IconFilledImage className="w-5 h-5" />}
            />
            
            <FileAttachButton
              label="동영상 업로드"
              onClick={() => toast.success("동영상 업로드 기능을 준비 중입니다.")}
              iconStroke={<IconStrokeVideo className="w-5 h-5" />}
              iconFilled={<IconFilledVideo className="w-5 h-5" />}
            />

            {/* 캔버스에서만 믹스노드 추가 옵션 표시 */}
            {onMixNodeCreate && (
              <FileAttachButton
                label="믹스노드 추가"
                onClick={onMixNodeCreate}
                iconStroke={<Combine className="w-5 h-5" strokeWidth={1.5} />}
                iconFilled={<Combine className="w-5 h-5" strokeWidth={2.5} />}
              />
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * 파일 첨부 버튼 (내부 컴포넌트)
 * 
 * **디자인 패턴** (NavButton 스타일):
 * - 호버 시: 아이콘/텍스트만 파란색 + 배경 투명도 20%
 * - Stroke → Filled 아이콘 크로스페이드 전환
 * - Tailwind 클래스 사용 (bg-primary/20, text-primary)
 * - group-hover로 자식 요소 제어
 * 
 * **제거된 기능**:
 * - ❌ isPressed state (불필요)
 * - ❌ scale 1.02 효과 (NavButton에 없음)
 * - ❌ CSS 변수 직접 사용 (Tailwind 클래스로 대체)
 */
interface FileAttachButtonProps {
  label: string;
  onClick: () => void;
  iconStroke: React.ReactNode;
  iconFilled: React.ReactNode;
}

function FileAttachButton({ label, onClick, iconStroke, iconFilled }: FileAttachButtonProps) {
  return (
    <button
      className="group w-full flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
      style={{
        backgroundColor: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
      }}
      onClick={onClick}
    >
      {/* 아이콘 컨테이너 - stroke와 filled 오버레이 */}
      <div className="relative w-5 h-5 flex-shrink-0">
        {/* Stroke 아이콘 (기본 상태) */}
        <div 
          className="absolute inset-0 text-foreground group-hover:opacity-0 group-hover:scale-75 transition-all duration-200 ease-out"
        >
          {iconStroke}
        </div>
        
        {/* Filled 아이콘 (호버 상태) */}
        <div 
          className="absolute inset-0 text-primary opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out"
        >
          {iconFilled}
        </div>
      </div>
      
      {/* 텍스트 */}
      <span className="text-xs text-foreground group-hover:text-primary transition-colors duration-200">
        {label}
      </span>
    </button>
  );
}
