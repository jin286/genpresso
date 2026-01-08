/**
 * 노드 드래그 관리 Hook
 * 노드 드래그 앤 드롭 로직을 관리합니다
 */

import { useState, useCallback } from "react";
import type { Node } from "../types";

export function useNodeDrag() {
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<Record<string, { x: number; y: number }>>({});

  const handleNodeDragStart = useCallback((
    nodeId: string,
    clientX: number,
    clientY: number,
    nodes: Node[],
    selectedNodeIds: string[]
  ) => {
    setDraggingNodeId(nodeId);
    setDragStartPos({ x: clientX, y: clientY });

    // 드래그 시작 시 모든 선택된 노드의 초기 위치 저장
    const offsets: Record<string, { x: number; y: number }> = {};
    
    if (selectedNodeIds.length > 0 && selectedNodeIds.includes(nodeId)) {
      selectedNodeIds.forEach(id => {
        const node = nodes.find(n => n.id === id);
        if (node) {
          offsets[id] = { x: node.x, y: node.y };
        }
      });
    } else {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        offsets[nodeId] = { x: node.x, y: node.y };
      }
    }

    setDragOffset(offsets);
  }, []);

  const handleNodeDragEnd = useCallback(() => {
    setDraggingNodeId(null);
    setDragOffset({});
  }, []);

  const calculateNodePosition = useCallback((
    node: Node,
    deltaX: number,
    deltaY: number,
    selectedNodeIds: string[]
  ): { x: number; y: number } | null => {
    if (selectedNodeIds.length > 0 && selectedNodeIds.includes(node.id)) {
      const offset = dragOffset[node.id] || { x: 0, y: 0 };
      return {
        x: offset.x + deltaX,
        y: offset.y + deltaY,
      };
    } else if (node.id === draggingNodeId) {
      const offset = dragOffset[draggingNodeId] || { x: 0, y: 0 };
      return {
        x: offset.x + deltaX,
        y: offset.y + deltaY,
      };
    }
    return null;
  }, [draggingNodeId, dragOffset]);

  return {
    // State
    draggingNodeId,
    dragStartPos,
    dragOffset,

    // Setters
    setDraggingNodeId,

    // Handlers
    handleNodeDragStart,
    handleNodeDragEnd,
    calculateNodePosition,
  };
}
