import React, { useState, useCallback } from "react";
import { X, Layers, Download } from "lucide-react";
import { LayerList } from "./LayerList";
import { ComposableGallery } from "./ComposableGallery";
import { CompositionCanvas } from "./CompositionCanvas";
import { WeightSliders } from "./WeightSliders";
import { Button } from "../../ui/button";
import { CloseButton } from "../../ui/close-button";
import type { CompositionLayer, ComposableImage, CompositionWeights } from "./types";
import { toast } from "sonner@2.0.3";

interface CompositionNodePanelProps {
  onClose: () => void;
  onExportToCanvas?: (layers: CompositionLayer[], weights: CompositionWeights) => void;
}

// Mock data
const MOCK_COMPOSABLE_IMAGES: ComposableImage[] = [
  {
    id: "comp-1",
    name: "인테리어 디자인",
    thumbnailUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "인테리어",
  },
  {
    id: "comp-2",
    name: "추상 아트",
    thumbnailUrl: "https://images.unsplash.com/photo-1748722445952-94c06a6d995a?w=400",
    category: "아트",
  },
  {
    id: "comp-3",
    name: "산 풍경",
    thumbnailUrl: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400",
    category: "자연",
  },
  {
    id: "comp-4",
    name: "도시 건축",
    thumbnailUrl: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=400",
    category: "건축",
  },
  {
    id: "comp-5",
    name: "숲 자연",
    thumbnailUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
    category: "자연",
  },
  {
    id: "comp-6",
    name: "미니멀 디자인",
    thumbnailUrl: "https://images.unsplash.com/photo-1528262004378-a108d795029c?w=400",
    category: "디자인",
  },
];

const CompositionNodePanelComponent = ({ onClose, onExportToCanvas }: CompositionNodePanelProps) => {
  const [layers, setLayers] = useState<CompositionLayer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [weights, setWeights] = useState<CompositionWeights>({
    style: 50,
    structure: 50,
    color: 50,
  });

  const handleAddImage = useCallback((image: ComposableImage) => {
    const newLayer: CompositionLayer = {
      id: `layer-${Date.now()}`,
      name: image.name,
      thumbnailUrl: image.thumbnailUrl,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 200 },
      scale: 1,
      opacity: 1,
      zIndex: layers.length,
      isVisible: true,
      isLocked: false,
    };

    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
    toast.success(`"${image.name}" 레이어 추가됨`);
  }, [layers.length]);

  const handleToggleVisibility = useCallback((id: string) => {
    setLayers((prev) => prev.map(layer =>
      layer.id === id ? { ...layer, isVisible: !layer.isVisible } : layer
    ));
  }, []);

  const handleToggleLock = useCallback((id: string) => {
    setLayers((prev) => prev.map(layer =>
      layer.id === id ? { ...layer, isLocked: !layer.isLocked } : layer
    ));
  }, []);

  const handleUpdateLayer = useCallback((id: string, updates: Partial<CompositionLayer>) => {
    setLayers((prev) => prev.map(layer =>
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  }, []);

  const handleReorder = useCallback((fromIndex: number, toIndex: number) => {
    setLayers((prev) => {
      const newLayers = [...prev];
      const [removed] = newLayers.splice(fromIndex, 1);
      newLayers.splice(toIndex, 0, removed);
      return newLayers;
    });
  }, []);

  const handleUpdateWeights = useCallback((updates: Partial<CompositionWeights>) => {
    setWeights((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleMergeLayers = useCallback(() => {
    if (layers.length === 0) {
      toast.error("레이어가 없습니다");
      return;
    }
    toast.success("레이어 병합 완료");
  }, [layers.length]);

  const handleExportToCanvas = useCallback(() => {
    if (layers.length === 0) {
      toast.error("내보낼 레이어가 없습니다");
      return;
    }

    if (onExportToCanvas) {
      onExportToCanvas(layers, weights);
    }
    
    toast.success("캔버스로 내보내기 완료");
    onClose();
  }, [layers, weights, onExportToCanvas, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Transparent overlay */}
      <div 
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />

      {/* Main panel */}
      <div 
        className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh] rounded-2xl border-[0.5px] border-solid flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <h2 className="text-base text-foreground">컴포지션 작업대</h2>
          
          <div className="absolute right-2.5 top-2.5 z-50">
            <CloseButton onClick={onClose} size="sm" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar - Layer list */}
          <LayerList
            layers={layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onToggleVisibility={handleToggleVisibility}
            onToggleLock={handleToggleLock}
            onReorder={handleReorder}
          />

          {/* Center - Canvas */}
          <CompositionCanvas
            layers={layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onUpdateLayer={handleUpdateLayer}
          />

          {/* Right sidebar - Composable gallery */}
          <ComposableGallery
            images={MOCK_COMPOSABLE_IMAGES}
            onAddImage={handleAddImage}
          />
        </div>

        {/* Bottom bar - Weight sliders and actions */}
        <div 
          className="border-t px-12 py-4"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <WeightSliders
              weights={weights}
              onUpdateWeights={handleUpdateWeights}
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleMergeLayers}
                className="gap-2"
              >
                <Layers className="w-4 h-4" />
                레이어 병합
              </Button>

              <Button
                onClick={handleExportToCanvas}
                className="gap-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                <Download className="w-4 h-4" />
                캔버스로 내보내기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CompositionNodePanelComponent.displayName = 'CompositionNodePanel';

export const CompositionNodePanel = React.memo(CompositionNodePanelComponent);
