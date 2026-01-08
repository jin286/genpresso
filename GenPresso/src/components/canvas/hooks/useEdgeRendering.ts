/**
 * 에지 렌더링 관리 Hook
 * 노드 간 연결선(Edge) 렌더링 로직을 관리합니다
 */

import { useMemo } from "react";
import type { Node, Edge } from "../types";
import { CANVAS_CONSTANTS } from "../constants";

export interface EdgePosition {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export function useEdgeRendering(
  edges: Edge[],
  nodes: Node[],
  nodeHeights: Record<string, number>
) {
  const edgePositions = useMemo(() => {
    return edges.map(edge => {
      const sourceNode = nodes.find(n => n.id === edge.sourceId);
      const targetNode = nodes.find(n => n.id === edge.targetId);

      if (!sourceNode || !targetNode) {
        return null;
      }

      const sourceHeight = nodeHeights[edge.sourceId] || CANVAS_CONSTANTS.NODE_HEIGHT;
      const targetHeight = nodeHeights[edge.targetId] || CANVAS_CONSTANTS.NODE_HEIGHT;

      const sourceX = sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH;
      const sourceY = sourceNode.y + sourceHeight / 2;

      // 타겟 노드의 왼쪽 중앙점
      const targetX = targetNode.x;
      const targetY = targetNode.y + targetHeight / 2;

      return {
        id: edge.id,
        sourceX,
        sourceY,
        targetX,
        targetY,
      };
    }).filter((edge): edge is EdgePosition => edge !== null);
  }, [edges, nodes, nodeHeights]);

  const getBezierPath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
  ): string => {
    const midX = (sourceX + targetX) / 2;
    
    return `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX} ${targetY}`;
  };

  return {
    edgePositions,
    getBezierPath,
  };
}
