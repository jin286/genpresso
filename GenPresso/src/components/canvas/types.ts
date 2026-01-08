import type { NodeType } from './NodeCard';

export interface Segment {
  id: string;
  name: string;
  color: 'red' | 'orange' | 'blue' | 'green' | 'purple' | 'yellow';
  bounds: {
    x: number; // 0-100 (%)
    y: number; // 0-100 (%)
    width: number; // 0-100 (%)
    height: number; // 0-100 (%)
  };
  imageUrl?: string; // 추출된 세그먼트 이미지 URL
}

export interface Node {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  prompt?: string;
  isOutput?: boolean;
  segments?: Segment[];
  metadata?: Record<string, any>;
}

export interface Edge {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface CanvasHistory {
  nodes: Node[];
  edges: Edge[];
}

export interface ContextMenu {
  x: number;
  y: number;
  nodeId?: string;
  canvasX?: number;
  canvasY?: number;
}

export interface NodeGroup {
  id: string;
  name: string;
  nodeIds: string[];
  color: 'yellow' | 'blue' | 'pink' | 'green' | 'purple' | 'orange' | 'cyan' | 'red';
  symbolImage?: string; // AI 생성 또는 선택된 그룹 대표 이미지
  symbolImageHistory?: string[]; // AI 생성된 이미지 히스토리 (최신순)
  description?: string; // AI 생성 그룹 설명
  descriptionHistory?: string[]; // AI 생성된 설명 히스토리
  selectedImageNodeIds?: string[]; // 선택된 이미지 노드 ID (최대 3개, 가중치 높음)
  createdAt?: number;
  updatedAt?: number;
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}