import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Check, GripVertical, Star, Trash2 } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Input } from "../../ui/input";
import type { Segment } from "./types";

interface SegmentListItemProps {
  segment: Segment;
  index: number;
  isSelected: boolean;
  onSegmentClick: (segmentId: string, e: React.MouseEvent) => void;
  onFavoriteToggle: (segmentId: string, e: React.MouseEvent) => void;
  onDelete: (segmentId: string, e: React.MouseEvent) => void;
  onEditStart: (segmentId: string) => void;
  onNameUpdate?: (segmentId: string, newName: string) => void;
  moveSegment: (dragIndex: number, hoverIndex: number) => void;
}

const SegmentListItemComponent = ({
  segment,
  index,
  isSelected,
  onSegmentClick,
  onFavoriteToggle,
  onDelete,
  onEditStart,
  onNameUpdate,
  moveSegment,
}: SegmentListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(segment.name);

  // 외부에서 이름이 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setEditName(segment.name);
  }, [segment.name]);

  // 편집 모드 진입 시 input에 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "segment",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleHover = useCallback((item: { index: number }, monitor: any) => {
    if (!ref.current) return;

    const dragIndex = item.index;
    const hoverIndex = index;

    if (dragIndex === hoverIndex) return;

    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

    moveSegment(dragIndex, hoverIndex);
    item.index = hoverIndex;
  }, [index, moveSegment]);

  const [, drop] = useDrop({
    accept: "segment",
    hover: handleHover,
  });

  preview(drop(ref));

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onEditStart(segment.id);
  }, [onEditStart, segment.id]);

  const handleNameSubmit = useCallback(() => {
    if (!editName.trim()) {
      setEditName(segment.name); // revert if empty
      setIsEditing(false);
      return;
    }
    
    if (editName !== segment.name && onNameUpdate) {
      onNameUpdate(segment.id, editName);
    }
    setIsEditing(false);
  }, [editName, segment.name, segment.id, onNameUpdate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(segment.name);
      setIsEditing(false);
    }
  }, [handleNameSubmit, segment.name]);

  return (
    <div
      ref={ref}
      className="group flex items-center gap-1 p-1 rounded-2xl cursor-pointer transition-all duration-200 border-2"
      style={{
        backgroundColor: isSelected ? "var(--color-glass-hover-bg)" : "transparent",
        borderColor: isSelected ? "var(--primary)" : "transparent",
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={(e) => !isEditing && onSegmentClick(segment.id, e)}
    >
      {/* 드래그 핸들 */}
      <div
        ref={drag}
        className="shrink-0 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
      >
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* 썸네일 */}
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
        <ImageWithFallback
          src={segment.thumbnailUrl}
          alt={segment.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            className="h-6 text-sm px-1 py-0 bg-background/50 border-primary/50"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div
            className="text-sm font-medium text-foreground break-words"
            onDoubleClick={handleDoubleClick}
          >
            {segment.name}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-0.5 break-all">
          L{segment.layer} · {segment.id}
        </div>
      </div>

      {/* 즐겨찾기 */}
      <button
        onClick={(e) => onFavoriteToggle(segment.id, e)}
        className={`p-1 rounded shrink-0 transition-all duration-200 ${
          segment.isFavorite
            ? "text-yellow-500 opacity-100"
            : "text-muted-foreground hover:text-yellow-500"
        }`}
      >
        <Star className={`w-3.5 h-3.5 ${segment.isFavorite ? "fill-current" : ""}`} />
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={(e) => onDelete(segment.id, e)}
        className="p-1 rounded shrink-0 transition-all duration-200 text-muted-foreground hover:text-red-500"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

SegmentListItemComponent.displayName = 'SegmentListItem';

export const SegmentListItem = React.memo(SegmentListItemComponent);