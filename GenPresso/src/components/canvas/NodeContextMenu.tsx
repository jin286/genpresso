import React, { memo, useCallback } from "react";
import { FileText, Image, Video, Upload, Combine, Group } from "lucide-react";
import type { NodeType } from "./NodeCard";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";

interface NodeContextMenuProps {
  x: number;
  y: number;
  selectedNodeCount?: number;
  onSelectType: (type: NodeType) => void;
  onClose: () => void;
  onMixNodes?: () => void;
}

/**
 * NodeContextMenu - 노드 생성 우클릭 메뉴
 * 
 * 캔버스에서 우클릭 시 나타나는 노드 타입 선택 메뉴
 * 
 * 디자인:
 * - 글래스모피즘 배경
 * - 16px border-radius
 * - 호버 효과
 */
const NodeContextMenuComponent = ({
  x,
  y,
  selectedNodeCount = 0,
  onSelectType,
  onClose,
  onMixNodes,
}: NodeContextMenuProps) => {
  const { t } = useLanguage();
  
  const nodeTypes = [
    { type: 'text' as const, icon: FileText, label: t('canvas.nodeTypes.text') },
    { type: 'image' as const, icon: Image, label: t('canvas.nodeTypes.image') },
    { type: 'video' as const, icon: Video, label: t('canvas.nodeTypes.video') },
    { type: 'upload' as const, icon: Upload, label: t('canvas.nodeTypes.upload') },
  ];

  const aiTools = [
    { id: 'mix', icon: Combine, label: t('canvas.aiTools.mix') },
    { id: 'image-convert', icon: Image, label: t('canvas.aiTools.imageConvert') },
    { id: 'video-generate', icon: Video, label: t('canvas.contextMenu.videoGenerate') },
    { id: 'group', icon: Group, label: t('canvas.contextMenu.group') },
  ];
  
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const handleAIToolClick = useCallback((toolId: string, toolLabel: string) => {
    if (toolId === 'mix') {
      onMixNodes?.();
    } else {
      toast.success(`${toolLabel} - ${t('canvas.nodesSelected', { count: selectedNodeCount })}`);
    }
    onClose();
  }, [selectedNodeCount, onMixNodes, onClose, t]);

  return (
    <div
      className="fixed z-50 py-2 rounded-2xl border-[0.5px] border-solid min-w-[180px]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* AI 도구 섹션 - 노드 2개 이상 선택 시만 표시 */}
      {selectedNodeCount >= 2 && (
        <>
          <div className="px-2 pb-2 mb-2 border-b border-border">
            <p className="text-xs px-2">{t('canvas.tools.aiTools')}</p>
          </div>
          <div className="space-y-1 px-2 mb-2">
            {aiTools.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
                onClick={() => handleAIToolClick(id, label)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
          <div className="h-px mx-2 mb-2" style={{ backgroundColor: 'var(--color-glass-border)' }} />
        </>
      )}

      {/* 노드 추가 섹션 */}
      <div className="px-2 pb-2 mb-2 border-b border-border">
        <p className="text-xs px-2">{t('canvas.emptyAction')}</p>
      </div>
      <div className="space-y-1 px-2">
        {nodeTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/10 transition-colors text-left"
            onClick={() => {
              onSelectType(type);
              onClose();
            }}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

NodeContextMenuComponent.displayName = "NodeContextMenu";

export const NodeContextMenu = memo(NodeContextMenuComponent);