import React, { memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Tag, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";
import type { NodeGroup } from "./types";

interface GroupQuickSelectProps {
  nodeId: string;
  groups: NodeGroup[];
  onAddToGroup: (groupId: string, nodeIds: string[]) => void;
  onRemoveFromGroup: (groupId: string, nodeIds: string[]) => void;
}

const GROUP_COLORS: Record<string, { color: string; name: string }> = {
  yellow: { color: "#fbbf24", name: "노란색" },
  blue: { color: "#3b82f6", name: "파란색" },
  pink: { color: "#ec4899", name: "분홍색" },
  green: { color: "#10b981", name: "초록색" },
  purple: { color: "#8b5cf6", name: "보라색" },
  orange: { color: "#f97316", name: "주황색" },
  cyan: { color: "#06b6d4", name: "청록색" },
  red: { color: "#ef4444", name: "빨간색" },
};

const GroupQuickSelectComponent: React.FC<GroupQuickSelectProps> = ({
  nodeId,
  groups,
  onAddToGroup,
  onRemoveFromGroup,
}) => {
  // 현재 노드가 속한 그룹들
  const nodeGroups = groups.filter(g => g.nodeIds.includes(nodeId));
  
  const handleToggleGroup = (groupId: string) => {
    const isInGroup = nodeGroups.some(g => g.id === groupId);
    
    if (isInGroup) {
      onRemoveFromGroup(groupId, [nodeId]);
      const group = groups.find(g => g.id === groupId);
      toast.success(`"${group?.name}"에서 제거됨`);
    } else {
      onAddToGroup(groupId, [nodeId]);
      const group = groups.find(g => g.id === groupId);
      toast.success(`"${group?.name}"에 추가됨`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="group flex items-center justify-center w-5 h-5 rounded-full transition-all hover:bg-muted/10 active:scale-95"
          title="그룹 태그"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {nodeGroups.length === 0 ? (
            <div className="w-2 h-2 rounded-full bg-muted-foreground/20 group-hover:bg-muted-foreground/40 transition-colors" />
          ) : nodeGroups.length === 1 ? (
            <div 
              className="w-2 h-2 rounded-full transition-transform group-hover:scale-110" 
              style={{ backgroundColor: GROUP_COLORS[nodeGroups[0].color].color }} 
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center transition-transform group-hover:scale-110">
              <div 
                className="absolute w-2 h-2 rounded-full" 
                style={{ 
                  backgroundColor: GROUP_COLORS[nodeGroups[0].color].color,
                  transform: 'translateX(-2px)' 
                }} 
              />
              <div 
                className="absolute w-2 h-2 rounded-full ring-1 ring-background" 
                style={{ 
                  backgroundColor: GROUP_COLORS[nodeGroups[1].color].color,
                  transform: 'translateX(2px)',
                  zIndex: 1
                }} 
              />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-52 p-1 border-[0.5px]"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
        align="start"
        side="bottom"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="space-y-0.5">
          <h3 className="text-[10px] text-muted-foreground font-medium px-2 py-1.5">그룹 태그</h3>
          
          {groups.length === 0 ? (
            <div className="text-xs text-muted-foreground py-4 text-center">
              생성된 그룹이 없습니다
            </div>
          ) : (
            <div className="space-y-0.5">
              {groups.map((group) => {
                const isInGroup = nodeGroups.some(g => g.id === group.id);
                const colorData = GROUP_COLORS[group.color];
                
                return (
                  <button
                    key={group.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleGroup(group.id);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all relative overflow-hidden group ${
                      isInGroup 
                        ? "bg-background/50" 
                        : "border-transparent hover:bg-secondary/10"
                    }`}
                    style={{
                      borderColor: isInGroup ? colorData.color : 'transparent',
                    }}
                  >
                    {isInGroup && (
                       <div 
                         className="absolute inset-0 opacity-[0.05] pointer-events-none"
                         style={{ backgroundColor: colorData.color }}
                       />
                    )}
                    
                    {/* 색상 인디케이터 */}
                    <div
                      className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: colorData.color }}
                    />
                    
                    {/* 그룹 이름 */}
                    <span className={`flex-1 text-left text-xs truncate ${
                      isInGroup ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {group.name}
                      <span className="text-muted-foreground/60 font-normal ml-1">({group.nodeIds.length})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

GroupQuickSelectComponent.displayName = "GroupQuickSelect";

export const GroupQuickSelect = memo(GroupQuickSelectComponent);