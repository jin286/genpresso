import { memo, useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import { Button } from "../ui/button";
import { CloseButton } from "../ui/close-button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { IconSparkles } from "../icons/IconSparkles";
import { X } from "lucide-react";
import { cn } from "./nodes/node-styles";
import type { NodeGroup, Node } from "./types";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";

import { GROUP_COLORS } from "./group-edit/constants";
import { GroupNameField, GroupColorSelector } from "./group-edit/GroupBasicInfo";
import { GroupDescription } from "./group-edit/GroupDescription";
import { GroupImageSelection } from "./group-edit/GroupImageSelection";

interface GroupEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  group: NodeGroup | null;
  nodes: Node[];
  selectedNodeIds: string[];
  onCreateGroup: (name: string, color: NodeGroup['color'], nodeIds: string[]) => void;
  onUpdateGroup: (groupId: string, updates: Partial<NodeGroup>) => void;
  onDeleteGroup: (groupId: string) => void;
  onAddNodesToGroup: (groupId: string, nodeIds: string[]) => void;
  onRemoveNodesFromGroup: (groupId: string, nodeIds: string[]) => void;
  onGenerateSymbol: (groupId: string, imageNodeIds: string[]) => Promise<void>;
}

const GroupEditDialogComponent = ({
  isOpen,
  onClose,
  group,
  nodes,
  selectedNodeIds,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  onRemoveNodesFromGroup,
  onGenerateSymbol,
}: GroupEditDialogProps) => {
  const { t } = useLanguage();
  const isNewGroup = !group;
  
  const [groupName, setGroupName] = useState(group?.name || "");
  const [groupColor, setGroupColor] = useState<NodeGroup['color']>(group?.color || "blue");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>(group?.selectedImageNodeIds || []);

  // 생성 모드를 위한 선택된 노드 정보
  const selectedNodes = nodes.filter(n => selectedNodeIds.includes(n.id));
  const firstImageNode = selectedNodes.find(n => n.type === 'image' && n.imageUrl);

  // 그룹 데이터가 변경되면 상태 업데이트
  useEffect(() => {
    if (group) {
      setGroupName(group.name);
      setGroupColor(group.color);
      setSelectedImageIds(group.selectedImageNodeIds || []);
    } else {
      setGroupName("");
      setGroupColor("blue");
      setSelectedImageIds([]);
    }
  }, [group, isOpen]);

  const handleCreateOrUpdate = useCallback(() => {
    if (!groupName.trim()) {
      toast.error(t('group.nameRequired'));
      return;
    }

    if (isNewGroup) {
      if (selectedNodeIds.length === 0) {
        toast.error(t('group.selectNodes'));
        return;
      }
      onCreateGroup(groupName, groupColor, selectedNodeIds);
      onClose();
    } else if (group) {
      onUpdateGroup(group.id, {
        name: groupName,
        color: groupColor,
        selectedImageNodeIds: selectedImageIds,
        updatedAt: Date.now(),
      });
      toast.success(t('group.updated'));
    }
  }, [isNewGroup, groupName, groupColor, selectedNodeIds, group, onCreateGroup, onUpdateGroup, onClose, t, selectedImageIds]);

  const handleGenerateSymbol = useCallback(async () => {
    if (!group) return;
    
    const imageNodes = nodes.filter(n => 
      group.nodeIds.includes(n.id) && n.type === 'image' && n.imageUrl
    );

    setIsGenerating(true);
    try {
      await onGenerateSymbol(group.id, imageNodes.map(n => n.id));
      toast.success(t('group.symbolGenerated'));
    } catch (error) {
      toast.error(t('group.symbolGenerationFailed'));
    } finally {
      setIsGenerating(false);
    }
  }, [group, nodes, onGenerateSymbol, t]);

  const handleToggleImageSelection = useCallback((nodeId: string) => {
    setSelectedImageIds(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        if (prev.length >= 3) {
          toast.error(t('group.maxImagesReached'));
          return prev;
        }
        return [...prev, nodeId];
      }
    });
  }, [t]);

  const handleSetAsSymbol = useCallback((imageUrl: string) => {
    if (!group) return;
    onUpdateGroup(group.id, {
      symbolImage: imageUrl,
      updatedAt: Date.now(),
    });
    toast.success(t('group.setAsSymbol'));
  }, [group, onUpdateGroup, t]);

  const handleGenerateDescription = useCallback(async () => {
    if (!group) return;
    
    setIsGenerating(true);
    try {
      // AI API 연동 (Echo/Insight/Spark 관련 내용 제거)
      const mockDescription = `이 그룹은 ${group.nodeIds.length}개의 노드로 구성되어 있으며, 선택된 이미지들을 바탕으로 창작 방향을 지향합니다. (${new Date().toLocaleTimeString()})`;
      
      const newHistory = group.description ? [group.description, ...(group.descriptionHistory || [])] : (group.descriptionHistory || []);

      onUpdateGroup(group.id, {
        description: mockDescription,
        descriptionHistory: newHistory,
        updatedAt: Date.now(),
      });
      
      toast.success("그룹 설명이 생성되었습니다");
    } catch (error) {
      toast.error("설명 생성에 실패했습니다");
    } finally {
      setIsGenerating(false);
    }
  }, [group, onUpdateGroup]);

  const handleDelete = useCallback(() => {
    if (!group) return;
    if (confirm(`"${group.name}" 그룹을 삭제하시겠습니까?`)) {
      onDeleteGroup(group.id);
      onClose();
    }
  }, [group, onDeleteGroup, onClose]);

  const groupNodes = group ? nodes.filter(n => group.nodeIds.includes(n.id)) : [];
  const groupColorData = GROUP_COLORS.find(c => c.value === groupColor);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "overflow-hidden border-[0.5px] flex flex-col p-0 gap-0",
          isNewGroup ? "max-w-[calc(100vw-2rem)] sm:max-w-4xl h-[85vh]" : "max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh]"
        )}
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {isNewGroup ? t('group.createTitle') : t('group.editTitle')}
          </DialogTitle>
          <DialogDescription>
            {isNewGroup ? t('group.createDescription') : t('group.editDescription')}
          </DialogDescription>
        </VisuallyHidden>

        {/* 커스텀 헤더 */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b shrink-0" 
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {isNewGroup ? t('group.createTitle') : t('group.editTitle')}
            </h2>
          </div>
        </div>

        <div className={cn("flex-1 overflow-y-auto", !isNewGroup && "p-4")}>
          {isNewGroup ? (
            /* 생성 모드 UI (New Group) */
            <div className="flex flex-row h-full items-center justify-center p-12 gap-16">
              {/* 대표 이미지 미리보기 */}
              <div 
                className="relative w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 flex items-center justify-center bg-black/20 shrink-0" 
                style={{ borderColor: groupColorData?.color || 'var(--color-glass-border)' }}
              >
                {firstImageNode ? (
                  <ImageWithFallback 
                    src={firstImageNode.imageUrl!} 
                    alt="Group Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="text-center p-4 flex flex-col items-center">
                    <IconSparkles className="w-12 h-12 mb-3 opacity-30" color="currentColor" />
                    <p className="text-sm text-muted-foreground font-medium">
                      이미지가 포함된 노드를<br/>선택하면 미리보기가 표시됩니다
                    </p>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                  {selectedNodes.length}개 노드
                </div>
              </div>

              {/* 설정 폼 */}
              <div className="w-full max-w-md space-y-6 bg-white/5 p-8 rounded-2xl border backdrop-blur-sm shadow-lg" style={{ borderColor: 'var(--color-glass-border)' }}>
                <GroupNameField
                  name={groupName}
                  setName={setGroupName}
                />
                <GroupColorSelector
                  color={groupColor}
                  setColor={setGroupColor}
                />
              </div>
            </div>
          ) : (
            /* 편집 모드 UI (Edit Group) */
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Left Column: Basic Info + Symbol Text */}
              <div className="flex flex-col gap-4 h-full min-h-0">
                {/* 1. Basic Info */}
                <div className="rounded-2xl p-4 border-[0.5px] flex flex-col gap-3 flex-1 min-h-0" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--color-glass-border)',
                }}>
                  <GroupNameField
                    name={groupName}
                    setName={setGroupName}
                  />
                </div>

                <div className="rounded-2xl p-4 border-[0.5px] flex flex-col gap-3 flex-1 min-h-0" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--color-glass-border)',
                }}>
                  <GroupColorSelector
                    color={groupColor}
                    setColor={setGroupColor}
                  />
                </div>
              </div>

              {/* Right Column: Image Selection + Included Nodes */}
              <div className="flex flex-col gap-4 h-full">
                {/* 2. Symbol Text */}
                <div className="rounded-2xl p-4 border-[0.5px] flex flex-col gap-3 flex-1 min-h-0" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--color-glass-border)',
                }}>
                   <div className="space-y-1 shrink-0">
                    <h3 className="font-semibold text-base">{t('group.summaryLabel')}</h3>
                    <p className="text-sm text-muted-foreground">{t('group.summaryDescription')}</p>
                  </div>
                  <textarea
                    className="flex-1 w-full resize-none rounded-md border border-input bg-background/50 p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    value={group?.description || ''}
                    onChange={(e) => onUpdateGroup(group!.id, { description: e.target.value, updatedAt: Date.now() })}
                    placeholder={t('group.summaryPlaceholder')}
                  />
                </div>


                {/* 4. Included Nodes (Bottom) */}
                <div className="rounded-2xl p-4 border-[0.5px] flex flex-col gap-3 flex-1 min-h-0" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--color-glass-border)',
                }}>
                   <div className="flex items-start justify-between shrink-0">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-base">{t('group.includedNodesLabel')}</h3>
                        <p className="text-sm text-muted-foreground">{t('group.includedNodesDescription')}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full min-w-[24px] text-center mt-1">
                        {groupNodes.length}
                      </span>
                   </div>
                   <div className="overflow-y-auto flex flex-wrap content-start gap-1.5 pr-1 flex-1 min-h-0">
                      {groupNodes.map(node => (
                         <div key={node.id} className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-md bg-white/5 border border-white/10 shrink-0 transition-colors hover:bg-white/10">
                            {node.imageUrl ? (
                              <img 
                                src={node.imageUrl} 
                                alt="" 
                                className="w-8 h-8 rounded-[4px] object-cover bg-black/20 border border-white/5"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-[4px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70">
                                  <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
                                </svg>
                              </div>
                            )}
                            <span className="text-[10px] text-foreground/90 font-medium">
                               #{node.id.slice(0, 6)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (group) {
                                  const previousNodeIds = [...group.nodeIds];
                                  const nodeIdToRemove = node.id;
                                  const wasSelected = selectedImageIds.includes(node.id);

                                  onRemoveNodesFromGroup(group.id, [nodeIdToRemove]);
                                  
                                  if (wasSelected) {
                                    setSelectedImageIds(prev => prev.filter(id => id !== nodeIdToRemove));
                                  }

                                  toast("노드가 제거되었습니다", {
                                    action: {
                                      label: "되돌리기",
                                      onClick: () => {
                                        onUpdateGroup(group.id, { 
                                          nodeIds: previousNodeIds,
                                          updatedAt: Date.now() 
                                        });
                                        if (wasSelected) {
                                          setSelectedImageIds(prev => [...prev, nodeIdToRemove]);
                                        }
                                      }
                                    },
                                  });
                                }
                              }}
                              className="w-3.5 h-3.5 flex items-center justify-center rounded text-muted-foreground/70 hover:text-foreground hover:bg-white/10 transition-all"
                              title="제거"
                            >
                              <X size={8} />
                            </button>
                         </div>
                      ))}
                      {groupNodes.length === 0 && (
                        <div className="w-full flex items-center justify-center py-8 text-xs text-muted-foreground opacity-50">
                          노드 없음
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 py-4 border-t flex justify-between items-center bg-background/80 backdrop-blur-xl shrink-0" style={{ borderColor: 'var(--color-glass-border)' }}>
          {!isNewGroup && (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="h-10 bg-red-500/10 text-red-200 hover:bg-red-500/20 border border-red-500/20"
            >
              그룹 삭제
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose} className="h-10">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreateOrUpdate} className="h-10">
              {isNewGroup ? t('group.create') : t('common.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const GroupEditDialog = memo(GroupEditDialogComponent);