/**
 * 컨텍스트 메뉴 관리 Hook
 * 우클릭 컨텍스트 메뉴의 위치와 상태를 관리합니다
 */

import { useState, useCallback, useRef } from "react";
import type { NodeType } from "../types";

export interface ContextMenuState {
  x: number;
  y: number;
  canvasX: number;
  canvasY: number;
}

export interface UseContextMenuProps {
  activeTool: string;
  panOffset: { x: number; y: number };
  zoom: number;
  onAddNode: (type: NodeType, x: number, y: number) => void;
}

export function useContextMenu({
  activeTool,
  panOffset,
  zoom,
  onAddNode,
}: UseContextMenuProps) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasRightClick = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'node' && canvasRef.current) {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - panOffset.x) / zoom;
      const canvasY = (e.clientY - rect.top - panOffset.y) / zoom;
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        canvasX,
        canvasY,
      });
    }
  }, [activeTool, panOffset, zoom]);

  const handleContextMenuSelectType = useCallback((type: NodeType) => {
    if (contextMenu) {
      onAddNode(type, contextMenu.canvasX, contextMenu.canvasY);
      setContextMenu(null);
    }
  }, [contextMenu, onAddNode]);

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  return {
    // Ref
    canvasRef,

    // State
    contextMenu,

    // Handlers
    handleCanvasRightClick,
    handleContextMenuSelectType,
    handleContextMenuClose,
  };
}
