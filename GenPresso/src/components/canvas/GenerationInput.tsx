import { useState, useCallback, memo, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";
import { IconSparkles } from "../icons";
import { getGlassmorphismStyle } from "../layout/layout-constants";
import { FileAttachPopover } from "../ui/file-attach-popover";
import { MoreHorizontal, MessageSquare } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

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
      
      // 한 줄 높이(약 40-42px)보다 크면 멀티라인으로 간주
      setIsMultiLine(scrollHeight > 45);

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
            <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-1.5 py-0.5 backdrop-blur-sm">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
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
        {/* 파일 첨부 버튼 (외부로 분리) */}
        <div className="shrink-0 pb-1.5">
          <FileAttachPopover 
            buttonClassName="!w-11 !h-11 !rounded-full !bg-[var(--glass-bg)] !border-[0.726px] !border-[var(--glass-border)] hover:!bg-[var(--glass-hover-bg)] !text-[var(--glass-icon)] !shadow-[var(--glass-shadow)] transition-colors backdrop-blur-md"
            showLabel={false}
          />
        </div>

        {/* 입력창 + 생성 버튼 (말풍선 영역) */}
        <div 
          className={`flex-1 relative border-[0.5px] border-solid ${isMultiLine ? 'rounded-[28px]' : 'rounded-full'} pl-5 pr-2 py-1.5 transition-all duration-200 flex items-end gap-2`}
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
            className="absolute left-1/2 top-1 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing z-10"
            onMouseDown={handleDragStart}
            onContextMenu={handleContextMenu}
            title="드래그하여 이동 | 우클릭으로 메뉴 열기"
          >
            <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-1.5 py-0.5 backdrop-blur-sm">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
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
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm md:text-base min-w-0 m-0 px-0 py-2 resize-none max-h-[120px] overflow-y-auto"
            rows={1}
            aria-label={t('common.workWithAgent')}
            aria-required="true"
            style={{
              lineHeight: '1.5',
            }}
          />

          {/* Generate button (Circular Black Button) */}
          <Button 
            size="icon"
            className="shrink-0 rounded-full !h-10 !w-10 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center p-0 transition-all duration-200 shadow-sm"
            onClick={handleCreateNew}
            aria-label={t('common.generate')}
            type="submit"
          >
            <IconSparkles 
              size={18} 
              className="text-primary-foreground"
              color="currentColor"
              aria-hidden="true"
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
    </>
  );
}

GenerationInput.displayName = "GenerationInput";

export default memo(GenerationInput);