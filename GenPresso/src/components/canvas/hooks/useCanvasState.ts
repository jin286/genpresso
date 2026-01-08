/**
 * 캔버스 상태 관리 Hook
 * 줌, 팬, 선택 등 캔버스의 뷰포트 상태를 관리합니다
 */

import { useState, useCallback } from "react";
import { CANVAS_CONSTANTS } from "../constants";

export interface CanvasState {
  zoom: number;
  panOffset: { x: number; y: number };
  isPanning: boolean;
  startPan: { x: number; y: number };
  activeTool: string;
  isFileUploadOpen: boolean;
  isGalleryOpen: boolean;
}

export function useCanvasState() {
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState<string>("select");
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(CANVAS_CONSTANTS.MAX_ZOOM, prev + CANVAS_CONSTANTS.ZOOM_STEP));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(CANVAS_CONSTANTS.MIN_ZOOM, prev - CANVAS_CONSTANTS.ZOOM_STEP));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  const handleToolChange = useCallback((tool: string) => {
    setActiveTool(tool);
  }, []);

  return {
    // State
    zoom,
    panOffset,
    isPanning,
    startPan,
    activeTool,
    isFileUploadOpen,
    isGalleryOpen,
    
    // Setters
    setZoom,
    setPanOffset,
    setIsPanning,
    setStartPan,
    setActiveTool,
    setIsFileUploadOpen,
    setIsGalleryOpen,
    
    // Handlers
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleToolChange,
  };
}
