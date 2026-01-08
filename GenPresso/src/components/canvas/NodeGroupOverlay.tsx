import { memo, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Pencil, Check, X, Settings2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { NodeGroup } from "../canvas/types";
import type { Node } from "../canvas/types";
import { cn } from "./nodes/node-styles";

interface NodeGroupOverlayProps {
  groups: NodeGroup[];
  nodes: Node[];
  zoom: number;
  onGroupClick?: (group: NodeGroup) => void;
  activeGroupColors?: Set<string>; // 활성화된 그룹 색상
  onToggleGroupColor?: (color: string) => void;
  onShowAllGroups?: () => void;
  onDragGroup?: (groupId: string, deltaX: number, deltaY: number) => void;
  onUpdateGroup?: (groupId: string, updates: Partial<NodeGroup>) => void;
}

const GROUP_COLORS = {
  yellow: { stroke: 'rgba(234, 179, 8, 0.6)', fill: 'rgba(234, 179, 8, 0.05)' },
  blue: { stroke: 'rgba(59, 130, 246, 0.6)', fill: 'rgba(59, 130, 246, 0.05)' },
  pink: { stroke: 'rgba(236, 72, 153, 0.6)', fill: 'rgba(236, 72, 153, 0.05)' },
  green: { stroke: 'rgba(34, 197, 94, 0.6)', fill: 'rgba(34, 197, 94, 0.05)' },
  purple: { stroke: 'rgba(168, 85, 247, 0.6)', fill: 'rgba(168, 85, 247, 0.05)' },
  orange: { stroke: 'rgba(249, 115, 22, 0.6)', fill: 'rgba(249, 115, 22, 0.05)' },
  cyan: { stroke: 'rgba(6, 182, 212, 0.6)', fill: 'rgba(6, 182, 212, 0.05)' },
  red: { stroke: 'rgba(239, 68, 68, 0.6)', fill: 'rgba(239, 68, 68, 0.05)' },
} as const;

const UI_TEXT = {
  TITLE: "상징 텍스트",
  SUBTITLE: "그룹을 설명하는 텍스트입니다",
  PLACEHOLDER: "모던하고 따뜻한 분위기의 거실 및 침실 인테리어 디자인 그룹",
  CANCEL: "취소",
  SAVE: "저장",
  SETTINGS: "그룹 설정 및 편집",
  FILTER: "그룹 필터",
  ALL: "All"
};

const STYLES = {
  GLASS_CARD: {
    backgroundColor: 'rgba(30, 30, 35, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  INPUT_BASE: "w-full rounded-xl border border-white/10 p-3 text-sm transition-all duration-200 min-h-[100px] resize-none outline-none text-foreground leading-normal block",
  INPUT_READ: "bg-black/20 cursor-text hover:bg-black/40 hover:border-primary hover:ring-1 hover:ring-primary",
  INPUT_EDIT: "bg-black/40 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50",
  BUTTON_ROW: "flex justify-end gap-2",
  BUTTON_CANCEL: "h-8 text-xs rounded-lg hover:bg-white/10",
  BUTTON_SAVE: "h-8 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90",
  BUTTON_SETTINGS: "w-full h-8 text-xs rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground"
};

/**
 * 그룹에 속한 노드들의 bounds를 계산
 */
function calculateGroupBounds(group: NodeGroup, nodes: Node[]) {
  const groupNodes = nodes.filter(n => group.nodeIds.includes(n.id));
  
  if (groupNodes.length === 0) {
    return null;
  }

  // 노드 크기 (NodeCard)
  const NODE_WIDTH = 188;
  const NODE_HEIGHT = 300; // 대략적인 기본 높이

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  groupNodes.forEach(node => {
    minX = Math.min(minX, node.x);
    minY = Math.min(minY, node.y);
    maxX = Math.max(maxX, node.x + NODE_WIDTH);
    maxY = Math.max(maxY, node.y + NODE_HEIGHT);
  });

  // 그룹 경계에 패딩 추가
  const paddingX = 20; // 좌우 패딩
  const paddingTop = 50; // 위쪽 패딩 (노드 헤더 공간 확보)
  const paddingBottom = 20; // 아래쪽 패딩
  
  return {
    x: minX - paddingX,
    y: minY - paddingTop,
    width: maxX - minX + paddingX * 2,
    height: maxY - minY + paddingTop + paddingBottom,
  };
}

// 개별 그룹 헤더 컴포넌트 (상태 관리 분리)
const GroupHeader = memo(({ 
  group, 
  bounds, 
  colors, 
  isActive, 
  isDragging, 
  onMouseDown, 
  onGroupClick,
  onUpdateGroup 
}: {
  group: NodeGroup;
  bounds: { x: number; y: number };
  colors: { stroke: string; fill: string };
  isActive: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onGroupClick?: (group: NodeGroup) => void;
  onUpdateGroup?: (groupId: string, updates: Partial<NodeGroup>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(group.description || "");
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  // 그룹 설명이 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setDescription(group.description || "");
  }, [group.description]);

  // 마우스 진입 핸들러 (헤더 & 팝업 내용)
  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    if (!isDragging) {
      setIsOpen(true);
    }
  };

  // 마우스 이탈 핸들러
  const handleMouseLeave = () => {
    if (isFixed || isEditing) return;
    
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // 헤더 클릭 핸들러
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    if (isFixed) {
      // 이미 고정된 상태면 고정 해제하고 닫기
      setIsFixed(false);
      setIsOpen(false);
      setIsEditing(false);
      setIsExpanded(false);
    } else {
      // 고정되지 않은 상태면 고정하고 열기 (미니 모드)
      setIsFixed(true);
      setIsOpen(true);
      setIsExpanded(false);
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handleSaveDescription = () => {
    onUpdateGroup?.(group.id, { description });
    setIsEditing(false);
  };

  const handleCancelDescription = () => {
    setDescription(group.description || "");
    setIsEditing(false);
  };

  const handleOpenSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 설정 클릭 시 고정 해제하고 설정 팝업 열기 (부모 동작)
    setIsFixed(false);
    setIsOpen(false);
    onGroupClick?.(group);
  };

  const isHeaderActive = isFixed || isOpen;

  return (
    <div
      className="absolute pointer-events-auto transition-opacity duration-200"
      style={{
        left: `${bounds.x}px`,
        top: `${bounds.y - 40}px`,
        zIndex: isHeaderActive ? 50 : 1,
        opacity: isActive ? 1 : 0.2,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-1.5">
            <div 
              className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border-[0.5px] transition-colors duration-300 cursor-pointer select-none"
              style={{
                backgroundColor: isHeaderActive ? colors.stroke : 'var(--color-glass-bg)',
                backdropFilter: 'blur(var(--blur-glass))',
                WebkitBackdropFilter: 'blur(var(--blur-glass))',
                borderColor: colors.stroke,
                boxShadow: 'var(--glass-shadow)',
                color: isHeaderActive ? '#ffffff' : colors.stroke,
              }}
              onMouseDown={(e) => onMouseDown(e, group.id)}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
            >
              <div className="w-2 h-2 rounded-full shrink-0 bg-current" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {group.name}
              </span>
            </div>

            {isHeaderActive && (
              <div
                className="relative z-50 w-7 h-7 rounded-full border-[0.5px] flex items-center justify-center cursor-pointer shadow-md animate-in fade-in zoom-in-0 slide-in-from-left-4 duration-300 ease-out hover:scale-110 transition-transform"
                style={{
                  backgroundColor: colors.stroke,
                  borderColor: colors.stroke,
                  color: '#ffffff',
                  boxShadow: 'var(--glass-shadow)',
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsFixed(false);
                  setIsOpen(false);
                  setIsExpanded(false);
                  onGroupClick?.(group);
                }}
                title={UI_TEXT.SETTINGS}
              >
                <Settings2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className={cn(
            "p-0 bg-transparent border-none shadow-none transition-all duration-200",
            (isFixed && isExpanded) ? "w-80" : "w-auto max-w-[320px]"
          )}
          side="bottom" 
          align="start"
          sideOffset={8}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onInteractOutside={() => {
            if (isFixed) {
              setIsFixed(false);
              setIsOpen(false);
              setIsEditing(false);
              setIsExpanded(false);
            }
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {isFixed && isExpanded ? (
            <div 
              className="rounded-2xl p-4 border-[0.5px] flex flex-col gap-3"
              style={{
                backgroundColor: 'var(--color-glass-bg)',
                backdropFilter: 'blur(var(--blur-glass))',
                WebkitBackdropFilter: 'blur(var(--blur-glass))',
                boxShadow: 'var(--glass-shadow)',
                borderColor: colors.stroke,
              }}
            >
               <div className="space-y-1 shrink-0 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base text-foreground">그룹 요약문</h3>
                  <p className="text-xs text-muted-foreground">{UI_TEXT.SUBTITLE}</p>
                </div>
                
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/20"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={UI_TEXT.PLACEHOLDER}
                    className={cn(STYLES.INPUT_BASE, STYLES.INPUT_EDIT, "h-[100px] mt-1 border-input")}
                    autoFocus
                  />
                  <div className={STYLES.BUTTON_ROW}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(STYLES.BUTTON_CANCEL, "hover:bg-secondary/20")}
                      onClick={handleCancelDescription}
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      {UI_TEXT.CANCEL}
                    </Button>
                    <Button 
                      size="sm" 
                      className={cn(STYLES.BUTTON_SAVE, "gap-1.5")}
                      onClick={handleSaveDescription}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {UI_TEXT.SAVE}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div 
                    className={cn(
                      "w-full rounded-xl p-3 text-sm min-h-[100px] whitespace-pre-wrap cursor-text overflow-y-auto",
                      "border transition-all duration-200",
                      // 텍스트 노드와 동일한 스타일
                      "border-border bg-transparent text-foreground",
                      // 호버 효과
                      "hover:border-primary/50",
                      "hover:ring-1 hover:ring-primary/20"
                    )}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                  >
                    {description || (
                      <span className="text-muted-foreground/60">
                        {UI_TEXT.PLACEHOLDER}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs rounded-lg border-input bg-secondary/10 hover:bg-secondary/20 hover:text-foreground gap-1.5"
                      onClick={handleOpenSettings}
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      {UI_TEXT.SETTINGS}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="rounded-2xl p-4 border-[0.5px] cursor-pointer transition-all hover:brightness-110"
              style={{
                backgroundColor: 'var(--color-glass-bg)',
                backdropFilter: 'blur(var(--blur-glass))',
                WebkitBackdropFilter: 'blur(var(--blur-glass))',
                boxShadow: 'var(--glass-shadow)',
                borderColor: colors.stroke,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isFixed) {
                  setIsExpanded(true);
                } else {
                  setIsFixed(true);
                  setIsOpen(true);
                }
              }}
            >
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {description || UI_TEXT.PLACEHOLDER}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
});

GroupHeader.displayName = "GroupHeader";

const NodeGroupOverlayComponent = ({ 
  groups, 
  nodes, 
  zoom, 
  onGroupClick,
  activeGroupColors = new Set(),
  onToggleGroupColor,
  onShowAllGroups,
  onDragGroup,
  onUpdateGroup
}: NodeGroupOverlayProps) => {
  const isFilterActive = activeGroupColors.size > 0;
  const [draggingGroupId, setDraggingGroupId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    setDraggingGroupId(groupId);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingGroupId || !dragStart || !onDragGroup) return;

    const deltaX = (e.clientX - dragStart.x) / zoom;
    const deltaY = (e.clientY - dragStart.y) / zoom;

    onDragGroup(draggingGroupId, deltaX, deltaY);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [draggingGroupId, dragStart, zoom, onDragGroup]);

  const handleMouseUp = useCallback(() => {
    setDraggingGroupId(null);
    setDragStart(null);
  }, []);

  // 드래그 이벤트 리스너 등록
  useEffect(() => {
    if (draggingGroupId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingGroupId, handleMouseMove, handleMouseUp]);
  
  // 렌더링에 필요한 그룹 데이터 계산 (메모이제이션)
  const renderedGroups = useMemo(() => {
    return groups.map(group => {
      const bounds = calculateGroupBounds(group, nodes);
      if (!bounds) return null;

      const colors = GROUP_COLORS[group.color];
      const isActive = !isFilterActive || activeGroupColors.has(group.color);

      return {
        group,
        bounds,
        colors,
        isActive
      };
    }).filter(Boolean) as Array<{
      group: NodeGroup;
      bounds: NonNullable<ReturnType<typeof calculateGroupBounds>>;
      colors: typeof GROUP_COLORS[keyof typeof GROUP_COLORS];
      isActive: boolean;
    }>;
  }, [groups, nodes, isFilterActive, activeGroupColors]);

  return (
    <>
      {/* 그룹 필터 토글 버튼 */}
      {groups.length > 0 && (
        <div 
          className="absolute left-24 bottom-4 z-10 flex items-center gap-2 p-2 rounded-2xl border-[0.5px]"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <div className="text-xs font-semibold mr-2">{UI_TEXT.FILTER}</div>
          
          {/* 전체 보기 버튼 */}
          <button
            onClick={onShowAllGroups}
            className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110"
            style={{
              backgroundColor: !isFilterActive ? 'var(--color-primary)' : 'transparent',
              borderColor: !isFilterActive ? 'var(--color-primary)' : 'var(--color-glass-border)',
              color: !isFilterActive ? 'white' : 'var(--foreground)',
            }}
            title="전체 보기"
          >
            <span className="text-xs">{UI_TEXT.ALL}</span>
          </button>

          {/* 색상별 토글 버튼 */}
          {Array.from(new Set(groups.map(g => g.color))).map(color => {
            const colorData = GROUP_COLORS[color];
            const isActive = activeGroupColors.has(color);
            
            return (
              <button
                key={color}
                onClick={() => onToggleGroupColor?.(color)}
                className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: isActive ? colorData.stroke : 'transparent',
                  borderColor: colorData.stroke,
                  opacity: isFilterActive && !isActive ? 0.3 : 1,
                }}
                title={`${color} 그룹`}
              />
            );
          })}
        </div>
      )}

      {/* SVG 영역 (점선 테두리) */}
      <svg
        className="pointer-events-none absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'visible',
        }}
      >
        {renderedGroups.map(({ group, bounds, colors, isActive }) => (
          <g key={group.id} opacity={isActive ? 1 : 0.2}>
            {/* 그룹 영역 배경 */}
            <rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth={1 / zoom}
              rx={16}
              ry={16}
              className="transition-all duration-200"
            />
          </g>
        ))}
      </svg>

      {/* HTML 요소 (그룹 헤더) */}
      {renderedGroups.map(({ group, bounds, colors, isActive }) => (
        <GroupHeader
          key={`header-${group.id}`}
          group={group}
          bounds={bounds}
          colors={colors}
          isActive={isActive}
          isDragging={draggingGroupId === group.id}
          onMouseDown={handleMouseDown}
          onGroupClick={onGroupClick}
          onUpdateGroup={onUpdateGroup}
        />
      ))}
    </>
  );
};

NodeGroupOverlayComponent.displayName = "NodeGroupOverlay";

export const NodeGroupOverlay = memo(NodeGroupOverlayComponent);