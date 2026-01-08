import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { IconSparkles } from "../icons";
import { toast } from "sonner";
import { AgentAvatar } from "./AgentAvatar";
import { StarIcon } from "./StarIcon";
import { FileAttachPopover } from "../ui/file-attach-popover";
import { CloseButton } from "../ui/close-button";
import { useLanguage } from "../../contexts/LanguageContext";
import redChairImage from "figma:asset/1f1c791abafe8f4925c8a4fd1ff4639c74983bb2.png";
import greenChairImage from "figma:asset/18e195ed2f065d4dc2ae3dc0148d93c162f07cae.png";

type TabType = "history" | "agent" | "system";

/**
 * Agent 탭 콘텐츠 - AI 대화 내역
 */
const AgentContent = React.memo(() => {
  const { t } = useLanguage();
  
  return (
    <div className="flex-1 overflow-y-auto px-3 pt-2 pb-2 space-y-3 min-h-0">
      {/* 시간 구분선 */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">2025-11-15 10:00:00</p>
      </div>

      {/* AI 메시지 1 */}
      <div className="flex items-start gap-2">
        <AgentAvatar />
        <div className="flex-1 rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--agent-message-bg)' }}>
          <p className="text-xs text-foreground">{t('agent.welcome')}</p>
        </div>
      </div>

      {/* 사용자 메시지 1 */}
      <div className="flex justify-end">
        <div className="rounded-lg px-3 py-2 max-w-[85%]" style={{ backgroundColor: 'var(--agent-user-message-bg)' }}>
          <p className="text-xs text-foreground">{t('agent.exampleRequest1')}</p>
        </div>
      </div>

      {/* AI 메시지 2 */}
      <div className="flex items-start gap-2">
        <AgentAvatar />
        <div className="flex-1 rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--agent-message-bg)' }}>
          <p className="text-xs text-foreground mb-2">{t('agent.exampleResponse1')}</p>
          <img src={redChairImage} alt="Red Chair" className="w-full rounded-md mb-1 object-cover h-40" />
          <p className="text-xs text-muted-foreground mt-1">{t('agent.modelLabel')}: Flux Pro</p>
        </div>
      </div>

      {/* 사용자 메시지 2 */}
      <div className="flex justify-end">
        <div className="rounded-lg px-3 py-2 max-w-[85%]" style={{ backgroundColor: 'var(--agent-user-message-bg)' }}>
          <p className="text-xs text-foreground">{t('agent.exampleRequest2')}</p>
        </div>
      </div>

      {/* AI 메시지 3 */}
      <div className="flex items-start gap-2">
        <AgentAvatar />
        <div className="flex-1 rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--agent-message-bg)' }}>
          <p className="text-xs text-foreground mb-2">{t('agent.exampleResponse2')}</p>
          <img src={greenChairImage} alt="Green Chair" className="w-full rounded-md object-cover h-40" />
           <p className="text-xs text-muted-foreground mt-1">{t('agent.modelLabel')}: Flux Pro</p>
        </div>
      </div>
    </div>
  );
});

AgentContent.displayName = 'AgentContent';

/**
 * History 탭 콘텐츠 - 작업 히스토리
 */
const HistoryContent = React.memo(() => {
  const { t } = useLanguage();
  
  const historyItems = [
    { title: t('agent.historyImageGenerated'), time: "2025-10-10 15:30:22" },
    { title: t('agent.historyProjectCreated'), time: "2025-10-10 14:15:10" },
    { title: t('agent.historyTemplateLoaded'), time: "2025-10-10 13:45:33" },
    { title: t('agent.historyCanvasSaved'), time: "2025-10-10 12:20:45" },
    { title: t('agent.historyGalleryBookmarked'), time: "2025-10-10 11:05:18" },
    { title: t('agent.historyModelChanged'), time: "2025-10-10 10:45:00" },
    { title: t('agent.historyImageUpscaled'), time: "2025-10-10 10:30:15" },
    { title: t('agent.historyBackgroundRemoved'), time: "2025-10-10 10:15:20" },
    { title: t('agent.historyStyleGuideUpdated'), time: "2025-10-10 09:50:33" },
    { title: t('agent.historyMemberInvited', { name: '김철수' }), time: "2025-10-10 09:30:10" },
    { title: t('agent.historyProjectSettingsChanged'), time: "2025-10-10 09:15:00" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-3 pt-2 pb-2 space-y-2 min-h-0">
      {historyItems.map((item, index) => (
        <div key={index} className="rounded-lg p-3" style={{ backgroundColor: 'var(--history-item-bg)' }}>
          <p className="text-xs text-foreground mb-1">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.time}</p>
        </div>
      ))}
    </div>
  );
});

HistoryContent.displayName = 'HistoryContent';

/**
 * System Prompt 탭 콘텐츠
 */
interface SystemPromptContentProps {
  value: string;
  onSave: (value: string) => void;
}

const SystemPromptContent = React.memo<SystemPromptContentProps>(({ value, onSave }) => {
  const { t } = useLanguage();
  const [localValue, setLocalValue] = useState(value);

  // 상위 value가 변경되면 로컬 state 업데이트
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 min-h-0 overflow-y-auto">
      <div className="space-y-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">
            {t('agent.systemPrompt')}
          </label>
          <span className="text-[10px] text-muted-foreground">
            {t('agent.systemPromptDescription')}
          </span>
        </div>
        <textarea 
          className="flex-1 w-full p-3 rounded-lg border resize-none text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
          style={{
            borderColor: 'var(--input-border)',
            backgroundColor: 'var(--input-bg)'
          }}
          placeholder={t('agent.systemPromptPlaceholder')}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full">
        <Button 
          variant="outline"
          onClick={() => {
            setLocalValue("");
            toast.info(t('common.reset'));
          }}
          className="flex-1"
        >
          {t('agent.restore')}
        </Button>
        <Button 
          onClick={() => {
            onSave(localValue);
            toast.success(t('agent.systemPromptSaved'));
          }}
          className="flex-1"
        >
          {t('common.save')}
        </Button>
      </div>
    </div>
  );
});

SystemPromptContent.displayName = 'SystemPromptContent';

/**
 * 채팅 입력창 - 하단 고정
 */
const ChatInput = React.memo(() => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      toast.success(`메시지 전송: ${inputValue}`);
      setInputValue("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [inputValue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // 한 줄 높이(약 40-42px)보다 크면 멀티라인으로 간주
      setIsMultiLine(scrollHeight > 45);

      // Limit max height to roughly 5 lines (approx 24px * 5 = 120px)
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  return (
    <div className="px-3 pb-3 pt-1">
      <div className="flex items-end gap-2">
        <div className="shrink-0 pb-1.5">
          <FileAttachPopover 
            align="start"
            buttonClassName="!w-8 !h-8 !rounded-full !bg-[rgba(245,245,245,0.05)] !border-[0.726px] !border-[rgba(163,163,163,0.2)] hover:!bg-[rgba(245,245,245,0.1)] text-foreground !shadow-none transition-colors backdrop-blur-md"
          />
        </div>

        <div 
          className={`flex-1 relative border-[0.5px] border-solid ${isMultiLine ? 'rounded-[20px]' : 'rounded-full'} pl-3 pr-1.5 py-1 transition-all duration-200 flex items-end gap-2`}
          style={{
            backgroundColor: isHovered ? 'var(--color-glass-hover-bg)' : 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: isHovered ? 'var(--glass-shadow)' : 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t('common.workWithAgent')}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm min-w-0 resize-none overflow-y-auto py-1.5"
            rows={1}
            style={{ 
              lineHeight: '1.5',
              maxHeight: '120px'
            }}
          />

          <Button 
            size="icon"
            className="shrink-0 rounded-full h-7 w-7 mb-1.5 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-all duration-200 shadow-sm"
            onClick={handleSend}
          >
            <IconSparkles 
              size={12} 
              className="transition-colors duration-200"
              color="currentColor"
            />
          </Button>
        </div>
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

/**
 * 탭 버튼 컴포넌트
 */
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = React.memo<TabButtonProps>(({ label, isActive, onClick }) => {
  const { t } = useLanguage();
  
  const getTranslatedLabel = (label: string) => {
    switch(label) {
      case "Agent": return t('agent.label');
      case "System Prompt": return t('agent.systemPrompt');
      case "History": return t('agent.history');
      default: return label;
    }
  };

  return (
    <button 
      className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
      style={isActive ? {
        background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
      } : {}}
      onClick={onClick}
    >
      <span className={`text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {getTranslatedLabel(label)}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
      )}
    </button>
  );
});

TabButton.displayName = 'TabButton';

/**
 * Agent Chat Panel - 메인 컴포넌트
 * 
 * 구조:
 * - 탭 바 (고정 h-11, 44px)
 * - 콘텐츠 영역 (고정 h-80, 320px, 스크롤 가능)
 * - 채팅 입력창 (고정 h-14 + mb-2, 64px)
 * 
 * 총 높이: 428px (44 + 320 + 64)
 */
interface AgentChatPanelProps {
  onClose?: () => void;
}

const AgentChatPanelComponent = ({ onClose }: AgentChatPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("agent");
  const [systemPrompt, setSystemPrompt] = useState("");

  const handleTabClick = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return (
    <div 
      className="absolute left-px top-px w-80 rounded-2xl flex flex-col z-40 border-[0.5px] border-solid h-[60vh]" 
      style={{
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        backgroundColor: 'var(--color-glass-bg)',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      {/* 닫기 버튼 - 우측 상단 고정 */}
      {onClose && (
        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton size="sm" onClick={onClose} />
        </div>
      )}

      {/* 탭 바 - 고정 44px */}
      <div className="flex border-b items-center" style={{ borderColor: 'var(--color-glass-border)' }}>
        <TabButton 
          label="Agent" 
          isActive={activeTab === "agent"} 
          onClick={() => handleTabClick("agent")} 
        />
        <TabButton 
          label="System Prompt" 
          isActive={activeTab === "system"} 
          onClick={() => handleTabClick("system")} 
        />
        <TabButton 
          label="History" 
          isActive={activeTab === "history"} 
          onClick={() => handleTabClick("history")} 
        />
      </div>

      {/* 콘텐츠 영역 - 최대 320px, 내용에 따라 가변 */}
      {activeTab === "agent" && <AgentContent />}
      {activeTab === "history" && <HistoryContent />}
      {activeTab === "system" && (
        <SystemPromptContent 
          value={systemPrompt} 
          onSave={setSystemPrompt} 
        />
      )}
      
      {/* 채팅 입력창 - 고정 64px (Agent 탭일 때만) */}
      {activeTab === "agent" && <ChatInput />}
    </div>
  );
};

AgentChatPanelComponent.displayName = 'AgentChatPanel';

const AgentChatPanel = React.memo(AgentChatPanelComponent);

export default AgentChatPanel;