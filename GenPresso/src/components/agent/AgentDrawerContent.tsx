import React, { useState } from "react";
import { Plus } from "lucide-react";
import { IconSparkles } from "../icons";
import { toast } from "sonner@2.0.3";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import svgPathsAttach from "../../imports/svg-0qpju8m9c1";
import { AgentAvatar } from "./AgentAvatar";
import { StarIcon } from "./StarIcon";
import { useLanguage } from "../../contexts/LanguageContext";

import { SystemPromptDialog } from "./SystemPromptDialog";
import { FileAttachPopover } from "../ui/file-attach-popover";

type TabType = "history" | "comment" | "agent";

interface AgentDrawerContentProps {
  currentCredit?: number;
  onCreditUpdate?: (credit: number) => void;
}

export default function AgentDrawerContent({ 
  currentCredit = 100, 
  onCreditUpdate = () => {} 
}: AgentDrawerContentProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("agent");
  const [inputValue, setInputValue] = useState("");
  const [isSystemPromptOpen, setIsSystemPromptOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");

  const historyItems = [
    { title: "이미지 생성 완료", time: "2025-10-10 15:30:22" },
    { title: "새 프로젝트 생성", time: "2025-10-10 14:15:10" },
    { title: "템플릿 불러오기", time: "2025-10-10 13:45:33" },
    { title: "캔버스 작업 저장", time: "2025-10-10 12:20:45" },
    { title: "갤러리 아이템 북마크", time: "2025-10-10 11:05:18" },
  ];

  const comments = [
    { content: "현재 작업에 이 색상 조합을 추천드립니다: #4fa8d8와 #f5f5f5", time: "방금 전" },
    { content: "레이아웃 균형을 위해 좌측 여백을 16px로 조정해보세요", time: "5분 전" },
    { content: "타이포그래피 일관성을 위해 Pretendard 폰트를 사용하세요", time: "10분 전" },
    { content: "반응형 디자인을 위해 모바일 우선으로 작업하시는 것을 권장합니다", time: "15분 전" },
    { content: "글래스모피즘 효과는 backdrop-blur를 사용하면 더 자연스럽습니다", time: "20분 전" },
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      toast.success(`메시지 전송: ${inputValue}`);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col py-5 px-2.5 pt-5 pr-1 pb-6 pl-1">
      {/* 탭 네비게이션 */}
      <div className="flex gap-0 mb-4 relative border-b border-white/10">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-3 px-4 text-center transition-all duration-200 relative ${
            activeTab === "history" 
              ? "text-white" 
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <span className="text-xs font-medium">History</span>
          {activeTab === "history" && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("comment")}
          className={`flex-1 py-3 px-4 text-center transition-all duration-200 relative ${
            activeTab === "comment" 
              ? "text-white" 
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <span className="text-xs font-medium">Comment</span>
          {activeTab === "comment" && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("agent")}
          className={`flex-1 py-3 px-4 text-center transition-all duration-200 relative ${
            activeTab === "agent" 
              ? "text-white" 
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <span className="text-xs font-medium">Agent</span>
          {activeTab === "agent" && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
          )}
        </button>
      </div>

      {/* 탭 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto mb-4">
        {/* History 탭 */}
        {activeTab === "history" && (
          <div className="space-y-3 px-2">
            {historyItems.map((item, index) => (
              <div key={index} className="rounded-2xl p-3 border-[0.5px]" style={{ backgroundColor: 'var(--history-item-bg)', borderColor: 'var(--color-glass-border)' }}>
                <p className="text-xs text-neutral-100 mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Comment 탭 */}
        {activeTab === "comment" && (
          <div className="space-y-3 px-2">
            {comments.map((comment, index) => (
              <div key={index} className="rounded-2xl p-3 border-[0.5px]" style={{ backgroundColor: 'var(--comment-item-bg)', borderColor: 'var(--color-primary)', borderOpacity: 0.2 }}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <StarIcon />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-neutral-100 leading-[1.5]">
                      {comment.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {comment.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Agent 탭 */}
        {activeTab === "agent" && (
          <div className="px-2">
            <div className="flex justify-end mb-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                onClick={() => setIsSystemPromptOpen(true)}
              >
                System Prompt
              </Button>
            </div>

            {/* 날짜 */}
            <p className="text-xs text-center text-muted-foreground mb-4">
              2025-09-30 16:19:58
            </p>

            {/* 대화 내용 */}
            <div className="space-y-4">
              {/* AI 메시지 */}
              <div className="flex gap-2 items-start">
                <AgentAvatar />
                <div className="rounded-2xl p-2 border-[0.5px] max-w-[80%]" style={{ backgroundColor: 'var(--agent-message-bg)', borderColor: 'var(--color-glass-border)' }}>
                  <p className="text-xs text-foreground/80">
                    안녕하세요! 무엇을 도와드릴까요?
                  </p>
                </div>
              </div>

              {/* 사용자 메시지 */}
              <div className="flex gap-2 items-start justify-end">
                <div className="rounded-2xl p-2 border-[0.5px] max-w-[80%]" style={{ backgroundColor: 'var(--agent-user-message-bg)', borderColor: 'var(--color-primary)', borderOpacity: 0.3 }}>
                  <p className="text-xs text-neutral-100">
                    이미지를 생성해주세요
                  </p>
                </div>
              </div>

              {/* AI 메시지 */}
              <div className="flex gap-2 items-start">
                <AgentAvatar />
                <div className="rounded-2xl p-2 border-[0.5px] max-w-[80%]" style={{ backgroundColor: 'var(--agent-message-bg)', borderColor: 'var(--color-glass-border)' }}>
                  <p className="text-xs text-foreground/80">
                    이미지가 생성되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 - 하단 고정 */}
      <div className="pt-4 border-t border-white/10">
        <div className="relative flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-3xl border border-border px-3 py-2 transition-all duration-200 hover:bg-card/90 group">
          {/* + 버튼 with Popover */}
          <FileAttachPopover 
            align="start"
            side="top"
            sideOffset={8}
            buttonClassName="h-7 w-7"
          />

          {/* Input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('common.workWithAgent')}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm min-w-0 py-1"
          />

          {/* 생성하기 버튼 */}
          <Button 
            size="icon"
            className="group interactive rounded-full !h-7 !w-7 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center !p-0 transition-all duration-200 flex-shrink-0"
            onClick={handleSend}
          >
            <IconSparkles 
              size={14} 
              className="transition-colors duration-200"
              color="currentColor"
            />
          </Button>
        </div>
      </div>
      {/* 시스템 프롬프트 다이얼로그 */}
      <SystemPromptDialog 
        open={isSystemPromptOpen}
        onOpenChange={setIsSystemPromptOpen}
        initialPrompt={systemPrompt}
        onSave={setSystemPrompt}
      />
    </div>
  );
}
