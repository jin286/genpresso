import React, { useState, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { Bookmark, Maximize2, Download, Scissors, Info, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../ui/dialog";
import { VisuallyHidden } from "../../ui/visually-hidden";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import {
  NODE_ICON,
  NODE_BUTTON,
  NODE_RADIUS,
  NODE_TEXT,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import type { Segment } from "../types";
import { useLanguage } from "../../../contexts/LanguageContext";

const SEGMENT_COLORS = [
  "#ef4444", "#3b82f6", "#f97316", "#8b5cf6",
  "#10b981", "#f59e0b", "#ec4899", "#06b6d4",
];

interface NodeFooterProps {
  nodeId?: string;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onFullView: () => void;
  imageUrl?: string;
  isSegmentActive?: boolean;
  onSegmentToggle?: () => void;
  segments?: Segment[];
  hoveredSegmentId?: string | null;
  onSegmentHover?: (id: string | null) => void;
  onSegmentExtract?: (id: string) => void;
}

interface OverlayButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  active?: boolean;
  filled?: boolean;
  label: string;
}

const OverlayButton = React.memo<OverlayButtonProps>(({ 
  icon, 
  onClick, 
  className, 
  active, 
  filled,
  label 
}) => (
  <button
    className={cn(
      NODE_BUTTON.SIZE_CLASS,
      FLEX.CENTER,
      NODE_RADIUS.SM,
      "bg-white/20 hover:bg-white/30 backdrop-blur-sm",
      INTERACTIVE_STYLES.TRANSITION,
      "border-2 border-transparent active:border-primary active:scale-95",
      active && "border-primary",
      className
    )}
    onClick={onClick}
    onMouseDown={(e) => e.stopPropagation()}
    onDoubleClick={(e) => e.stopPropagation()}
    aria-label={label}
  >
    {React.cloneElement(icon as React.ReactElement, {
      className: cn(
        NODE_ICON.SIZE_CLASS,
        "text-white",
        filled && "fill-white"
      ),
    })}
  </button>
));

OverlayButton.displayName = "OverlayButton";

interface SegmentRectProps {
  segment: Segment;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  imageUrl?: string;
  nodeId?: string;
}

const SegmentBox: React.FC<SegmentRectProps> = ({
  segment,
  index,
  isActive,
  onHover,
  onClick,
  onContextMenu,
  imageUrl,
  nodeId,
}) => {
  const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length];
  const { x, y, width, height } = segment.bounds;

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    const dragData = {
      type: 'segment',
      segmentId: segment.id,
      sourceNodeId: nodeId,
      imageUrl: imageUrl,
      cropBounds: segment.bounds,
      segmentName: segment.name,
    };
    e.dataTransfer.setData('application/react-flow-segment', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      className={cn(
        "absolute cursor-grab active:cursor-grabbing transition-all duration-200 pointer-events-auto",
        isActive ? "z-20 opacity-100" : "z-10 opacity-40 hover:opacity-80"
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        border: `2px solid ${color}`,
        borderWidth: isActive ? '3px' : '2px',
        backgroundColor: isActive ? `${color}30` : 'transparent',
      }}
      draggable={true}
      onDragStart={handleDragStart}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseEnter={() => onHover(segment.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onContextMenu={onContextMenu}
    />
  );
};

const NodeFooterComponent: React.FC<NodeFooterProps> = ({
  nodeId,
  isBookmarked,
  onBookmarkToggle,
  onFullView,
  imageUrl,
  isSegmentActive = false,
  onSegmentToggle,
  segments = [],
  hoveredSegmentId = null,
  onSegmentHover,
  onSegmentExtract,
}) => {
  const { t } = useLanguage();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ segmentId: string; x: number; y: number } | null>(null);
  const [lockedSegmentId, setLockedSegmentId] = useState<string | null>(null);

  const handleDownload = useCallback(() => {
    toast.success(t('node.downloadStarted'));
  }, [t]);

  const handleSegmentClick = useCallback((segmentId: string) => {
    if (lockedSegmentId === segmentId) {
      setLockedSegmentId(null);
      onSegmentHover?.(null);
    } else {
      setLockedSegmentId(segmentId);
      onSegmentHover?.(segmentId);
    }
  }, [lockedSegmentId, onSegmentHover]);

  const handleRightClick = useCallback((e: React.MouseEvent, segmentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ segmentId, x: e.clientX, y: e.clientY });
  }, []);

  const handleExtractSegment = useCallback(() => {
    if (contextMenu) {
      onSegmentExtract?.(contextMenu.segmentId);
      setContextMenu(null);
    }
  }, [contextMenu, onSegmentExtract]);

  useEffect(() => {
    if (!contextMenu) return;
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  return (
    <div 
      className={cn(
        "absolute inset-0 transition-opacity duration-200",
        isSegmentActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        !isSegmentActive && "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      )}
    >
      {isSegmentActive && segments.length > 0 && (
        <>
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {segments.map((segment, index) => {
              const isActive = hoveredSegmentId === segment.id || lockedSegmentId === segment.id;
              return (
                <SegmentBox
                  key={segment.id}
                  segment={segment}
                  index={index}
                  isActive={isActive}
                  onHover={onSegmentHover || (() => {})}
                  onClick={() => handleSegmentClick(segment.id)}
                  onContextMenu={(e) => handleRightClick(e, segment.id)}
                  imageUrl={imageUrl}
                  nodeId={nodeId}
                />
              );
            })}
          </div>



          {contextMenu && createPortal(
            <div
              className={cn("fixed z-[100] border-[0.5px] p-1 min-w-[160px]", NODE_RADIUS.LG)}
              style={{
                left: `${contextMenu.x + 4}px`,
                top: `${contextMenu.y + 4}px`,
                backgroundColor: 'var(--color-glass-bg)',
                backdropFilter: 'blur(var(--blur-glass))',
                WebkitBackdropFilter: 'blur(var(--blur-glass))',
                borderColor: 'var(--color-glass-border)',
                boxShadow: 'var(--glass-shadow)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={cn(
                  "w-full px-3 py-2 text-left rounded-lg transition-colors duration-200",
                  NODE_TEXT.SM,
                  "bg-secondary/10 hover:bg-secondary/20 text-foreground border border-border/50 hover:border-primary/30"
                )}
                onClick={handleExtractSegment}
              >
                내보내기
              </button>
            </div>,
            document.body
          )}
        </>
      )}

      {onSegmentToggle && (
        <OverlayButton
          icon={<Scissors />}
          onClick={(e) => {
            e.stopPropagation();
            onSegmentToggle();
          }}
          className={cn(
            "absolute top-1.5 left-1.5 z-10",
            isSegmentActive && "bg-primary/80 hover:bg-primary border-primary"
          )}
          label={t('node.segmentLabel')}
        />
      )}

      {!isSegmentActive && (
        <>
          <OverlayButton
            icon={<Download />}
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="absolute top-1.5 right-1.5"
            label={t('node.downloadLabel')}
          />

          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
            <OverlayButton
              icon={<Bookmark />}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle();
              }}
              active={isBookmarked}
              filled={isBookmarked}
              label={t('node.bookmark')}
            />

            <OverlayButton
              icon={<Maximize2 />}
              onClick={(e) => {
                e.stopPropagation();
                imageUrl ? setIsViewOpen(true) : onFullView();
              }}
              label={t('node.viewFull')}
            />
          </div>
        </>
      )}

      {imageUrl && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent
            className="max-w-[calc(100vw-2rem)] sm:max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
            style={{
              backgroundColor: "var(--color-glass-bg)",
              backdropFilter: "blur(var(--blur-glass))",
              WebkitBackdropFilter: "blur(var(--blur-glass))",
              borderColor: "var(--color-glass-border)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <VisuallyHidden>
              <DialogTitle>이미지 전체보기</DialogTitle>
              <DialogDescription>생성된 이미지를 전체 화면으로 확인합니다</DialogDescription>
            </VisuallyHidden>

            {/* 헤더 */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--color-glass-border)" }}
            >
              <div>
                <h2 className="text-base font-semibold text-foreground">이미지 뷰어</h2>

              </div>
              
              <div className="flex items-center gap-2 mr-4">
                <button
                  onClick={() => setIsInfoOpen(!isInfoOpen)}
                  className={cn(
                    NODE_BUTTON.SIZE_CLASS,
                    FLEX.CENTER,
                    NODE_RADIUS.SM,
                    "transition-colors",
                    isInfoOpen 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                  )}
                  title="정보 및 액션"
                >
                  <Info className={NODE_ICON.SIZE_CLASS} />
                </button>
                
                <button
                  onClick={handleDownload}
                  className={cn(
                    NODE_BUTTON.SIZE_CLASS,
                    FLEX.CENTER,
                    NODE_RADIUS.SM,
                    "hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors"
                  )}
                  title="다운로드"
                >
                  <Download className={NODE_ICON.SIZE_CLASS} />
                </button>


              </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 relative overflow-hidden flex min-h-0 bg-muted/30">
              {/* 이미지 영역 */}
              <div className="flex-1 flex items-center justify-center p-4 min-w-0 transition-all duration-300 ease-in-out">
                <ImageWithFallback
                  src={imageUrl}
                  alt="Full view"
                  className="max-w-full max-h-full object-contain shadow-sm"
                />
              </div>

              {/* 정보 패널 (우측 슬라이드) */}
              <div 
                className={cn(
                  "flex-shrink-0 border-l flex flex-col bg-background/50 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
                  isInfoOpen ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-20 border-l-0"
                )}
                style={{ borderColor: "var(--color-glass-border)" }}
              >
                <div className="w-64 flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto">
                    {/* 정보 섹션 */}
                    <div className="p-6 border-b" style={{ borderColor: "var(--color-glass-border)" }}>
                      <h3 className={cn(NODE_TEXT.SM, "font-semibold text-foreground mb-4")}>기본 정보</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">파일명</p>
                          <p className="text-sm text-foreground break-all">generated-image.png</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">생성일시</p>
                          <p className="text-sm text-foreground">2025-11-10 14:30</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">해상도</p>
                          <p className="text-sm text-foreground">1024 x 1024</p>
                        </div>
                      </div>
                    </div>

                    {/* 액션 섹션 */}
                    <div className="p-6">
                      <h3 className={cn(NODE_TEXT.SM, "font-semibold text-foreground mb-4")}>액션</h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleDownload}
                          className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#333333] hover:bg-[#333333]/90 text-white border border-[#444444] text-base font-medium transition-all duration-200"
                        >
                          <Download className="w-5 h-5" />
                          이미지 다운로드
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookmarkToggle();
                          }}
                          className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#254B5E] hover:bg-[#254B5E]/90 text-white text-base font-medium transition-all duration-200"
                        >
                          <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                          {isBookmarked ? '북마크 해제' : '북마크에 추가'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSegmentToggle && onSegmentToggle();
                          }}
                          className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#4FA8D8] hover:bg-[#4FA8D8]/90 text-white text-base font-medium transition-all duration-200"
                        >
                          <Scissors className="w-5 h-5" />
                          세그멘테이션
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

NodeFooterComponent.displayName = "NodeFooter";

export const NodeFooter = memo(NodeFooterComponent);
