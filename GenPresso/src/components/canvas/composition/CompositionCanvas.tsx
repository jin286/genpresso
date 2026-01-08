import React, { useRef, useState, memo, useCallback, useMemo } from "react";
import type { CompositionLayer } from "./types";

interface CompositionCanvasProps {
  layers: CompositionLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, updates: Partial<CompositionLayer>) => void;
}

const CompositionCanvasComponent: React.FC<CompositionCanvasProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizingLayerId, setResizingLayerId] = useState<string | null>(null);
  const [resizeStartData, setResizeStartData] = useState<{
    width: number;
    height: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (!layer || layer.isLocked) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - layer.position.x,
      y: e.clientY - layer.position.y,
    });
    onSelectLayer(layerId);
  }, [layers, onSelectLayer]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedLayerId) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    onUpdateLayer(selectedLayerId, {
      position: { x: newX, y: newY },
    });
  }, [isDragging, selectedLayerId, dragStart, onUpdateLayer]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setResizingLayerId(null);
    setResizeStartData(null);
  }, []);

  // 리사이즈 핸들러
  const handleResizeStart = useCallback((e: React.MouseEvent, layerId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const layer = layers.find(l => l.id === layerId);
    if (!layer || layer.isLocked) return;
    
    setResizingLayerId(layerId);
    setResizeStartData({
      width: layer.size.width,
      height: layer.size.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  }, [layers]);

  const handleResizeMove = useCallback((e: React.MouseEvent) => {
    if (!resizingLayerId || !resizeStartData) return;
    
    e.stopPropagation();
    
    const deltaX = e.clientX - resizeStartData.mouseX;
    const deltaY = e.clientY - resizeStartData.mouseY;
    
    let newWidth = resizeStartData.width + deltaX;
    let newHeight = resizeStartData.height + deltaY;
    
    // 최소 크기 제한
    const minSize = 32;
    newWidth = Math.max(minSize, newWidth);
    newHeight = Math.max(minSize, newHeight);
    
    // 캔버스 경계 제한
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const layer = layers.find(l => l.id === resizingLayerId);
      if (layer) {
        const maxWidth = rect.width - layer.position.x;
        const maxHeight = rect.height - layer.position.y;
        
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);
      }
    }
    
    onUpdateLayer(resizingLayerId, {
      size: { width: newWidth, height: newHeight },
    });
  }, [resizingLayerId, resizeStartData, layers, onUpdateLayer]);

  // Sort layers by zIndex
  const sortedLayers = useMemo(() => 
    [...layers].sort((a, b) => a.zIndex - b.zIndex),
    [layers]
  );

  const handleCanvasClick = useCallback(() => {
    onSelectLayer(null);
  }, [onSelectLayer]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    handleMouseMove(e);
    handleResizeMove(e);
  }, [handleMouseMove, handleResizeMove]);

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--color-glass-bg)',
        backgroundImage: `
          linear-gradient(45deg, var(--color-glass-border) 25%, transparent 25%),
          linear-gradient(-45deg, var(--color-glass-border) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, var(--color-glass-border) 75%),
          linear-gradient(-45deg, transparent 75%, var(--color-glass-border) 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      }}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {sortedLayers.map((layer) => {
        if (!layer.isVisible) return null;

        return (
          <div
            key={layer.id}
            className="absolute cursor-move group/layer"
            style={{
              left: layer.position.x,
              top: layer.position.y,
              width: layer.size.width,
              height: layer.size.height,
              transform: `scale(${layer.scale})`,
              opacity: layer.opacity,
              zIndex: layer.zIndex,
              pointerEvents: layer.isLocked ? 'none' : 'auto',
            }}
            onMouseDown={(e) => {
              // 리사이즈 핸들 클릭이 아닐 때만 드래그 시작
              const target = e.target as HTMLElement;
              if (!target.classList.contains('resize-handle')) {
                e.stopPropagation();
                handleMouseDown(e, layer.id);
              }
            }}
          >
            <div
              className="relative border-2 rounded-lg overflow-hidden transition-colors w-full h-full"
              style={{
                borderColor: selectedLayerId === layer.id 
                  ? 'var(--color-primary)' 
                  : 'transparent',
              }}
            >
              <img
                src={layer.thumbnailUrl}
                alt={layer.name}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>
            
            {/* 리사이즈 핸들 (우측 하단 파란 원) */}
            <div
              className="resize-handle absolute -bottom-1 -right-1 w-3 h-3 bg-primary border border-white rounded-full cursor-nwse-resize opacity-0 group-hover/layer:opacity-100 transition-opacity"
              style={{
                opacity: resizingLayerId === layer.id ? 1 : undefined,
              }}
              onMouseDown={(e) => handleResizeStart(e, layer.id)}
            />
          </div>
        );
      })}

      {sortedLayers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            우측에서 이미지를 선택하여 추가하세요
          </p>
        </div>
      )}
    </div>
  );
};

CompositionCanvasComponent.displayName = "CompositionCanvas";

export const CompositionCanvas = memo(CompositionCanvasComponent);
