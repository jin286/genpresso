/**
 * 세그먼테이션 유틸리티 함수
 */

import type { SegmentationData, Segment, PreviewItem } from './types';

/**
 * 모의 세그먼테이션 데이터 생성
 */
export function mockSegmentation(sourceImageUrl?: string): SegmentationData {
  const mockImageUrl = sourceImageUrl || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800';
  
  const segments: Segment[] = [
    {
      id: 'seg-0',
      name: '영역 1',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 50, y: 50, width: 200, height: 150 },
      layer: 0,
      prompt: '',
    },
    {
      id: 'seg-1',
      name: '영역 2',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 280, y: 80, width: 180, height: 140 },
      layer: 1,
      prompt: '',
    },
    {
      id: 'seg-2',
      name: '영역 3',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 120, y: 220, width: 160, height: 120 },
      layer: 2,
      prompt: '',
    },
    {
      id: 'seg-3',
      name: '영역 4',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 310, y: 240, width: 150, height: 110 },
      layer: 3,
      prompt: '',
    },
    {
      id: 'seg-4',
      name: '영역 5',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 70, y: 380, width: 190, height: 130 },
      layer: 4,
      prompt: '',
    },
    {
      id: 'seg-5',
      name: '영역 6',
      thumbnailUrl: mockImageUrl,
      maskUrl: mockImageUrl,
      bounds: { x: 290, y: 370, width: 170, height: 140 },
      layer: 5,
      prompt: '',
    },
  ];

  return {
    id: `segmentation-${Date.now()}`,
    sourceImageUrl: mockImageUrl,
    segments,
    createdAt: new Date().toISOString(),
  };
}

/**
 * 10px 그리드에 좌표 스냅
 */
export function snapToGrid(x: number, y: number, gridSize: number = 10): { x: number; y: number } {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
}

/**
 * 세그먼트 → 프리뷰 아이템 변환
 */
export function segmentToPreviewItem(
  segment: Segment,
  mode: 'attach' | 'replace' = 'attach'
): PreviewItem {
  return {
    id: `preview-${Date.now()}-${segment.id}`,
    segmentId: segment.id,
    position: { x: segment.bounds.x, y: segment.bounds.y },
    scale: 1,
    rotation: 0,
    opacity: 1,
    zIndex: segment.layer,
    mode,
  };
}
