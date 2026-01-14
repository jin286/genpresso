import { useState, useCallback, memo, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";
import { getGlassmorphismStyle } from "../layout/layout-constants";
import { FileAttachPopover } from "../ui/file-attach-popover";
import { MoreHorizontal, MessageSquare, ArrowUp } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { AgentSettingsDialog } from "../agent/AgentSettingsDialog";
import { ModelSelectionDialog } from "../forms/ModelSelectionDialog";

interface GenerationInputProps {
  visible?: boolean;
  onHide?: () => void;
  onShow?: () => void;
  onMixNodeCreate?: () => void;
}

/**
 * GenerationInput - 캔버스 하단 생성 채팅창
 * 
 * 파일 첨부 Popover + 입력창 + 생성하기 버튼
 * 드래그 가능, 우클릭으로 숨김 기능
 */
function GenerationInput({ visible = true, onHide, onShow, onMixNodeCreate }: GenerationInputProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [isModelSelectionOpen, setIsModelSelectionOpen] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCreateNew = useCallback(() => {
    if (inputValue.trim()) {
      toast.success(t('canvas.generationStarted', { type: inputValue }));
      setInputValue("");
      
      // Reset height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } else {
      toast.error(t('canvas.inputRequired'));
    }
  }, [inputValue, t]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateNew();
    }
  }, [handleCreateNew]);

  // Auto-resize textarea & Multiline detection
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // lineHeight 1.6 기준으로 줄 수 계산 (더 정확한 감지)
      // text-sm(14px) * 1.6 = 22.4px, text-base(16px) * 1.6 = 25.6px
      // 한 줄: ~25px, 두 줄: ~50px → 기준을 35px로 낮춤
      setIsMultiLine(scrollHeight > 35);

      // Limit max height to roughly 5 lines (approx 24px * 5 = 120px)
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // 드래그 시작
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  // 드래그 중
  const handleDragMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart]);

  // 드래그 종료
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 우클릭 메뉴
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  }, []);

  // 채팅바 숨김
  const handleHide = useCallback(() => {
    setShowContextMenu(false);
    onHide?.();
    toast.success(t('canvas.chatBarHidden'));
  }, [onHide, t]);

  // 채팅바 나타내기
  const handleShow = useCallback(() => {
    setShowContextMenu(false);
    onShow?.();
    toast.success(t('canvas.chatBarShown'));
  }, [onShow, t]);

  // 드래그 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // 컨텍스트 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (showContextMenu) {
      const handleClick = () => setShowContextMenu(false);
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [showContextMenu]);

  // 숨김 상태에서는 드래그 핸들만 표시
  if (!visible) {
    return (
      <>
        <div 
          ref={containerRef}
          className="fixed left-1/2 bottom-10 z-30 group"
          style={{
            transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'default',
          }}
        >
          {/* 드래그 핸들 - 숨김 상태에서는 항상 표시 */}
          <div 
            className="transition-opacity duration-200 cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onContextMenu={handleContextMenu}
            title={t('canvas.dragToMoveRightClickMenu')}
          >
            <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-1 py-px backdrop-blur-sm transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* 컨텍스트 메뉴 - 숨김 상태 */}
        {showContextMenu && (
          <div
            className="fixed z-50 min-w-[160px] rounded-lg border bg-popover p-1 shadow-md"
            style={{
              left: `${contextMenuPos.x}px`,
              top: `${contextMenuPos.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={handleShow}
            >
              <MessageSquare className="w-5 h-5" />
              {t('canvas.showChatBar')}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed left-1/2 bottom-10 z-30 w-full max-w-2xl 2xl:max-w-4xl px-4 flex items-end gap-2 group"
        role="search"
        aria-label="생성 입력"
        style={{
          transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
      >
        {/* 입력창 + 생성 버튼 (말풍선 영역) */}
        <div 
          className={`flex-1 relative border-[0.5px] border-solid ${isMultiLine ? 'rounded-[28px]' : 'rounded-full'} px-1.5 py-1.5 transition-all duration-200 flex items-center gap-1.5`}
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {/* 드래그 핸들 - 호버 시만 표시 (채팅바 내부 최상단) */}
          <div 
            className="absolute left-1/2 top-0.5 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing z-10"
            onMouseDown={handleDragStart}
            onContextMenu={handleContextMenu}
            title="드래그하여 이동 | 우클릭으로 메뉴 열기"
          >
            <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-1.5 py-0 backdrop-blur-sm">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* 좌측 버튼 그룹: 설정, 모델 선택 (채팅바 내부) */}
          <div className="shrink-0 flex items-center gap-0 self-end">
            {/* 파일 첨부 버튼 */}
            <div className="relative group/attach">
              <FileAttachPopover 
                buttonClassName="!bg-transparent hover:!bg-[var(--glass-hover-bg)] !border-0 !shadow-none"
                showLabel={false}
              />
              {/* 툴팁 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/attach:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '0.5px solid var(--tooltip-border)',
                  backdropFilter: 'blur(var(--tooltip-backdrop))',
                  WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                  boxShadow: 'var(--tooltip-shadow)'
                }}>
                  {t('upload.attachFile')}
                </div>
              </div>
            </div>
            
            {/* 설정 버튼 */}
            <div className="relative group/settings">
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--glass-icon)',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'var(--glass-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'transparent';
                }}
                onClick={() => setIsAgentSettingsOpen(true)}
                aria-label={t('agent.settings')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              {/* 툴팁 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/settings:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '0.5px solid var(--tooltip-border)',
                  backdropFilter: 'blur(var(--tooltip-backdrop))',
                  WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                  boxShadow: 'var(--tooltip-shadow)'
                }}>
                  {t('agent.settings')}
                </div>
              </div>
            </div>
            
            {/* 모델 선택 버튼 */}
            <div className="relative group/model">
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--glass-icon)',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'var(--glass-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = 'transparent';
                }}
                onClick={() => setIsModelSelectionOpen(true)}
                aria-label={t('agent.modelSelection')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="6" cy="6" r="2" />
                  <circle cx="6" cy="12" r="2" />
                  <circle cx="6" cy="18" r="2" />
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <circle cx="18" cy="12" r="2" />
                  <circle cx="18" cy="18" r="2" />
                </svg>
              </button>
              {/* 툴팁 */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/model:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '0.5px solid var(--tooltip-border)',
                  backdropFilter: 'blur(var(--tooltip-backdrop))',
                  WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                  boxShadow: 'var(--tooltip-shadow)'
                }}>
                  {t('agent.modelSelection')}
                </div>
              </div>
            </div>
          </div>

          {/* 입력창 */}
          <label htmlFor="generation-input" className="sr-only">
            생성할 내용 입력
          </label>
          <textarea
            id="generation-input"
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('common.workWithAgent')}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm md:text-base min-w-0 m-0 px-0 py-0 resize-none max-h-[120px] overflow-y-auto"
            rows={1}
            aria-label={t('common.workWithAgent')}
            aria-required="true"
            style={{
              lineHeight: '1.6',
              outline: 'none',
              border: 'none',
            }}
          />

          {/* Generate button (Circular Black Button) */}
          <Button 
            size="icon"
            className="shrink-0 rounded-full !h-8 !w-8 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center p-0 transition-all duration-200 shadow-sm self-end"
            onClick={handleCreateNew}
            aria-label={t('common.generate')}
            type="submit"
          >
            <ArrowUp 
              strokeWidth={2.5}
              className="w-5 h-5 text-primary-foreground"
            />
          </Button>
        </div>
      </div>

      {/* 컨텍스트 메뉴 */}
      {showContextMenu && (
        <div
          className="fixed z-50 min-w-[160px] rounded-lg border bg-popover p-1 shadow-md"
          style={{
            left: `${contextMenuPos.x}px`,
            top: `${contextMenuPos.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={handleHide}
          >
            <MessageSquare className="w-4 h-4" />
            {t('canvas.hideChatBar')}
          </button>
        </div>
      )}

      {/* 에이전트 설정 Dialog */}
      <AgentSettingsDialog
        isOpen={isAgentSettingsOpen}
        onClose={() => setIsAgentSettingsOpen(false)}
      />

      {/* 모델 선택 Dialog */}
      <ModelSelectionDialog
        isOpen={isModelSelectionOpen}
        onClose={() => setIsModelSelectionOpen(false)}
      />
    </>
  );
}

GenerationInput.displayName = "GenerationInput";

export default memo(GenerationInput);