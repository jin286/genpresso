import React from "react";
import { Plus, Combine } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { toast } from "sonner@2.0.3";
import IconStrokeImage from "../../imports/IconStrokeImage-284-1472";
import IconFilledImage from "../../imports/IconFilledImage-284-1480";
import IconStrokeVideo from "../../imports/IconStrokeVideo-252-9590";
import IconFilledVideo from "../../imports/IconFilledVideo";
import { useLanguage } from "../../contexts/LanguageContext";

interface FileAttachPopoverProps {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  buttonClassName?: string;
  showLabel?: boolean;
  onMixNodeCreate?: () => void;
}

/**
 * 파일 첨부 Popover 컴포넌트
 * 
 * 사용처: AgentChatPanel, GenPressoLayout, CanvasWorkspace
 * 
 * 최적화:
 * - showLabel=false일 때 inline style 제거 (buttonClassName 완전 적용)
 * - variant="ghost" 명시 (bg-primary 자동 적용 방지)
 * - 조건부 스타일 객체 분리 (유지보수성 향상)
 */
export function FileAttachPopover({ 
  align = "center", 
  side = "top", 
  sideOffset = 8,
  buttonClassName = "",
  showLabel = false,
  onMixNodeCreate
}: FileAttachPopoverProps) {
  const { t } = useLanguage();
  
  // showLabel에 따라 조건부 스타일 적용
  const buttonStyle = showLabel ? {
    backgroundColor: 'var(--glass-bg)',
    borderColor: 'var(--glass-border)',
  } : undefined; // showLabel=false일 때는 inline style 제거

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost"
          size={showLabel ? "default" : "icon"}
          className={`rounded-full border transition-all ${showLabel ? 'gap-1 px-4 min-w-[100px] h-10' : 'w-7 h-7'} ${buttonClassName}`}
          style={{
            ...buttonStyle,
            color: 'var(--glass-icon)',
          }}
        >
          <Plus className="w-5 h-5 transition-colors block" />
          {showLabel && <span className="text-sm transition-colors">{t('upload.attachFile')}</span>}
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
          <h3 className="text-xs text-foreground mb-2">{t('upload.attachFile')}</h3>
          
          <div className="space-y-1.5">
            <FileAttachButton
              label={t('upload.uploadImage')}
              onClick={() => toast.success(t('upload.uploadImagePreparing'))}
              iconStroke={<IconStrokeImage className="w-5 h-5" />}
              iconFilled={<IconFilledImage className="w-5 h-5" />}
            />
            
            <FileAttachButton
              label={t('upload.uploadVideo')}
              onClick={() => toast.success(t('upload.uploadVideoPreparing'))}
              iconStroke={<IconStrokeVideo className="w-5 h-5" />}
              iconFilled={<IconFilledVideo className="w-5 h-5" />}
            />

            {onMixNodeCreate && (
              <FileAttachButton
                label={t('upload.addMixNode')}
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
 * 파일 첨부 내부 버튼 (Popover 내부 아이템)
 * Stroke → Filled 아이콘 전환, 호버 시 파란색
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
      <div className="relative w-5 h-5 flex-shrink-0">
        <div className="absolute inset-0 text-foreground group-hover:opacity-0 group-hover:scale-75 transition-all duration-200 ease-out">
          {iconStroke}
        </div>
        <div className="absolute inset-0 text-primary opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">
          {iconFilled}
        </div>
      </div>
      
      <span className="text-xs text-foreground group-hover:text-primary transition-colors duration-200">
        {label}
      </span>
    </button>
  );
}