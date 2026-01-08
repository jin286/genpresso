import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { MousePointer2, Hand, Network, FolderOpen, Images, Compass, Type, Image, Video, Upload, Settings, MoreVertical, Maximize2, Minimize2, Keyboard, Combine, Layers } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getGlassmorphismStyle } from "../layout/layout-constants";
import type { CanvasToolId } from "../../types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { NodeType } from "./NodeCard";
import IconSrokeChatbubbles from "../../imports/IconSrokeChatbubbles";
import { ShortcutGuide } from "./ShortcutGuide";
import { useLanguage } from "../../contexts/LanguageContext";

interface LeftToolbarProps {
  activeTool: string;
  onToolChange: (toolId: CanvasToolId) => void;
  onFilesClick: () => void;
  onGalleryClick: () => void;
  onNodeCreate?: (type: NodeType) => void;
}

// Tools와 node types는 컴포넌트 내부로 이동하여 t() 함수 사용

function LeftToolbar({ 
  activeTool, 
  onToolChange, 
  onFilesClick, 
  onGalleryClick,
  onNodeCreate
}: LeftToolbarProps) {
  const { t } = useLanguage();
  const [isNodePopoverOpen, setIsNodePopoverOpen] = useState(false);
  
  const uploadFilesLabel = t('canvas.tools.uploadFiles');
  const uploadFilesWords = uploadFilesLabel.split(' ');
  
  const leftTools = [
    { id: 'select' as const, icon: MousePointer2, label: t('canvas.tools.select') },
    { id: 'hand' as const, icon: Hand, label: t('canvas.tools.hand') },
    { id: 'node' as const, icon: Network, label: t('canvas.tools.node') },
    { 
      id: 'files' as const, 
      icon: FolderOpen, 
      label: uploadFilesLabel,
      labelElement: (
        <>
          {uploadFilesWords.map((word, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {word}
            </React.Fragment>
          ))}
        </>
      )
    },
    { id: 'gallery' as const, icon: Images, label: t('canvas.tools.gallery') },
    { id: 'explore' as const, icon: Compass, label: t('canvas.tools.explore') },
    { id: 'comment' as const, icon: IconSrokeChatbubbles, label: t('canvas.tools.comment') },
    { id: 'shortcut' as const, icon: Keyboard, label: t('canvas.tools.shortcut') },
  ];

  const nodeTypes = [
    { type: 'text' as const, icon: Type, label: t('canvas.nodeTypes.text') },
    { type: 'image' as const, icon: Image, label: t('canvas.nodeTypes.image') },
    { type: 'video' as const, icon: Video, label: t('canvas.nodeTypes.video') },
    { type: 'mix' as const, icon: Combine, label: t('canvas.nodeTypes.mix') },
    { type: 'composition' as const, icon: Layers, label: t('canvas.nodeTypes.composition') },
  ];
  const [showShortcutGuide, setShowShortcutGuide] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isCompact, setIsCompact] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 화면 크기에 따른 자동 모드 설정 (1280px 기준)
  useEffect(() => {
    const initializeMode = () => {
      const savedMode = localStorage.getItem('leftToolbarMode');
      const shouldBeCompact = window.innerWidth <= 1280;
      
      if (savedMode) {
        // 사용자가 수동으로 설정한 경우
        setIsCompact(savedMode === 'compact');
      } else {
        // 화면 크기에 따라 자동 설정
        setIsCompact(shouldBeCompact);
      }
    };

    initializeMode();

    // 화면 크기 변경 감지
    const handleResize = () => {
      const savedMode = localStorage.getItem('leftToolbarMode');
      if (!savedMode) {
        // 사용자 설정이 없을 때만 자동 조정
        const shouldBeCompact = window.innerWidth <= 1280;
        setIsCompact(shouldBeCompact);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // localStorage 변경 감지 (설정 패널에서 변경 시)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('leftToolbarMode');
      if (savedMode) {
        setIsCompact(savedMode === 'compact');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 같은 탭 내에서의 변경도 감지 (Custom Event 사용)
    const handleLocalChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'leftToolbarMode') {
        setIsCompact(customEvent.detail.value === 'compact');
      }
    };

    window.addEventListener('localStorageChange', handleLocalChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalChange);
    };
  }, []);

  const handleToolClick = useCallback((toolId: CanvasToolId) => {
    // 노드생성 버튼은 Popover로 처리하므로 여기서는 스킵
    if (toolId === 'node') {
      return;
    }

    // 단축키 버튼은 다이얼로그 열기
    if (toolId === 'shortcut') {
      setShowShortcutGuide(true);
      return;
    }

    onToolChange(toolId);
    
    if (toolId === 'files') {
      onFilesClick();
    } else if (toolId === 'gallery') {
      onGalleryClick();
    } else if (toolId === 'comment') {
      // 코멘트 도구는 토스트 없이 조용히 활성화
      // 사용자는 캔버스를 클릭해서 핀을 생성합니다
    } else {
      const tool = leftTools.find(t => t.id === toolId);
      if (tool && typeof tool.label === 'string') {
        toast.success(t('canvas.tools.toolSelected', { tool: tool.label }));
      }
    }
  }, [onToolChange, onFilesClick, onGalleryClick, t]);

  const handleNodePopoverChange = useCallback((open: boolean) => {
    setIsNodePopoverOpen(open);
    if (open) {
      // Popover 열릴 때 노드생성 도구 활성화
      onToolChange('node');
    }
  }, [onToolChange]);

  const handleNodeTypeSelect = useCallback((type: NodeType) => {
    setIsNodePopoverOpen(false);
    if (onNodeCreate) {
      onNodeCreate(type);
    } else {
      toast.success(t('canvas.tools.nodeCreated', { node: nodeTypes.find(n => n.type === type)?.label }));
    }
  }, [onNodeCreate, t]);

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
    
    // localStorage에 저장하여 사용자 설정 우선
    localStorage.setItem('leftToolbarMode', newMode);
    
    // 같은 탭의 다른 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'leftToolbarMode', value: newMode }
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

  return (
    <>
      <nav 
        ref={containerRef}
        className="fixed left-4 top-1/2 z-30 group hidden md:block"
        role="toolbar"
        aria-label={t('canvas.tools.canvasTools')}
        style={{
          transform: `translate(${position.x}px, calc(-50% + ${position.y}px))`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
      >
        {/* 드래그 핸들 - 툴바 외부 우측 중앙, 호버 시만 표시 */}
        <div 
          className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing z-10"
          onMouseDown={handleDragStart}
          onContextMenu={handleContextMenu}
          title={t('canvas.tools.dragToMove')}
        >
          <div className="bg-muted-foreground/20 hover:bg-muted-foreground/30 rounded-full px-0.5 py-1.5 backdrop-blur-sm">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div 
          className="relative flex flex-col items-center gap-1.5 py-1.5 px-1.5 rounded-xl border"
          style={getGlassmorphismStyle()}
        >
        {leftTools.map((tool) => {
          // 노드생성 버튼은 Popover로 감싸기
          if (tool.id === 'node') {
            return (
              <Popover key={tool.id} open={isNodePopoverOpen} onOpenChange={handleNodePopoverChange}>
                <PopoverTrigger asChild>
                  <button
                    className={`flex flex-col items-center justify-center gap-1 ${isCompact ? 'w-11 h-11' : 'w-12 h-14'} p-0.5 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      activeTool === tool.id ? 'bg-secondary' : ''
                    }`}
                    aria-label={typeof tool.label === 'string' ? tool.label : '도구'}
                    aria-pressed={activeTool === tool.id}
                    tabIndex={0}
                  >
                    <tool.icon 
                      className={`w-5 h-5 ${activeTool === tool.id ? 'text-primary' : ''}`} 
                      aria-hidden="true"
                    />
                    {!isCompact && (
                      <span className={`text-xs text-center leading-tight ${activeTool === tool.id ? 'text-primary' : ''}`}>
                        {(tool as any).labelElement || tool.label}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  side="right" 
                  align="start"
                  sideOffset={16}
                  className="w-40 p-2"
                  style={{
                    backgroundColor: 'var(--color-glass-bg)',
                    backdropFilter: 'blur(var(--blur-glass))',
                    WebkitBackdropFilter: 'blur(var(--blur-glass))',
                    borderColor: 'var(--color-glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                  }}
                >
                  <div className="flex flex-col gap-1">
                    {nodeTypes.map((nodeType) => (
                      <button
                        key={nodeType.type}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => handleNodeTypeSelect(nodeType.type)}
                      >
                        <nodeType.icon className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm">{nodeType.label}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <button
              key={tool.id}
              className={`flex flex-col items-center justify-center gap-1 ${isCompact ? 'w-11 h-11' : 'w-12 h-14'} p-0.5 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeTool === tool.id ? 'bg-secondary' : ''
              }`}
              onClick={() => handleToolClick(tool.id)}
              aria-label={typeof tool.label === 'string' ? tool.label : t('canvas.tools.tool')}
              aria-pressed={activeTool === tool.id}
              tabIndex={0}
            >
              <tool.icon 
                className={`w-5 h-5 ${activeTool === tool.id ? 'text-primary' : ''}`} 
                aria-hidden="true"
              />
              {!isCompact && (
                <span className={`text-xs text-center leading-tight ${activeTool === tool.id ? 'text-primary' : ''}`}>
                  {(tool as any).labelElement || tool.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>

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

    {/* 단축키 가이드 Dialog */}
    <ShortcutGuide 
      isOpen={showShortcutGuide} 
      onClose={() => setShowShortcutGuide(false)} 
    />
    </>
  );
}

LeftToolbar.displayName = "LeftToolbar";

export default memo(LeftToolbar);