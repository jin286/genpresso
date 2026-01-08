import React, { memo, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Plus, Type, Image as ImageIcon, Video as VideoIcon, Combine, Layers } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Node } from './types';

interface TurnIntoMenuProps {
  node: Node;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTurnIntoText: (node: Node) => void;
  onTurnIntoImage: (node: Node) => void;
  onTurnIntoVideo: (node: Node) => void;
  onMixNodes?: () => void;
}

const TurnIntoMenuComponent = ({
  node,
  isOpen,
  onOpenChange,
  onTurnIntoText,
  onTurnIntoImage,
  onTurnIntoVideo,
  onMixNodes,
}: TurnIntoMenuProps) => {
  const handleTextClick = useCallback(() => {
    onTurnIntoText(node);
    onOpenChange(false);
    toast.success("텍스트 노드 추가됨");
  }, [node, onTurnIntoText, onOpenChange]);

  const handleImageClick = useCallback(() => {
    onTurnIntoImage(node);
    onOpenChange(false);
    toast.success("이미지 생성 노드 추가됨");
  }, [node, onTurnIntoImage, onOpenChange]);

  const handleVideoClick = useCallback(() => {
    onTurnIntoVideo(node);
    onOpenChange(false);
    toast.success("비디오 생성 노드 추가됨");
  }, [node, onTurnIntoVideo, onOpenChange]);

  const handleMixClick = useCallback(() => {
    onOpenChange(false);
    if (onMixNodes) {
      onMixNodes();
    } else {
      toast.error("믹스 기능을 사용할 수 없습니다.");
    }
  }, [onOpenChange, onMixNodes]);

  const handleCompositionClick = useCallback(() => {
    onOpenChange(false);
    toast.error("컴포지션(composition) 노드를 생성하려면 노드를 2개 이상 선택해야합니다.");
  }, [onOpenChange]);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center border-[0.5px] border-solid transition-all duration-200 hover:scale-110"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
          aria-label="Turn into"
          type="button"
        >
          <Plus className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-40 p-2"
        align="start"
        side="right"
        sideOffset={16}
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <div className="flex flex-col gap-1">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleTextClick}
          >
            <Type className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">텍스트</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleImageClick}
          >
            <ImageIcon className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">이미지</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleVideoClick}
          >
            <VideoIcon className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">비디오</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleMixClick}
          >
            <Combine className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">믹스</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleCompositionClick}
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">컴포지션</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

TurnIntoMenuComponent.displayName = "TurnIntoMenu";

export const TurnIntoMenu = memo(TurnIntoMenuComponent);
