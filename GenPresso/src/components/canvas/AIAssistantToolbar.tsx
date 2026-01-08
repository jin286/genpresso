import React, { memo, useCallback } from "react";
import { 
  MessageSquare, 
  Combine,
  Layers,
  Image as ImageIcon, 
  Video,
  Group
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";

interface AIAssistantToolbarProps {
  isVisible: boolean;
  selectedNodeCount: number;
  onMixNodes?: () => void;
  onCompositionNodes?: () => void;
  onGroupNodes?: () => void;
}

// Tools 배열은 컴포넌트 내부로 이동하여 t() 함수 사용

/**
 * AIAssistantToolbar - AI 질문하기 툴바
 * 
 * 여러 노드 선택 시 상단 도구바 아래에 나타나는 글라스모피즘 툴바
 * AI 도구들을 빠르게 사용할 수 있는 인터페이스
 * 
 * 디자인:
 * - 글라스모피즘 배경
 * - 아이콘 + 텍스트 가로 배치
 * - TopToolbar와 동일한 크기 (아이콘 20px, 텍스트 12px)
 * - 부드러운 애니메이션
 */
const AIAssistantToolbarComponent = ({ isVisible, selectedNodeCount, onMixNodes, onCompositionNodes, onGroupNodes }: AIAssistantToolbarProps) => {
  const { t } = useLanguage();
  
  const handleToolClick = useCallback((toolId: string, toolLabel: string) => {
    if (toolId === 'mix') {
      onMixNodes?.();
    } else if (toolId === 'composition') {
      onCompositionNodes?.();
    } else if (toolId === 'group') {
      onGroupNodes?.();
    } else {
      toast.success(`${toolLabel} - ${t('canvas.nodesSelected', { count: selectedNodeCount })}`);
    }
  }, [selectedNodeCount, onMixNodes, onCompositionNodes, onGroupNodes, t]);

  const tools = [
    { id: 'agent', label: t('canvas.aiQuestion'), icon: MessageSquare },
    { id: 'divider1', label: '', icon: null }, // 구분선
    { id: 'mix', label: t('canvas.aiTools.mix'), icon: Combine },
    { id: 'composition', label: t('canvas.aiTools.composition'), icon: Layers },
    { id: 'image', label: t('canvas.aiTools.imageConvert'), icon: ImageIcon },
    { id: 'video', label: t('canvas.aiTools.videoGenerate'), icon: Video },
    { id: 'divider2', label: '', icon: null }, // 구분선
    { id: 'group', label: t('canvas.aiTools.group'), icon: Group },
  ];

  if (!isVisible || selectedNodeCount === 0) return null;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out"
      style={{
        top: isVisible ? '110px' : '-100px',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="flex items-center gap-1.5 px-1.5 py-1.5 rounded-xl border-[0.5px] border-solid"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        {tools.map((tool) => {
          // 구분선 렌더링
          if (tool.id.startsWith('divider')) {
            return (
              <div 
                key={tool.id} 
                className="w-px h-6 mx-1" 
                style={{ backgroundColor: 'var(--color-glass-border)' }}
              />
            );
          }

          const Icon = tool.icon;
          if (!Icon) return null;

          return (
            <button
              key={tool.id}
              className="flex items-center gap-1.5 h-8 px-1.5 py-1 rounded-lg transition-all duration-200 group"
              style={{
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => handleToolClick(tool.id, tool.label)}
              aria-label={tool.label}
              title={tool.label}
            >
              <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 노드 카운트 표시 */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="px-2 py-1 bg-primary/10 rounded-lg">
          <span className="text-xs text-primary">{t('canvas.nodesSelected', { count: selectedNodeCount })}</span>
        </div>
      </div>
    </div>
  );
};

AIAssistantToolbarComponent.displayName = "AIAssistantToolbar";

export const AIAssistantToolbar = memo(AIAssistantToolbarComponent);