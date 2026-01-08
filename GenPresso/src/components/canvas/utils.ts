import { DRAG_THRESHOLD, MODEL_DATA } from './constants';
import type { NodeType } from './NodeCard';
import type { ModelInfo } from './constants';

export function isDragThresholdExceeded(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): boolean {
  const deltaX = Math.abs(endX - startX);
  const deltaY = Math.abs(endY - startY);
  return deltaX >= DRAG_THRESHOLD || deltaY >= DRAG_THRESHOLD;
}

export function getAvailableModels(nodeType: NodeType): ModelInfo[] {
  const inputMap: Record<NodeType, string> = {
    text: 'text',
    image: 'image',
    video: 'video',
    upload: 'text',
    process: 'text',
  };
  
  const input = inputMap[nodeType];
  return input ? MODEL_DATA.filter(m => m.supportedInputs.includes(input)) : MODEL_DATA;
}

export function calculateTotalCredits(credits: number, repeatCount: number): number {
  return credits * repeatCount;
}

const RATIO_ORDER = ['1:1', '4:3', '3:4', '16:9', '9:16'];

export function sortRatiosByOrder(ratios: string[]): string[] {
  return [...ratios].sort((a, b) => {
    const indexA = RATIO_ORDER.indexOf(a);
    const indexB = RATIO_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}
