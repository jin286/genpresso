import React, { useRef, memo, useCallback } from "react";
import { GripVertical, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { CompositionLayer } from "./types";

interface LayerListProps {
  layers: CompositionLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

interface DraggableLayerItemProps {
  layer: CompositionLayer;
  index: number;
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  moveLayer: (fromIndex: number, toIndex: number) => void;
}

const LAYER_ITEM_TYPE = 'LAYER_ITEM';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableLayerItem = memo<DraggableLayerItemProps>(({
  layer,
  index,
  selectedLayerId,
  onSelectLayer,
  onToggleVisibility,
  onToggleLock,
  moveLayer,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: LAYER_ITEM_TYPE,
    item: { index, id: layer.id, type: LAYER_ITEM_TYPE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: LAYER_ITEM_TYPE,
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // 아래로 드래그 시 중간점 넘어야 이동
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 위로 드래그 시 중간점 넘어야 이동
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveLayer(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const handleSelect = useCallback(() => {
    onSelectLayer(layer.id);
  }, [layer.id, onSelectLayer]);

  const handleToggleVisibility = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisibility(layer.id);
  }, [layer.id, onToggleVisibility]);

  const handleToggleLock = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLock(layer.id);
  }, [layer.id, onToggleLock]);

  return (
    <div
      ref={ref}
      onClick={handleSelect}
      className="w-full flex items-center gap-2 p-1.5 rounded-lg transition-all cursor-move"
      style={{
        backgroundColor: selectedLayerId === layer.id 
          ? 'var(--color-glass-hover-bg)' 
          : 'transparent',
        opacity: isDragging ? 0.5 : 1,
        borderWidth: isOver ? '2px' : '0px',
        borderColor: isOver ? 'var(--color-primary)' : 'transparent',
        borderStyle: 'solid',
      }}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab active:cursor-grabbing" />
      
      <div 
        className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border"
        style={{ borderColor: 'var(--color-glass-border)' }}
      >
        <img 
          src={layer.thumbnailUrl} 
          alt={layer.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <span className="flex-1 text-xs text-left text-foreground truncate">
        {layer.name}
      </span>
      
      <button
        onClick={handleToggleVisibility}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary/10 transition-colors"
      >
        {layer.isVisible ? (
          <Eye className="w-4 h-4 text-foreground" />
        ) : (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      <button
        onClick={handleToggleLock}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary/10 transition-colors"
      >
        {layer.isLocked ? (
          <Lock className="w-4 h-4 text-foreground" />
        ) : (
          <Unlock className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
});

DraggableLayerItem.displayName = "DraggableLayerItem";

const LayerListComponent: React.FC<LayerListProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onToggleVisibility,
  onToggleLock,
  onReorder,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="w-[280px] border-r flex flex-col"
        style={{ 
          borderColor: 'var(--color-glass-border)',
          backgroundColor: 'var(--color-glass-bg)',
        }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-glass-border)' }}>
          <h3 className="text-xs text-foreground">레이어</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {layers.map((layer, index) => (
            <DraggableLayerItem
              key={layer.id}
              layer={layer}
              index={index}
              selectedLayerId={selectedLayerId}
              onSelectLayer={onSelectLayer}
              onToggleVisibility={onToggleVisibility}
              onToggleLock={onToggleLock}
              moveLayer={onReorder}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

LayerListComponent.displayName = "LayerList";

export const LayerList = memo(LayerListComponent);
