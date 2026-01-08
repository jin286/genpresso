/**
 * 세그먼테이션 타입 정의
 */

export interface Segment {
  id: string;
  name: string;
  thumbnailUrl: string;
  maskUrl: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  layer: number;
  type?: 'segment' | 'crop';
  prompt?: string;
  isFavorite?: boolean;
}

export interface SegmentationData {
  id: string;
  sourceImageUrl: string;
  segments: Segment[];
  createdAt: string;
}

export type SegmentationMode = 'viewer' | 'preview' | 'detail';

export interface PreviewItem {
  id: string;
  segmentId: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  mode: 'attach' | 'replace';
}
