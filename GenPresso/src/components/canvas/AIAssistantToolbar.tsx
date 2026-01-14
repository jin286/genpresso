import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Combine,
  Layers,
  Image as ImageIcon, 
  Video,
  Group,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  MoreVertical
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";

interface AIAssistantToolbarProps {
  isVisible: boolean;
  selectedNodeCount: number;
  onMixNodes?: () => void;
  onCompositionNodes?: () => void;
  onGroupNodes?: () => void;
}

/**
 * AIAssistantToolbar - AI 질문하기 툴바
 * 
 * 여러 노드 선택 시 상단 도구바 아래에 나타나는 글라스모피즘 툴바
 * AI 도구들을 빠르게 사용할 수 있는 인터페이스
 * 
 * 디자인:
 * - 글라스모피즘 배경
 * - 축소/확장 모드 지원 (TopToolbar와 동일)
 * - 아이콘 20px, 텍스트 12px
 * - 부드러운 애니메이션
 */
const AIAssistantToolbarComponent = ({ isVisible, selectedNodeCount, onMixNodes, onCompositionNodes, onGroupNodes }: AIAssistantToolbarProps) => {
  const { t } = useLanguage();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isCompact, setIsCompact] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 화면 크기에 따른 자동 모드 설정 (1280px 기준)
  useEffect(() => {
    const initializeMode = () => {
      const savedMode = localStorage.getItem('aiAssistantToolbarMode');
      const shouldBeCompact = window.innerWidth <= 1280;
      
      if (savedMode) {
        setIsCompact(savedMode === 'compact');
      } else {
        setIsCompact(shouldBeCompact);
      }
    };

    initializeMode();

    const handleResize = () => {
      const savedMode = localStorage.getItem('aiAssistantToolbarMode');
      if (!savedMode) {
        const shouldBeCompact = window.innerWidth <= 1280;
        setIsCompact(shouldBeCompact);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('aiAssistantToolbarMode');
      if (savedMode) {
        setIsCompact(savedMode === 'compact');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleLocalChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'aiAssistantToolbarMode') {
        setIsCompact(customEvent.detail.value === 'compact');
      }
    };

    window.addEventListener('localStorageChange', handleLocalChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalChange);
    };
  }, []);
  
  const handleToolClick = useCallback((toolId: string, toolLabel: string) => {
    if (toolId === 'mix') {
      onMixNodes?.();
    } else if (toolId === 'composition') {
      onCompositionNodes?.();
    } else if (toolId === 'group') {
      onGroupNodes?.();
    } else {
      toast.success(`${toolLabel} - ${t('canvas.nodesSelected', { count: selectedNodeCount })}`);
    }
  }, [selectedNodeCount, onMixNodes, onCompositionNodes, onGroupNodes, t]);

  // 드래그 시작
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
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
    e.stopPropagation();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  }, []);

  // 도구바 축소/확장
  const handleToggleCompact = useCallback(() => {
    const newMode = isCompact ? 'expanded' : 'compact';
    setIsCompact(prev => !prev);
    setShowContextMenu(false);
    
    localStorage.setItem('aiAssistantToolbarMode', newMode);
    
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'aiAssistantToolbarMode', value: newMode }
    }));
    
    toast.success(t(isCompact ? 'canvas.tools.toolbarExpanded' : 'canvas.tools.toolbarCollapsed'));
  }, [isCompact, t]);

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

  const tools = [
    { id: 'agent', label: t('canvas.aiQuestion'), icon: MessageSquare },
    { id: 'divider1', label: '', icon: null },
    { id: 'mix', label: t('canvas.aiTools.mix'), icon: Combine },
    { id: 'composition', label: t('canvas.aiTools.composition'), icon: Layers },
    { id: 'image', label: t('canvas.aiTools.imageConvert'), icon: ImageIcon },
    { id: 'video', label: t('canvas.aiTools.videoGenerate'), icon: Video },
    { id: 'divider2', label: '', icon: null },
    { id: 'group', label: t('canvas.aiTools.group'), icon: Group },
  ];

  if (!isVisible || selectedNodeCount === 0) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed left-1/2 z-40 transition-all duration-300 ease-out group"
        style={{
          top: isVisible ? '110px' : '-100px',
          opacity: isVisible ? 1 : 0,
          transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
      >
        <div
          className="relative flex items-center gap-1.5 px-1.5 py-1.5 rounded-xl border-[0.5px] border-solid whitespace-nowrap"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {tools.map((tool) => {
            // 구분선 렌더링
            if (tool.id.startsWith('divider')) {
              return (
                <div 
                  key={tool.id} 
                  className="w-px h-6 mx-1" 
                  style={{ backgroundColor: 'var(--color-glass-border)' }}
                />
              );
            }

            const Icon = tool.icon;
            if (!Icon) return null;

            const isHovered = hoveredTool === tool.id;

            return (
              <button
                key={tool.id}
                className={`relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200`}
                style={{
                  backgroundColor: isHovered ? 'var(--color-glass-hover-bg)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                onClick={() => handleToolClick(tool.id, tool.label)}
                aria-label={tool.label}
              >
                <Icon className={`w-5 h-5 transition-colors ${isHovered ? 'text-primary' : 'text-foreground'}`} />
                {!isCompact && (
                  <span className={`text-xs transition-colors whitespace-nowrap ${isHovered ? 'text-primary' : 'text-foreground'}`}>
                    {tool.label}
                  </span>
                )}

                {/* 축소형일 때 상단 툴팁 */}
                {isCompact && isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-50">
                    <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: '0.5px solid var(--tooltip-border)',
                      backdropFilter: 'blur(var(--tooltip-backdrop))',
                      WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                      boxShadow: 'var(--tooltip-shadow)'
                    }}>
                      {tool.label}
                    </div>
                  </div>
                )}
              </button>
            );
          })}

          {/* 노드 선택 표시 - 축소형/확장형 모두 표시 */}
          <>
            <div 
              className="w-px h-6 mx-1" 
              style={{ backgroundColor: 'var(--color-glass-border)' }}
            />
            <div className="flex items-center px-2 py-1">
              <span className="text-xs text-primary whitespace-nowrap">
                {t('canvas.nodesSelected', { count: selectedNodeCount })}
              </span>
            </div>
          </>

          {/* 드래그 핸들 - 툴바 우측 중앙 오버레이, 호버 시만 표시 */}
          <div 
            className="absolute -right-3 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            onMouseDown={handleDragStart}
            onContextMenu={handleContextMenu}
            title={t('canvas.tools.dragToMove')}
          >
            <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-px py-1 backdrop-blur-sm transition-colors">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* 컨텍스트 메뉴 */}
      {showContextMenu && (
        <div
          className="fixed z-[100] min-w-[160px] rounded-lg border bg-popover p-1 shadow-md"
          style={{
            left: `${contextMenuPos.x}px`,
            top: `${contextMenuPos.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={handleToggleCompact}
          >
            {isCompact ? (
              <>
                <Maximize2 className="w-4 h-4" />
                {t('canvas.tools.expandToolbar')}
              </>
            ) : (
              <>
                <Minimize2 className="w-4 h-4" />
                {t('canvas.tools.collapseToolbar')}
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
};

AIAssistantToolbarComponent.displayName = "AIAssistantToolbar";

export const AIAssistantToolbar = memo(AIAssistantToolbarComponent);