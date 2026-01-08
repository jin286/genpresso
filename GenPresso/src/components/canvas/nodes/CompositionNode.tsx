import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { IconSparkles } from "../../icons";
import { GripVertical, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { SegmentListItem } from "./SegmentListItem";
import {
  NODE_PADDING,
  NODE_GAP,
  NODE_RADIUS,
  NODE_TEXT,
  NODE_ICON,
  NODE_BORDER,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import chairImage from "figma:asset/0e85a11fcd2245aba658364054647dbdb6916d1a.png";
import { useLanguage } from "../../../contexts/LanguageContext";

interface SegmentItem {
  id: string;
  name: string;
  nodeName?: string;
  thumbnailUrl?: string;
  visible?: boolean;
  opacity?: number; // 0-1 범위의 투명도 (가중치)
  order?: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  imageOffset?: { x: number; y: number }; // 이미지가 박스 내에서 이동한 오프셋
  imageScale?: number; // 이미지 확대/축소 비율 (1 = 100%)
}

interface CompositionNodeProps {
  segments?: SegmentItem[];
  promptText?: string;
  onPromptChange?: (text: string) => void;
  onGenerate?: () => void;
  onSegmentsChange?: (segments: SegmentItem[]) => void;
}

/**
 * CompositionNode - 컴포지션 노드 컴포넌트
 * 
 * 여러 세그먼트를 조합하여 새로운 이미지를 생성하는 노드
 * 
 * 구조:
 * 1. 상단: 한 줄 텍스트 입력
 * 2. 중앙: 체커보드 배경의 미니 캔버스 (드래그 가능한 세그먼트 배치)
 * 3. 하단: 세그먼트 리스트 (접기/펼치기)
 * 4. 최하단: + 버튼 & 생성하기 버튼
 */
const CompositionNodeComponent = ({
  segments: initialSegments,
  promptText = "",
  onPromptChange,
  onGenerate,
  onSegmentsChange,
}: CompositionNodeProps) => {
  const { t } = useLanguage();
  
  const [segments, setSegments] = useState<SegmentItem[]>(
    initialSegments || [
      {
        id: "seg1",
        name: t('node.segment') + " 1",
        nodeName: "Node A",
        thumbnailUrl: chairImage,
        visible: true,
        opacity: 0.8,
        order: 1,
        position: { x: 20, y: 20 },
        size: { width: 50, height: 50 },
        imageOffset: { x: 0, y: 0 },
        imageScale: 1.5, // 150% 크기 (박스보다 크게)
      },
      {
        id: "seg2",
        name: t('node.segment') + " 2",
        nodeName: "Node B",
        thumbnailUrl: chairImage,
        visible: true,
        opacity: 0.6,
        order: 2,
        position: { x: 80, y: 50 },
        size: { width: 40, height: 40 },
        imageOffset: { x: 0, y: 0 },
        imageScale: 1.2, // 120% 크기
      },
    ]
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const [draggingImageId, setDraggingImageId] = useState<string | null>(null);
  const [resizingSegment, setResizingSegment] = useState<{
    id: string;
    handle: string;
    startX: number;
    startY: number;
    startPos: { x: number; y: number };
    startSize: { width: number; height: number };
  } | null>(null);
  const [imageDragStart, setImageDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [draggingLayerId, setDraggingLayerId] = useState<string | null>(null);
  const [dragOverLayerId, setDragOverLayerId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (onSegmentsChange) {
      onSegmentsChange(segments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  const handleOpacityChange = useCallback((segmentId: string, value: number[]) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === segmentId ? { ...seg, opacity: value[0] / 100 } : seg
      )
    );
  }, []);

  const toggleVisibility = useCallback((segmentId: string) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === segmentId ? { ...seg, visible: !seg.visible } : seg
      )
    );
  }, []);

  const handleAddSegment = useCallback(() => {
    // Placeholder for add segment functionality
  }, []);

  const handleImageDragStart = useCallback((e: React.MouseEvent, segmentId: string) => {
    e.stopPropagation();
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    setDraggingImageId(segmentId);
    setImageDragStart({
      x: e.clientX,
      y: e.clientY,
      offsetX: segment.imageOffset?.x || 0,
      offsetY: segment.imageOffset?.y || 0,
    });
  }, [segments]);

  const handleResizeStart = useCallback((e: React.MouseEvent, segmentId: string, handle: string) => {
    e.stopPropagation();
    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !segment.position || !segment.size) return;

    setResizingSegment({
      id: segmentId,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startPos: { ...segment.position },
      startSize: { ...segment.size },
    });
  }, [segments]);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleSegmentMouseEnter = useCallback((segmentId: string) => {
    setHoveredSegmentId(segmentId);
  }, []);

  const handleSegmentMouseLeave = useCallback(() => {
    setHoveredSegmentId(null);
  }, []);

  // 레이어 순서 드래그 앤 드롭
  const handleLayerDragStart = useCallback((e: React.DragEvent, segmentId: string) => {
    e.stopPropagation();
    setDraggingLayerId(segmentId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleLayerDragOver = useCallback((e: React.DragEvent, segmentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggingLayerId && draggingLayerId !== segmentId) {
      setDragOverLayerId(segmentId);
    }
  }, [draggingLayerId]);

  const handleLayerDragEnd = useCallback((e: React.DragEvent) => {
    e.stopPropagation();
    setDraggingLayerId(null);
    setDragOverLayerId(null);
  }, []);

  const handleLayerDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggingLayerId || draggingLayerId === targetId) {
      setDraggingLayerId(null);
      setDragOverLayerId(null);
      return;
    }

    // 순서 재정렬
    setSegments((prev) => {
      const newSegments = [...prev];
      const dragIndex = newSegments.findIndex(s => s.id === draggingLayerId);
      const targetIndex = newSegments.findIndex(s => s.id === targetId);
      
      if (dragIndex === -1 || targetIndex === -1) return prev;

      // 배열에서 드래그한 아이템 제거
      const [draggedItem] = newSegments.splice(dragIndex, 1);
      // 타겟 위치에 삽입
      newSegments.splice(targetIndex, 0, draggedItem);

      // order 값 재설정
      return newSegments.map((seg, index) => ({
        ...seg,
        order: index + 1,
      }));
    });

    setDraggingLayerId(null);
    setDragOverLayerId(null);
  }, [draggingLayerId]);



  // 마우스 이동
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 이미지 드래그 처리
      if (draggingImageId) {
        const deltaX = e.clientX - imageDragStart.x;
        const deltaY = e.clientY - imageDragStart.y;

        setSegments((prev) =>
          prev.map((seg) =>
            seg.id === draggingImageId
              ? {
                  ...seg,
                  imageOffset: {
                    x: imageDragStart.offsetX + deltaX,
                    y: imageDragStart.offsetY + deltaY,
                  },
                }
              : seg
          )
        );
      }

      // 리사이즈 처리
      if (resizingSegment && canvasRef.current) {
        const deltaX = e.clientX - resizingSegment.startX;
        const deltaY = e.clientY - resizingSegment.startY;
        const { handle, startPos, startSize } = resizingSegment;

        let newX = startPos.x;
        let newY = startPos.y;
        let newWidth = startSize.width;
        let newHeight = startSize.height;

        // 8방향 리사이즈
        if (handle.includes('n')) {
          newY = startPos.y + deltaY;
          newHeight = startSize.height - deltaY;
        }
        if (handle.includes('s')) {
          newHeight = startSize.height + deltaY;
        }
        if (handle.includes('w')) {
          newX = startPos.x + deltaX;
          newWidth = startSize.width - deltaX;
        }
        if (handle.includes('e')) {
          newWidth = startSize.width + deltaX;
        }

        // 최소 크기 제한
        if (newWidth < 20) {
          if (handle.includes('w')) {
            newX = startPos.x + startSize.width - 20;
          }
          newWidth = 20;
        }
        if (newHeight < 20) {
          if (handle.includes('n')) {
            newY = startPos.y + startSize.height - 20;
          }
          newHeight = 20;
        }

        setSegments((prev) =>
          prev.map((seg) =>
            seg.id === resizingSegment.id
              ? {
                  ...seg,
                  position: { x: newX, y: newY },
                  size: { width: newWidth, height: newHeight },
                }
              : seg
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingImageId(null);
      setResizingSegment(null);
    };

    if (draggingImageId || resizingSegment) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingImageId, resizingSegment, imageDragStart, segments]);

  // 가시 세그먼트 필터링 및 정렬 (메모이제이션)
  const visibleSegments = useMemo(() => {
    return segments
      .filter((seg) => seg.visible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [segments]);

  // 체커보드 배경 스타일 (메모이제이션)
  const checkerboardStyle = useMemo(() => ({
    backgroundImage: `
      linear-gradient(45deg, var(--color-glass-border) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-glass-border) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-glass-border) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-glass-border) 75%)
    `,
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    backgroundColor: "var(--color-glass-bg)",
  }), []);

  return (
    <div className={cn(FLEX.COL, "w-full")}>
      {/* 상단: 텍스트 입력 + 미니 캔버스 */}
      <div className={cn(FLEX.COL, NODE_GAP.LG, NODE_PADDING.ALL)}>
        <Textarea
          ref={textareaRef}
          value={promptText}
          onChange={(e) => onPromptChange?.(e.target.value)}
          placeholder={t('node.enterPrompt')}
          className={cn(
            "w-full min-h-[60px] resize-none overflow-y-auto",
            NODE_RADIUS.SM,
            NODE_BORDER.DEFAULT,
            "border-border focus-visible:ring-0 focus-visible:border-primary/50 text-xs p-2"
          )}
        />

        {/* 체커보드 배경 미니 캔버스 */}
        <div
          ref={canvasRef}
          className={cn(
            "relative w-full aspect-square overflow-hidden",
            NODE_RADIUS.SM,
            NODE_BORDER.DEFAULT,
            "bg-muted/5"
          )}
          style={checkerboardStyle}
        >
          {/* 세그먼트 오버레이 (드래그 가능한 미니 캔버스) */}
          {visibleSegments.map((segment) => (
              <div
                key={segment.id}
                className={cn(
                  "absolute group",
                  NODE_RADIUS.SM,
                  "border-[0.5px]",
                  hoveredSegmentId === segment.id && "ring-2 ring-primary"
                )}
                style={{
                  left: `${(segment.position?.x || 0) + (segment.imageOffset?.x || 0)}px`,
                  top: `${(segment.position?.y || 0) + (segment.imageOffset?.y || 0)}px`,
                  width: `${segment.size?.width || 100}px`,
                  height: `${segment.size?.height || 100}px`,
                  opacity: segment.opacity || 1,
                  borderColor: "var(--color-glass-border)",
                  overflow: "visible",
                }}
                onMouseEnter={() => handleSegmentMouseEnter(segment.id)}
                onMouseLeave={handleSegmentMouseLeave}
              >
                {/* 이미지 드래그 영역 - 박스보다 크게 */}
                <div
                  className="absolute top-0 left-0"
                  style={{
                    cursor: draggingImageId === segment.id ? 'grabbing' : 'grab',
                    width: `${(segment.size?.width || 100) * (segment.imageScale || 1)}px`,
                    height: `${(segment.size?.height || 100) * (segment.imageScale || 1)}px`,
                  }}
                  onMouseDown={(e) => handleImageDragStart(e, segment.id)}
                >
                  <ImageWithFallback
                    src={segment.thumbnailUrl || chairImage}
                    alt={segment.name}
                    className={cn("w-full h-full object-cover pointer-events-none", NODE_RADIUS.SM)}
                  />
                </div>
                
                {/* 리사이즈 핸들 (우측 하단 모서리 1개만) */}
                {hoveredSegmentId === segment.id && (
                  <div
                    className="resize-handle absolute w-2 h-2 bg-primary rounded-full cursor-se-resize z-10"
                    style={{
                      bottom: '-4px',
                      right: '-4px',
                    }}
                    onMouseDown={(e) => handleResizeStart(e, segment.id, 'se')}
                  />
                )}
              </div>
            ))}
        </div>
      </div>

      {/* 확장/접기 토글 */}
      <button
        onClick={handleToggleExpand}
        className={cn("w-full", FLEX.CENTER, NODE_PADDING.Y)}
        aria-label={isExpanded ? "접기" : "펼치기"}
      >
        <span
          className={cn(
            NODE_RADIUS.FULL,
            "p-1",
            "hover:bg-primary/20",
            INTERACTIVE_STYLES.TRANSITION
          )}
        >
          {isExpanded ? (
            <ChevronUp className={cn(NODE_ICON.SIZE_LG_CLASS, "text-foreground")} />
          ) : (
            <ChevronDown className={cn(NODE_ICON.SIZE_LG_CLASS, "text-foreground")} />
          )}
        </span>
      </button>

      {/* 세그먼트 리스트 (확장 시 표시) - 2줄 레이아웃 */}
      {isExpanded && (
        <>
          <div className={cn(FLEX.COL, "gap-1", NODE_PADDING.ALL)}>
          {segments.map((segment) => (
            <SegmentListItem
              key={segment.id}
              id={segment.id}
              name={segment.name}
              nodeName={segment.nodeName}
              thumbnailUrl={segment.thumbnailUrl}
              visible={segment.visible ?? true}
              sliderValue={(segment.opacity || 0) * 100}
              sliderLabel={`${Math.round((segment.opacity || 0) * 100)}%`}
              showDragHandle={true}
              className={cn(
                draggingLayerId === segment.id && "opacity-50",
                dragOverLayerId === segment.id && "border-t-2 border-primary"
              )}
              style={{
                backgroundColor: hoveredSegmentId === segment.id
                  ? "var(--color-glass-hover-bg)"
                  : "transparent",
              }}
              onMouseEnter={() => handleSegmentMouseEnter(segment.id)}
              onMouseLeave={handleSegmentMouseLeave}
              onDragStart={(e) => handleLayerDragStart(e, segment.id)}
              onDragOver={(e) => handleLayerDragOver(e, segment.id)}
              onDragEnd={handleLayerDragEnd}
              onDrop={(e) => handleLayerDrop(e, segment.id)}
              onToggleVisibility={toggleVisibility}
              onSliderChange={handleOpacityChange}
            />
          ))}
          </div>
        </>
      )}


    </div>
  );
};

CompositionNodeComponent.displayName = "CompositionNode";

export const CompositionNode = memo(CompositionNodeComponent);
