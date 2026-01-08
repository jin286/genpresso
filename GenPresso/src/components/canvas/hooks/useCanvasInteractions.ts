import { useCallback, RefObject } from 'react';
import type { Node, SelectionBox } from '../types';
import { CANVAS_CONSTANTS } from '../constants';

interface UseCanvasInteractionsProps {
  canvasRef: RefObject<HTMLDivElement>;
  activeTool: string;
  zoom: number;
  panOffset: { x: number; y: number };
  draggingNodeId: string | null;
  dragStartPos: { x: number; y: number };
  dragOffset: Record<string, { x: number; y: number }>;
  selectedNodeIds: string[];
  nodes: Node[];
  isSelecting: boolean;
  selectionBox: SelectionBox | null;
  isPanning: boolean;
  startPan: { x: number; y: number };
  setZoom: (value: number | ((prev: number) => number)) => void;
  setPanOffset: (value: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setIsPanning: (value: boolean) => void;
  setStartPan: (value: { x: number; y: number }) => void;
  setIsSelecting: (value: boolean) => void;
  setSelectionBox: (value: SelectionBox | null | ((prev: SelectionBox | null) => SelectionBox | null)) => void;
  setSelectedNodeIds: (value: string[] | ((prev: string[]) => string[])) => void;
  setNodes: (value: Node[] | ((prev: Node[]) => Node[])) => void;
  setDraggingNodeId: (value: string | null) => void;
  setDragStartPos: (value: { x: number; y: number }) => void;
  setDragOffset: (value: Record<string, { x: number; y: number }>) => void;
  setContextMenu: (value: { x: number; y: number; nodeId?: string } | null) => void;
}

export const useCanvasInteractions = ({
  canvasRef,
  activeTool,
  zoom,
  panOffset,
  draggingNodeId,
  dragStartPos,
  dragOffset,
  selectedNodeIds,
  nodes,
  isSelecting,
  selectionBox,
  isPanning,
  startPan,
  setZoom,
  setPanOffset,
  setIsPanning,
  setStartPan,
  setIsSelecting,
  setSelectionBox,
  setSelectedNodeIds,
  setNodes,
  setDraggingNodeId,
  setDragStartPos,
  setDragOffset,
  setContextMenu,
}: UseCanvasInteractionsProps) => {
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)));
    } else if (!e.shiftKey) {
      e.preventDefault();
      setPanOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  }, [setZoom, setPanOffset]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.node-card') || target.closest('button') || target.closest('[role="dialog"]')) {
      return;
    }

    if (draggingNodeId) return;
    
    if (e.shiftKey || activeTool === 'hand') {
      setIsPanning(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    } else if (activeTool === 'select' || activeTool === 'node') {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // 줌과 팬을 고려한 정확한 캔버스 좌표 계산
      const canvasX = (e.clientX - rect.left - panOffset.x) / zoom;
      const canvasY = (e.clientY - rect.top - panOffset.y) / zoom;
      
      setIsSelecting(true);
      setSelectionBox({
        startX: canvasX,
        startY: canvasY,
        currentX: canvasX,
        currentY: canvasY,
      });
      
      if (!e.shiftKey) {
        setSelectedNodeIds([]);
      }
    }
  }, [activeTool, panOffset, draggingNodeId, zoom, canvasRef, setIsPanning, setStartPan, setIsSelecting, setSelectionBox, setSelectedNodeIds]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    } else if (isSelecting && selectionBox) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // 줌과 팬을 고려한 정확한 캔버스 좌표 계산
      const canvasX = (e.clientX - rect.left - panOffset.x) / zoom;
      const canvasY = (e.clientY - rect.top - panOffset.y) / zoom;
      
      setSelectionBox(prev => prev ? {
        ...prev,
        currentX: canvasX,
        currentY: canvasY,
      } : null);
    } else if (draggingNodeId) {
      const deltaX = (e.clientX - dragStartPos.x) / zoom;
      const deltaY = (e.clientY - dragStartPos.y) / zoom;

      setNodes(prev => prev.map(node => {
        if (selectedNodeIds.length > 0 && selectedNodeIds.includes(node.id)) {
          const offset = dragOffset[node.id] || { x: 0, y: 0 };
          return {
            ...node,
            x: offset.x + deltaX,
            y: offset.y + deltaY,
          };
        } else if (node.id === draggingNodeId) {
          const offset = dragOffset[draggingNodeId] || { x: 0, y: 0 };
          return {
            ...node,
            x: offset.x + deltaX,
            y: offset.y + deltaY,
          };
        }
        return node;
      }));
    }
  }, [isPanning, startPan, isSelecting, selectionBox, panOffset, zoom, draggingNodeId, dragStartPos, selectedNodeIds, dragOffset, canvasRef, setPanOffset, setSelectionBox, setNodes]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting && selectionBox) {
      const { startX, startY, currentX, currentY } = selectionBox;
      const minX = Math.min(startX, currentX);
      const maxX = Math.max(startX, currentX);
      const minY = Math.min(startY, currentY);
      const maxY = Math.max(startY, currentY);

      const selectedIds = nodes
        .filter(node => {
          const nodeRight = node.x + CANVAS_CONSTANTS.NODE_WIDTH;
          const nodeBottom = node.y + CANVAS_CONSTANTS.NODE_HEIGHT;
          
          return !(
            node.x > maxX ||
            nodeRight < minX ||
            node.y > maxY ||
            nodeBottom < minY
          );
        })
        .map(node => node.id);

      if (selectedIds.length > 0) {
        setSelectedNodeIds(prev => [...new Set([...prev, ...selectedIds])]);
      }
    }

    setIsPanning(false);
    setIsSelecting(false);
    setSelectionBox(null);
    setDraggingNodeId(null);
  }, [isSelecting, selectionBox, nodes, setSelectedNodeIds, setIsPanning, setIsSelecting, setSelectionBox, setDraggingNodeId]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.node-card') ||
      target.closest('button') ||
      target.closest('[role="dialog"]') ||
      target.closest('.context-menu')
    ) {
      return;
    }

    if (activeTool === 'node') {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      // 줌과 팬을 고려한 정확한 캔버스 좌표 계산
      const x = (e.clientX - rect.left - panOffset.x) / zoom;
      const y = (e.clientY - rect.top - panOffset.y) / zoom;

      setContextMenu({ x: e.clientX, y: e.clientY });
    } else if (!isSelecting) {
      setSelectedNodeIds([]);
    }
  }, [activeTool, panOffset, zoom, isSelecting, canvasRef, setContextMenu, setSelectedNodeIds]);

  const handleCanvasRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.closest('.node-card')) {
      return;
    }

    setContextMenu({ x: e.clientX, y: e.clientY });
  }, [setContextMenu]);

  return {
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleCanvasClick,
    handleCanvasRightClick,
  };
};
