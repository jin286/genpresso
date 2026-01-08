import React, { useState, useRef, useCallback } from "react";
import { ArrowLeft, Layers, Copy, Trash2, Grid3x3, RotateCw } from "lucide-react";
import { CloseButton } from "../../ui/close-button";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { SegmentButton } from "../../ui/segment-button";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import type { SegmentationData, PreviewItem } from "./types";
import { snapToGrid } from "./utils";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../../contexts/LanguageContext";

interface PreviewCanvasProps {
  segmentationData: SegmentationData;
  previewItems: PreviewItem[];
  canvasMode: 'normal' | 'segment' | 'mix';
  attachMode: 'attach' | 'replace';
  onCanvasModeChange: (mode: 'normal' | 'segment' | 'mix') => void;
  onAttachModeChange: (mode: 'attach' | 'replace') => void;
  onPreviewItemUpdate: (itemId: string, updates: Partial<PreviewItem>) => void;
  onPreviewItemAdd: (item: PreviewItem) => void;
  onPreviewItemDelete: (itemId: string) => void;
  onBackToViewer: () => void;
  onCreateMixNode: () => void;
  onClose: () => void;
}

/**
 * Preview Canvas (임시작업대)
 * 
 * 목표: "붙이기/교체, XY 이동, 스냅"의 핵심 UX 증명
 * 
 * - 캔버스: 프리뷰 레이어 (드래그 가능), 바닥 그리드
 * - 좌하단: 일반/세그먼트/믹스 모드 토글
 * - 레이어 패널: ON/OFF, Opacity
 * - Attach/Replace 모드
 * - 스냅 핸들: 앵커 포인트 (모서리/중심)
 * 
 * 인터랙션:
 * - Attach: 기존 위에 얹어 합성, Opacity/Blend 지원
 * - Replace: 같은 카테고리 파트면 교체
 * - 스냅: 앵커 포인트 기준 8방향 스냅
 */
const PreviewCanvasComponent = ({
  segmentationData,
  previewItems,
  canvasMode,
  attachMode,
  onCanvasModeChange,
  onAttachModeChange,
  onPreviewItemUpdate,
  onPreviewItemAdd,
  onPreviewItemDelete,
  onBackToViewer,
  onCreateMixNode,
  onClose,
}: PreviewCanvasProps) => {
  const { t } = useLanguage();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [enableSnap, setEnableSnap] = useState(true);
  const [snapPosition, setSnapPosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedItem = previewItems.find(item => item.id === selectedItemId);

  // 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent, item: PreviewItem) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggingItemId(item.id);
    setSelectedItemId(item.id);
    setDragOffset({
      x: e.clientX - rect.left - item.position.x,
      y: e.clientY - rect.top - item.position.y,
    });
  }, []);

  // 드래그 중
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingItemId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    let newX = e.clientX - rect.left - dragOffset.x;
    let newY = e.clientY - rect.top - dragOffset.y;

    // 스냅 활성화 시 10px 그리드에 맞춤
    if (enableSnap) {
      const snapped = snapToGrid(newX, newY, 10);
      newX = snapped.x;
      newY = snapped.y;
      setSnapPosition(snapped);
    } else {
      setSnapPosition(null);
    }

    onPreviewItemUpdate(draggingItemId, {
      position: { x: newX, y: newY },
    });
  }, [draggingItemId, dragOffset, enableSnap, onPreviewItemUpdate]);

  // 드래그 끝
  const handleMouseUp = useCallback(() => {
    if (draggingItemId) {
      setDraggingItemId(null);
      setSnapPosition(null);
      
      // 스냅 완료 토스트
      if (enableSnap) {
        toast.success(t('segment.snappedToGrid'), { duration: 1500 });
      }
    }
  }, [draggingItemId, enableSnap]);

  // 복제
  const handleDuplicate = useCallback((item?: PreviewItem) => {
    const targetItem = item || selectedItem;
    if (!targetItem) return;

    const newItem: PreviewItem = {
      ...targetItem,
      id: `preview-${Date.now()}-${targetItem.segmentId}`,
      position: {
        x: targetItem.position.x + 20,
        y: targetItem.position.y + 20,
      },
      zIndex: previewItems.length + 1,
    };

    onPreviewItemAdd(newItem);
    setSelectedItemId(newItem.id);
    toast.success(t('segment.segmentDuplicated'));
  }, [selectedItem, previewItems.length, onPreviewItemAdd, t]);

  // 삭제
  const handleDelete = useCallback((item?: PreviewItem) => {
    const targetItem = item || selectedItem;
    if (!targetItem) return;
    onPreviewItemDelete(targetItem.id);
    if (selectedItemId === targetItem.id) {
      setSelectedItemId(null);
    }
    toast.success(t('segment.segmentDeleted'));
  }, [selectedItem, selectedItemId, onPreviewItemDelete, t]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-glass-border)]">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBackToViewer}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            뷰어로 돌아가기
          </Button>

          <div className="h-4 w-px bg-border" />

          <div>
            <h2 className="font-semibold text-foreground">Preview Canvas</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              임시작업대 · {previewItems.length}개 레이어
            </p>
          </div>
        </div>

        {/* X 닫기 버튼 */}
        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 캔버스 */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={canvasRef}
            className="absolute inset-0"
            style={{
              backgroundColor: 'var(--muted)',
              backgroundImage: showGrid
                ? `
                  linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                `
                : undefined,
              backgroundSize: showGrid ? '10px 10px' : undefined,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Preview Items */}
            {previewItems.map((item) => {
              const segment = segmentationData.segments.find(s => s.id === item.segmentId);
              if (!segment) return null;

              const isSelected = selectedItemId === item.id;
              const isDragging = draggingItemId === item.id;
              const isHovered = hoveredItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`
                    absolute cursor-move transition-all group
                    ${isSelected ? 'ring-2 ring-primary' : ''}
                    ${isDragging ? 'shadow-xl scale-105' : ''}
                  `}
                  style={{
                    left: item.position.x,
                    top: item.position.y,
                    width: segment.bounds.width,
                    height: segment.bounds.height,
                    opacity: item.opacity,
                    transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
                    zIndex: item.zIndex,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, item)}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  <ImageWithFallback
                    src={segment.thumbnailUrl}
                    alt={segment.name}
                    className="w-full h-full object-contain pointer-events-none"
                  />

                  {/* 모드 배지 */}
                  {isSelected && (
                    <div
                      className="absolute -top-6 left-0 px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: item.mode === 'attach' ? 'rgba(79, 168, 216, 0.9)' : 'rgba(234, 88, 12, 0.9)',
                        color: 'white',
                      }}
                    >
                      {item.mode === 'attach' ? 'Attach' : 'Replace'}
                    </div>
                  )}

                  {/* Floating 버튼 (호버 시 표시) */}
                  {(isSelected || isHovered) && !isDragging && (
                    <div className="absolute -top-9 right-0 flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-7 h-7 p-0 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(item);
                        }}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-7 h-7 p-0 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 스냅 가이드 (드래그 중에만 표시) */}
            {enableSnap && draggingItemId && snapPosition && (
              <>
                <div
                  className="absolute h-full w-px bg-primary/60 pointer-events-none"
                  style={{ left: snapPosition.x }}
                />
                <div
                  className="absolute w-full h-px bg-primary/60 pointer-events-none"
                  style={{ top: snapPosition.y }}
                />
              </>
            )}
          </div>

          {/* 좌하단: 모드 토글 */}
          <div className="absolute left-4 bottom-4 flex items-center gap-2">
            <Button
              size="sm"
              variant={canvasMode === 'normal' ? 'default' : 'outline'}
              onClick={() => onCanvasModeChange('normal')}
              className="h-8 text-xs"
            >
              일반
            </Button>
            <Button
              size="sm"
              variant={canvasMode === 'mix' ? 'default' : 'outline'}
              onClick={() => onCanvasModeChange('mix')}
              className="h-8 text-xs gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              믹스
            </Button>
          </div>

          {/* 우하단: 그리드/스냅 토글 */}
          <div className="absolute right-4 bottom-4 flex gap-2">
            <Button
              size="sm"
              variant={showGrid ? 'default' : 'outline'}
              onClick={() => setShowGrid(!showGrid)}
              className="h-8 text-xs gap-1.5"
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              {showGrid ? '그리드 ON' : '그리드 OFF'}
            </Button>
            <Button
              size="sm"
              variant={enableSnap ? 'default' : 'outline'}
              onClick={() => {
                setEnableSnap(!enableSnap);
                toast.info(enableSnap ? t('segment.snapDisabled') : t('segment.snapEnabled'), { duration: 1500 });
              }}
              className="h-8 text-xs gap-1.5"
            >
              스냅 {enableSnap ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        {/* 우측 패널: 레이어 & 속성 */}
        <div
          className="w-80 border-l flex flex-col"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          {/* 모드 선택 */}
          <div className="px-3 py-2.5 border-b space-y-2" style={{ borderColor: 'var(--color-glass-border)' }}>
            <Label className="text-xs font-semibold text-foreground">작업 모드</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={attachMode === 'attach' ? 'default' : 'outline'}
                onClick={() => onAttachModeChange('attach')}
                className="flex-1 h-8 text-xs"
              >
                Attach (붙이기)
              </Button>
              <Button
                size="sm"
                variant={attachMode === 'replace' ? 'default' : 'outline'}
                onClick={() => onAttachModeChange('replace')}
                className="flex-1 h-8 text-xs"
              >
                Replace (교체)
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {attachMode === 'attach'
                ? '✨ 기존 위에 얹어 합성, Opacity/Blend 지원'
                : '🔄 같은 카테고리면 교체, 이전은 히스토리 보관'}
            </p>
          </div>

          {/* 선택된 아이템 속성 */}
          {selectedItem && (
            <div className="px-3 py-3 border-b space-y-3" style={{ borderColor: 'var(--color-glass-border)' }}>
              <div>
                <Label className="text-xs font-semibold text-foreground">Opacity</Label>
                <Slider
                  value={[selectedItem.opacity * 100]}
                  onValueChange={([value]) => onPreviewItemUpdate(selectedItem.id, { opacity: value / 100 })}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{Math.round(selectedItem.opacity * 100)}%</p>
              </div>

              <div>
                <Label className="text-xs font-semibold text-foreground">Scale</Label>
                <Slider
                  value={[selectedItem.scale * 100]}
                  onValueChange={([value]) => onPreviewItemUpdate(selectedItem.id, { scale: value / 100 })}
                  min={10}
                  max={200}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{Math.round(selectedItem.scale * 100)}%</p>
              </div>

              <div>
                <Label className="text-xs font-semibold text-foreground">Rotation</Label>
                <Slider
                  value={[selectedItem.rotation]}
                  onValueChange={([value]) => onPreviewItemUpdate(selectedItem.id, { rotation: value })}
                  min={0}
                  max={360}
                  step={15}
                  className="mt-2"
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{selectedItem.rotation}°</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onPreviewItemUpdate(selectedItem.id, { rotation: 0 })}
                    className="h-6 px-2 text-xs"
                  >
                    <RotateCw className="w-3 h-3" />
                    초기화
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDuplicate()}
                  className="flex-1 h-8 text-xs gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  복제
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete()}
                  className="flex-1 h-8 text-xs gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  삭제
                </Button>
              </div>
            </div>
          )}

          {/* 레이어 리스트 */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">레이어 ({previewItems.length})</Label>
            {previewItems.map((item) => {
              const segment = segmentationData.segments.find(s => s.id === item.segmentId);
              if (!segment) return null;

              return (
                <div
                  key={item.id}
                  className={`
                    p-2 rounded-lg cursor-pointer transition-all
                    ${selectedItemId === item.id ? 'ring-2 ring-primary bg-primary/10' : 'hover:bg-secondary/10'}
                  `}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded bg-muted shrink-0">
                      <ImageWithFallback
                        src={segment.thumbnailUrl}
                        alt={segment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{segment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Z: {item.zIndex} · {Math.round(item.opacity * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 액션 */}
          <div className="p-3 border-t space-y-2" style={{ borderColor: 'var(--color-glass-border)' }}>
            <Button
              onClick={onCreateMixNode}
              variant="default"
              className="w-full h-9 text-xs gap-2"
              disabled={previewItems.length === 0}
            >
              <Layers className="w-4 h-4" />
              Mix Node 생성 ({previewItems.length}개)
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {previewItems.length === 0 
                ? '⚠️ 레이어를 추가해주세요'
                : '✨ 모든 레이어를 하나의 Mix Node로 합성합니다'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PreviewCanvasComponent.displayName = 'PreviewCanvas';

export const PreviewCanvas = React.memo(PreviewCanvasComponent);
