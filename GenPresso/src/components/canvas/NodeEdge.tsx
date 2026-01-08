import React, { memo } from "react";
import { CANVAS_CONSTANTS, Z_INDEX } from "./constants";

interface NodeEdgesContainerProps {
  edges: Array<{
    id: string;
    sourceId: string;
    targetId: string;
  }>;
  nodes: Array<{
    id: string;
    x: number;
    y: number;
  }>;
  nodeHeights?: Record<string, number>;
}

const NodeEdgesContainerComponent = ({
  edges,
  nodes,
  nodeHeights = {},
}: NodeEdgesContainerProps) => {
  if (!edges.length || !nodes.length) return null;

  const nodeMap = new Map(nodes.map(node => [node.id, node]));

  return (
    <svg 
      className="absolute pointer-events-none"
      style={{ 
        left: 0,
        top: 0,
        width: `${CANVAS_CONSTANTS.CANVAS_WIDTH}px`,
        height: `${CANVAS_CONSTANTS.CANVAS_HEIGHT}px`,
        zIndex: Z_INDEX.EDGES,
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="edge-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {edges.map((edge) => {
        const sourceNode = nodeMap.get(edge.sourceId);
        const targetNode = nodeMap.get(edge.targetId);
        if (!sourceNode || !targetNode) return null;

        const sourceHeight = nodeHeights[edge.sourceId] || CANVAS_CONSTANTS.NODE_HEIGHT;
        const targetHeight = nodeHeights[edge.targetId] || CANVAS_CONSTANTS.NODE_HEIGHT;

        // 안전한 계산: NaN 방지
        const startX = (sourceNode.x ?? 0) + CANVAS_CONSTANTS.NODE_WIDTH;
        const startY = (sourceNode.y ?? 0) + (sourceHeight || CANVAS_CONSTANTS.NODE_HEIGHT) / 2;
        const endX = targetNode.x ?? 0;
        const endY = (targetNode.y ?? 0) + (targetHeight || CANVAS_CONSTANTS.NODE_HEIGHT) / 2;

        // NaN 체크
        if (isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)) {
          return null;
        }

        const controlPointOffset = Math.abs(endX - startX) * 0.5;
        const path = `M ${startX} ${startY} C ${startX + controlPointOffset} ${startY}, ${endX - controlPointOffset} ${endY}, ${endX} ${endY}`;

        return (
          <g key={edge.id}>
            <path
              d={path}
              stroke="var(--primary)"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              opacity={0.6}
              filter="url(#edge-glow)"
              className="transition-all duration-200"
            />
            <circle
              cx={endX}
              cy={endY}
              r={6}
              fill="var(--primary)"
              opacity={0.8}
            />
          </g>
        );
      })}
    </svg>
  );
};

NodeEdgesContainerComponent.displayName = "NodeEdgesContainer";

export const NodeEdgesContainer = memo(NodeEdgesContainerComponent);
