import React, { useState, useCallback } from "react";
import { Star, Clock, Folder, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { ScrollArea } from "../../ui/scroll-area";
import type { Segment } from "./types";

interface SegmentGalleryProps {
  onSegmentDrop: (segment: Segment) => void;
  onClose: () => void;
}

/**
 * Segment Gallery (우측 Dock)
 * 
 * - 즐겨찾기/최근 사용/내 파트 (My Parts)
 * - 드래그 → 세부편집 탭 드롭 가능
 * - 썸네일 그리드
 */
const SegmentGalleryComponent = ({
  onSegmentDrop,
  onClose,
}: SegmentGalleryProps) => {
  const [draggingSegment, setDraggingSegment] = useState<Segment | null>(null);

  // Mock 데이터
  const favoriteSegments: Segment[] = [
    {
      id: 'fav-1',
      name: '우드 테이블',
      maskUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1731762551219-c544fa4d02a9?w=200',
      bounds: { x: 0, y: 0, width: 100, height: 100 },
      layer: 1,
      isSelected: false,
      isFavorite: true,
    },
    {
      id: 'fav-2',
      name: '세련된 소파',
      maskUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1731762551219-c544fa4d02a9?w=200',
      bounds: { x: 0, y: 0, width: 100, height: 100 },
      layer: 1,
      isSelected: false,
      isFavorite: true,
    },
  ];

  const recentSegments: Segment[] = [
    {
      id: 'recent-1',
      name: '벽면',
      maskUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?w=200',
      bounds: { x: 0, y: 0, width: 100, height: 100 },
      layer: 0,
      isSelected: false,
      isFavorite: false,
    },
  ];

  const myParts: Segment[] = [
    {
      id: 'my-1',
      name: '커스텀 핸들',
      maskUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1731762551219-c544fa4d02a9?w=200',
      bounds: { x: 0, y: 0, width: 80, height: 40 },
      layer: 2,
      isSelected: false,
      isFavorite: false,
    },
  ];

  const handleDragStart = useCallback((segment: Segment) => {
    setDraggingSegment(segment);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggingSegment) {
      onSegmentDrop(draggingSegment);
      setDraggingSegment(null);
    }
  }, [draggingSegment, onSegmentDrop]);

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-80 border-l flex flex-col"
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
        zIndex: 10,
      }}
    >
      {/* 헤더 */}
      <div className="px-3 py-2.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-glass-border)' }}>
        <h3 className="text-xs font-semibold text-foreground">Segment Gallery</h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-secondary/20 transition-all"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* 탭 */}
      <Tabs defaultValue="favorites" className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b" style={{ borderColor: 'var(--color-glass-border)' }}>
          <TabsTrigger value="favorites" className="flex-1 gap-1.5">
            <Star className="w-3.5 h-3.5" />
            즐겨찾기
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1 gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            최근
          </TabsTrigger>
          <TabsTrigger value="myparts" className="flex-1 gap-1.5">
            <Folder className="w-3.5 h-3.5" />
            내 파트
          </TabsTrigger>
        </TabsList>

        {/* 즐겨찾기 */}
        <TabsContent value="favorites" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-3 grid grid-cols-2 gap-2">
              {favoriteSegments.map((segment) => (
                <div
                  key={segment.id}
                  draggable
                  onDragStart={() => handleDragStart(segment)}
                  onDragEnd={handleDragEnd}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary transition-all"
                >
                  <ImageWithFallback
                    src={segment.thumbnailUrl}
                    alt={segment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-medium text-white truncate">{segment.name}</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* 최근 사용 */}
        <TabsContent value="recent" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-3 grid grid-cols-2 gap-2">
              {recentSegments.map((segment) => (
                <div
                  key={segment.id}
                  draggable
                  onDragStart={() => handleDragStart(segment)}
                  onDragEnd={handleDragEnd}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary transition-all"
                >
                  <ImageWithFallback
                    src={segment.thumbnailUrl}
                    alt={segment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-medium text-white truncate">{segment.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* 내 파트 */}
        <TabsContent value="myparts" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-3 grid grid-cols-2 gap-2">
              {myParts.map((segment) => (
                <div
                  key={segment.id}
                  draggable
                  onDragStart={() => handleDragStart(segment)}
                  onDragEnd={handleDragEnd}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary transition-all"
                >
                  <ImageWithFallback
                    src={segment.thumbnailUrl}
                    alt={segment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-medium text-white truncate">{segment.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* 드래그 힌트 */}
      <div 
        className="px-3 py-2 border-t text-xs text-muted-foreground"
        style={{ borderColor: 'var(--color-glass-border)' }}
      >
        💡 드래그하여 세부편집 탭에 추가
      </div>
    </div>
  );
};

SegmentGalleryComponent.displayName = 'SegmentGallery';

export const SegmentGallery = React.memo(SegmentGalleryComponent);
