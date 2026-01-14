import { memo, useCallback, useState, useEffect, useRef } from "react";
import { ArrowUpCircle, Eraser, Expand, Paintbrush, Palette, Lock, Trash2, LockKeyhole, MoreHorizontal, Maximize2, Minimize2, Download, Scissors, FolderInput, MoreVertical } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CANVAS_UI, getGlassmorphismStyle } from "../layout/layout-constants";
import type { AIToolId } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

interface TopToolbarProps {
  activeTool: string;
  onToolChange: (toolId: AIToolId) => void;
  selectedNodeCount?: number;
  onDeleteSelected?: () => void;
  onLockSelected?: () => void;
  onDownloadSelected?: () => void;
  onSegmentSeparate?: () => void;
  onMoveToWorkspace?: () => void;
}

const topTools = [
  { id: 'upscale' as const, key: 'canvas.aiTools.upscale', icon: ArrowUpCircle },
  { id: 'remove-bg' as const, key: 'canvas.aiTools.removeBg', icon: Eraser },
  { id: 'outpaint' as const, key: 'canvas.aiTools.outpaint', icon: Expand },
  { id: 'inpaint' as const, key: 'canvas.aiTools.inpaint', icon: Paintbrush },
  { id: 'palette' as const, key: 'canvas.aiTools.palette', icon: Palette },
];

function TopToolbar({ 
  activeTool, 
  onToolChange, 
  selectedNodeCount = 0,
  onDeleteSelected,
  onLockSelected,
  onDownloadSelected,
  onSegmentSeparate,
  onMoveToWorkspace,
}: TopToolbarProps) {
  const { t } = useLanguage();
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
      const savedMode = localStorage.getItem('topToolbarMode');
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
      const savedMode = localStorage.getItem('topToolbarMode');
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
      const savedMode = localStorage.getItem('topToolbarMode');
      if (savedMode) {
        setIsCompact(savedMode === 'compact');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 같은 탭 내에서의 변경도 감지 (Custom Event 사용)
    const handleLocalChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'topToolbarMode') {
        setIsCompact(customEvent.detail.value === 'compact');
      }
    };

    window.addEventListener('localStorageChange', handleLocalChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalChange);
    };
  }, []);

  const handleToolClick = useCallback((toolId: AIToolId) => {
    onToolChange(toolId);
  }, [onToolChange]);

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
    localStorage.setItem('topToolbarMode', newMode);
    
    // 같은 탭의 다른 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'topToolbarMode', value: newMode }
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
        className="fixed left-1/2 z-30 group"
        style={{
          top: `${CANVAS_UI.TOOLS_TOP}px`,
          transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        role="toolbar"
        aria-label={t('canvas.tools.aiTools')}
      >
        <div 
          className="relative flex flex-nowrap items-center gap-1.5 px-1.5 py-1.5 rounded-xl border whitespace-nowrap"
          style={getGlassmorphismStyle()}
        >
          
          {topTools.map((tool) => {
            const label = t(tool.key);
            return (
              <button
                key={tool.id}
                className={`group/btn relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTool === tool.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleToolClick(tool.id)}
                aria-label={label}
                aria-pressed={activeTool === tool.id}
                tabIndex={0}
              >
                <tool.icon 
                  className={`w-5 h-5 ${activeTool === tool.id ? 'text-primary' : ''}`} 
                  aria-hidden="true"
                />
                {!isCompact && (
                  <span className={`text-xs ${activeTool === tool.id ? 'text-primary' : ''}`}>{label}</span>
                )}
                
                {/* 축소형일 때 상단 툴팁 */}
                {isCompact && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: '0.5px solid var(--tooltip-border)',
                      backdropFilter: 'blur(var(--tooltip-backdrop))',
                      WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                      boxShadow: 'var(--tooltip-shadow)'
                    }}>
                      {label}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
          
          {/* 다중 노드 작업 버튼 */}
          {selectedNodeCount > 0 && (
            <>
              <div className="w-px h-6 bg-border mx-1" />
              {onSegmentSeparate && (
                <button
                  className={`group/segment relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  onClick={onSegmentSeparate}
                  aria-label={t('canvas.aiTools.segmentSeparate')}
                  tabIndex={0}
                >
                  <Scissors className="w-5 h-5" aria-hidden="true" />
                  {!isCompact && <span className="text-xs">{t('canvas.aiTools.segmentSeparate')}</span>}
                  
                  {/* 축소형일 때 상단 툴팁 */}
                  {isCompact && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/segment:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('canvas.aiTools.segmentSeparate')}
                      </div>
                    </div>
                  )}
                </button>
              )}

              <div className="w-px h-6 bg-border mx-1" />
              {onLockSelected && (
                <button
                  className={`group/lock relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  onClick={onLockSelected}
                  aria-label={t('canvas.aiTools.lock')}
                  tabIndex={0}
                >
                  <LockKeyhole className="w-5 h-5" aria-hidden="true" />
                  {!isCompact && <span className="text-xs">{t('canvas.aiTools.lock')}</span>}
                  
                  {/* 축소형일 때 상단 툴팁 */}
                  {isCompact && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/lock:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('canvas.aiTools.lock')}
                      </div>
                    </div>
                  )}
                </button>
              )}
              {onDownloadSelected && (
                <button
                  className={`group/download relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  onClick={onDownloadSelected}
                  aria-label={t('canvas.aiTools.download')}
                  tabIndex={0}
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  {!isCompact && <span className="text-xs">{t('canvas.aiTools.download')}</span>}
                  
                  {/* 축소형일 때 상단 툴팁 */}
                  {isCompact && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/download:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('canvas.aiTools.download')}
                      </div>
                    </div>
                  )}
                </button>
              )}
              <div className="w-px h-6 bg-border mx-1" />
              {onDeleteSelected && (
                <button
                  className={`group/delete relative flex items-center gap-1.5 ${isCompact ? 'w-8 h-8 justify-center' : 'h-8 px-1.5'} py-1 rounded-lg transition-all duration-200 hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2`}
                  onClick={onDeleteSelected}
                  aria-label={t('canvas.aiTools.delete')}
                  tabIndex={0}
                >
                  <Trash2 className="w-5 h-5 text-destructive" aria-hidden="true" />
                  {!isCompact && <span className="text-xs text-destructive">{t('canvas.aiTools.delete')}</span>}
                  
                  {/* 축소형일 때 상단 툴팁 */}
                  {isCompact && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('canvas.aiTools.delete')}
                      </div>
                    </div>
                  )}
                </button>
              )}
            </>
          )}

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
      </nav>

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
}

TopToolbar.displayName = "TopToolbar";

export default memo(TopToolbar);