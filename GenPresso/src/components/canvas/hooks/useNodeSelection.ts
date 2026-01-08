/**
 * 노드 선택 관리 Hook
 * 노드 선택, 다중 선택, 드래그 선택 박스 등을 관리합니다
 */

import { useState, useCallback } from "react";
import type { Node } from "../types";

export interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function useNodeSelection() {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleNodeSelect = useCallback((nodeId: string, isCtrlKey: boolean) => {
    setSelectedNodeIds(prev => {
      if (isCtrlKey) {
        return prev.includes(nodeId) 
          ? prev.filter(id => id !== nodeId)
          : [...prev, nodeId];
      } else {
        return [nodeId];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodeIds([]);
  }, []);

  const selectMultiple = useCallback((nodeIds: string[]) => {
    setSelectedNodeIds(nodeIds);
  }, []);

  const isNodeInSelectionBox = useCallback((
    node: Node,
    box: SelectionBox
  ): boolean => {
    const minX = Math.min(box.startX, box.currentX);
    const maxX = Math.max(box.startX, box.currentX);
    const minY = Math.min(box.startY, box.currentY);
    const maxY = Math.max(box.startY, box.currentY);

    return (
      node.x >= minX &&
      node.x <= maxX &&
      node.y >= minY &&
      node.y <= maxY
    );
  }, []);

  return {
    // State
    selectedNodeIds,
    selectionBox,
    isSelecting,

    // Setters
    setSelectedNodeIds,
    setSelectionBox,
    setIsSelecting,

    // Handlers
    handleNodeSelect,
    clearSelection,
    selectMultiple,
    isNodeInSelectionBox,
  };
}
