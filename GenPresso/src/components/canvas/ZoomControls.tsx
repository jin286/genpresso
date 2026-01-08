import { memo, useState, useCallback, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { getGlassmorphismStyle } from "../layout/layout-constants";
import { useLanguage } from "../../contexts/LanguageContext";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

/**
 * ZoomControls - 캔버스 하단 줌 컨트롤
 * 
 * 3개 버튼: -, 100%, +
 * 드래그하여 위치 이동 가능
 * 
 * @param zoom - 현재 줌 레벨 (1 = 100%)
 * @param onZoomIn - 줌 인 (+)
 * @param onZoomOut - 줌 아웃 (-)
 * @param onZoomReset - 줌 리셋 (100%)
 */
function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset }: ZoomControlsProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 드래그 시작
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    // 버튼 클릭은 드래그로 처리하지 않음
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }
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

  const { t } = useLanguage();

  return (
    <div 
      className="fixed left-1/2 bottom-28 z-30"
      style={{
        transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      role="group"
      aria-label={t('canvas.zoom')}
    >
      <div 
        className="flex items-center gap-1 px-2 py-1 rounded-xl border"
        style={getGlassmorphismStyle()}
        onMouseDown={handleDragStart}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-primary/20 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onZoomOut}
          aria-label={t('canvas.zoomOut')}
          tabIndex={0}
        >
          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
        </Button>
        <button
          className="px-3 py-1 text-sm hover:bg-secondary/10 rounded transition-colors min-w-[60px] text-center focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onZoomReset}
          aria-label={t('canvas.zoomReset')}
          tabIndex={0}
        >
          {Math.round(zoom * 100)}%
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-primary/20 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onZoomIn}
          aria-label={t('canvas.zoomIn')}
          tabIndex={0}
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

ZoomControls.displayName = "ZoomControls";

export default memo(ZoomControls);