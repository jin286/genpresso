export interface CompositionLayer {
  id: string;
  name: string;
  thumbnailUrl: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  scale: number;
  opacity: number;
  zIndex: number;
  isVisible: boolean;
  isLocked: boolean;
}

export interface ComposableImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  category: string;
}

export interface CompositionWeights {
  style: number;
  structure: number;
  color: number;
}
