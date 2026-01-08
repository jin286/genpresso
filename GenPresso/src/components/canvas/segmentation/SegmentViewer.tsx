import React, { useState, useCallback, useRef } from "react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import type { SegmentationData } from "./types";
import { useLanguage } from "../../../contexts/LanguageContext";

// 세그먼트별 색상 (첨부 이미지처럼 다양한 색상)
const SEGMENT_COLORS = [
  "#ef4444", // 빨강 (상들리에)
  "#3b82f6", // 파랑 (소파)
  "#f97316", // 주황 (의자)
  "#8b5cf6", // 보라
  "#10b981", // 초록
  "#f59e0b", // 노랑
  "#ec4899", // 핑크
  "#06b6d4", // 청록
];

interface SegmentViewerProps {
  segmentationData: SegmentationData;
  selectedSegmentIds: string[];
  hoveredSegmentId: string | null;
  onSegmentClick: (segmentId: string, e: React.MouseEvent) => void;
  onSegmentHover: (segmentId: string | null) => void;
  activeTool?: 'segment' | 'crop';
  selectionBounds?: { x: number; y: number; width: number; height: number } | null;
  onSelectionChange?: (bounds: { x: number; y: number; width: number; height: number } | null) => void;
}

interface ContextMenuState {
  segmentId: string;
  x: number;
  y: number;
}

const SegmentViewerComponent = ({
  segmentationData,
  selectedSegmentIds,
  hoveredSegmentId,
  onSegmentClick,
  onSegmentHover,
  activeTool = 'segment',
  selectionBounds,
  onSelectionChange,
}: SegmentViewerProps) => {
  const { t } = useLanguage();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRightClick = useCallback((e: React.MouseEvent, segmentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({
      segmentId,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleExtractSegment = useCallback(() => {
    if (!contextMenu) return;
    
    const segment = segmentationData.segments.find(s => s.id === contextMenu.segmentId);
    
    import('sonner@2.0.3').then(({ toast }) => {
      toast.success(t('segment.extracted', { name: segment?.name }));
    });
    
    setContextMenu(null);
  }, [contextMenu, segmentationData.segments]);

  // 외부 클릭 시 컨텍스트 메뉴 닫기
  React.useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((activeTool !== 'segment' && activeTool !== 'crop') || !containerRef.current) return;
    
    // 기존 세그먼트 위에서 클릭한 경우 드래그 시작하지 않음 (이미지 영역에서만 시작)
    // 하지만 이미지는 div 전체를 덮고 있으므로 target 체크가 필요할 수 있음
    // 여기서는 간단히 구현: 상위 div에 이벤트 걸려있으므로 항상 시작 가능
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
    onSelectionChange?.(null); // 이전 선택 초기화
  }, [activeTool, onSelectionChange]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !startPoint || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = Math.abs(currentX - startPoint.x);
    const height = Math.abs(currentY - startPoint.y);
    const x = Math.min(currentX, startPoint.x);
    const y = Math.min(currentY, startPoint.y);

    onSelectionChange?.({ x, y, width, height });
  }, [isDrawing, startPoint, onSelectionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    setStartPoint(null);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="relative w-full h-full select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ImageWithFallback
          src={segmentationData.sourceImageUrl}
          alt="Source"
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* 드래그 중인 선택 영역 표시 (파란색 점선) */}
        {selectionBounds && (
          <div
            className="absolute border-2 border-[#4FA8D8] bg-[#4FA8D8]/20 z-50 pointer-events-none"
            style={{
              left: selectionBounds.x,
              top: selectionBounds.y,
              width: selectionBounds.width,
              height: selectionBounds.height,
              borderStyle: 'dashed',
            }}
          />
        )}

        {/* SVG 오버레이 - 선택 영역 및 테두리 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {segmentationData.segments.map((segment, index) => {
            const isSelected = selectedSegmentIds.includes(segment.id);
            const isHovered = hoveredSegmentId === segment.id;
            const segmentColor = SEGMENT_COLORS[index % SEGMENT_COLORS.length];

            return (
              <g key={segment.id}>
                {/* 클릭 영역 */}
                <rect
                  x={segment.bounds.x}
                  y={segment.bounds.y}
                  width={segment.bounds.width}
                  height={segment.bounds.height}
                  fill={isHovered ? `${segmentColor}30` : "transparent"}
                  className="pointer-events-auto cursor-pointer transition-all duration-200"
                  onMouseEnter={() => onSegmentHover(segment.id)}
                  onMouseLeave={() => onSegmentHover(null)}
                  onClick={(e) => {
                    e.stopPropagation(); // 드래그 시작 방지 및 선택 전파
                    onSegmentClick(segment.id, e as any);
                  }}
                  onContextMenu={(e) => handleRightClick(e as any, segment.id)}
                />

                {/* 기본 테두리 (약한 효과) - 항상 표시 */}
                <rect
                  x={segment.bounds.x}
                  y={segment.bounds.y}
                  width={segment.bounds.width}
                  height={segment.bounds.height}
                  fill="none"
                  stroke={segmentColor}
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="pointer-events-none"
                />

                {/* 호버 테두리 (강한 효과) */}
                {isHovered && (
                  <>
                    <rect
                      x={segment.bounds.x}
                      y={segment.bounds.y}
                      width={segment.bounds.width}
                      height={segment.bounds.height}
                      fill="none"
                      stroke={segmentColor}
                      strokeWidth="3"
                      opacity="1"
                      className="pointer-events-none"
                    />
                  </>
                )}

                {/* 선택 테두리 */}
                {isSelected && (
                  <rect
                    x={segment.bounds.x}
                    y={segment.bounds.y}
                    width={segment.bounds.width}
                    height={segment.bounds.height}
                    fill="none"
                    stroke={segmentColor}
                    strokeWidth="3"
                    opacity="1"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* SVG 라벨 레이어 - 호버 시에도 표시 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {segmentationData.segments.map((segment, index) => {
            const isSelected = selectedSegmentIds.includes(segment.id);
            const isHovered = hoveredSegmentId === segment.id;
            const segmentColor = SEGMENT_COLORS[index % SEGMENT_COLORS.length];
            
            // 선택되었거나 호버된 경우 라벨 표시
            if (!isSelected && !isHovered) return null;

            const labelWidth = segment.name.length * 8 + 16;
            const labelColor = segmentColor;

            return (
              <g key={`label-${segment.id}`}>
                {/* 라벨 배경 */}
                <rect
                  x={segment.bounds.x - 1}
                  y={segment.bounds.y - 22}
                  width={labelWidth}
                  height="24"
                  fill={labelColor}
                  className="pointer-events-none"
                />
                {/* 라벨 텍스트 */}
                <text
                  x={segment.bounds.x - 1 + labelWidth / 2}
                  y={segment.bounds.y - 4}
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="600"
                  fontFamily="Pretendard, sans-serif"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {segment.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 컨텍스트 메뉴 */}
        {contextMenu && (
          <div
            className="fixed z-[100] rounded-2xl border-[0.5px] p-1 min-w-[160px] shadow-lg"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              backgroundColor: 'var(--color-glass-bg)',
              backdropFilter: 'blur(var(--blur-glass))',
              WebkitBackdropFilter: 'blur(var(--blur-glass))',
              borderColor: 'var(--color-glass-border)',
              boxShadow: 'var(--glass-shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full px-3 py-2 text-sm text-left rounded-lg transition-colors duration-200 hover:bg-secondary/10 text-foreground"
              onClick={handleExtractSegment}
            >
              내보내기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

SegmentViewerComponent.displayName = 'SegmentViewer';

export const SegmentViewer = React.memo(SegmentViewerComponent);
