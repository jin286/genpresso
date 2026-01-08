import type { Node, Segment } from "../types";
import type { NodeType } from "../NodeCard";
import { CANVAS_CONSTANTS, LAYOUT } from "../constants";

interface PositionInput {
  x?: number;
  y?: number;
}

interface LayerNode {
  id: string;
  type: NodeType;
  content?: string;
  prompt?: string;
  imageUrl?: string;
  videoUrl?: string;
  isOutput?: boolean;
  segments?: Segment[];
  metadata?: Record<string, any>;
}

export function calculateNodePosition(
  nodes: Node[],
  sourceNode?: Node,
  explicitPos?: PositionInput
): { x: number; y: number } {
  if (explicitPos?.x !== undefined && explicitPos?.y !== undefined) {
    return { x: explicitPos.x, y: explicitPos.y };
  }

  if (sourceNode) {
    return {
      x: sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: sourceNode.y,
    };
  }

  if (nodes.length > 0) {
    const lastNode = nodes[nodes.length - 1];
    return {
      x: lastNode.x + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: lastNode.y,
    };
  }

  return {
    x: CANVAS_CONSTANTS.INITIAL_NODE_X,
    y: CANVAS_CONSTANTS.INITIAL_NODE_Y,
  };
}

export function calculateDuplicatePosition(node: Node): { x: number; y: number } {
  return {
    x: node.x + CANVAS_CONSTANTS.DUPLICATE_OFFSET,
    y: node.y + CANVAS_CONSTANTS.DUPLICATE_OFFSET,
  };
}

export function calculatePastePosition(node: Node): { x: number; y: number } {
  return {
    x: node.x + CANVAS_CONSTANTS.PASTE_OFFSET,
    y: node.y + CANVAS_CONSTANTS.PASTE_OFFSET,
  };
}

export function createNode(
  type: NodeType,
  position: { x: number; y: number },
  metadata?: Record<string, any>
): Node {
  return {
    id: `node-${Date.now()}`,
    type,
    x: position.x,
    y: position.y,
    content: '',
    prompt: '',
    metadata: {
      createdAt: new Date().toISOString(),
      ...metadata,
    },
  };
}

export function calculateLayeredPosition(
  layerIndex: number,
  nodeIndexInLayer: number,
  totalNodesInLayer: number
): { x: number; y: number } {
  const x = LAYOUT.START_X + layerIndex * LAYOUT.X_STEP;
  
  const centerY = LAYOUT.START_Y;
  const offsetY = LAYOUT.CENTER_OFFSET(totalNodesInLayer);
  const y = centerY + offsetY + nodeIndexInLayer * LAYOUT.Y_STEP;
  
  return { x, y };
}

export function createLayeredNodes(layers: LayerNode[][]): Node[] {
  const nodes: Node[] = [];
  
  layers.forEach((layer, layerIndex) => {
    layer.forEach((nodeData, nodeIndex) => {
      const position = calculateLayeredPosition(layerIndex, nodeIndex, layer.length);
      nodes.push({
        id: nodeData.id,
        type: nodeData.type,
        x: position.x,
        y: position.y,
        content: nodeData.content || '',
        prompt: nodeData.prompt || '',
        imageUrl: nodeData.imageUrl,
        videoUrl: nodeData.videoUrl,
        isOutput: nodeData.isOutput,
        segments: nodeData.segments,
        metadata: {
          createdAt: new Date().toISOString(),
          ...nodeData.metadata,
        },
      });
    });
  });
  
  return nodes;
}
