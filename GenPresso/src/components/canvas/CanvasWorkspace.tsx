import React, { useState, useRef, useCallback, useEffect } from "react";
import { FileUploadPanel } from "./FileUploadPanel";
import { GalleryPanel } from "./GalleryPanel";
import LeftToolbar from "./LeftToolbar";
import TopToolbar from "./TopToolbar";
import ZoomControls from "./ZoomControls";
import GenerationInput from "./GenerationInput";
import { NodeCard, type NodeType } from "./NodeCard";
import { NodeContextMenu } from "./NodeContextMenu";
import { NodeEdgesContainer } from "./NodeEdge";
import { AIAssistantToolbar } from "./AIAssistantToolbar";
import { EmptyCanvas } from "./EmptyCanvas";
import { SelectionBox } from "./SelectionBox";
import { TurnIntoMenu } from "./TurnIntoMenu";
import { FloatingToolbar } from "./FloatingToolbar";
import { Button } from "../ui/button";
import { IconSparkles } from "../icons";
import type { Node, Edge } from "./types";
import { SegmentationPanel } from "./segmentation/SegmentationPanel";

import { DetailEditModal } from "./DetailEditModal";
import { NodeGroupOverlay } from "./NodeGroupOverlay";
import { GroupEditDialog } from "./GroupEditDialog";
import { 
  getConnectedInputNodes, 
  buildGenerationRequest, 
  buildVideoGenerationRequest 
} from "./NodeMetadataCollector";
import { useCanvasShortcuts } from "./useCanvasShortcuts";
import { useTurnInto } from "./hooks/useTurnInto";
import { useComments } from "./hooks/useComments";
import { CommentPin } from "./CommentPin";
import type { CanvasToolId, AIToolId, ScenarioId, WorkspaceTab } from "../../types";
import { getScenarioTemplate, getScenarioByCategory } from "./scenario-templates";
import { toast } from "sonner@2.0.3";
import { CANVAS_CONSTANTS, Z_INDEX } from "./constants";
import { Plus } from "lucide-react";
import { 
  calculateNodePosition, 
  calculateDuplicatePosition, 
  calculatePastePosition,
  createNode 
} from "./utils/node-layout";
import { useLanguage } from "../../contexts/LanguageContext";

const GENERATION_TIMEOUT_MS = 3000;

const SCENARIO_IDS = [
  'text-to-video',
  'text-to-image',
  'image-text-to-image',
  'image-text-to-video',
  'video-audio-generation',
  'complex-workflow',
  'workflow-chain',
  'segmentation-workflow',
  'segmentation-test',
  'grouping-test',
  'agent-conversation',
  'simple-group',
] as const;

interface CanvasWorkspaceProps {
  onBack?: () => void;
  scenarioId?: string | null;
}

export default function CanvasWorkspace({ onBack, scenarioId }: CanvasWorkspaceProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  
  // Tool & UI state
  const [activeTool, setActiveTool] = useState<string>("select");
  const [isChatBarVisible, setIsChatBarVisible] = useState(true);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSegmentPanelOpen, setIsSegmentPanelOpen] = useState(false);
  const [segmentSourceImageUrl, setSegmentSourceImageUrl] = useState<string | undefined>(undefined);

  const [isDetailEditModalOpen, setIsDetailEditModalOpen] = useState(false);
  const [detailEditNodes, setDetailEditNodes] = useState<Node[]>([]);
  const [detailEditEdges, setDetailEditEdges] = useState<Edge[]>([]);
  const [detailEditWorkspaceName, setDetailEditWorkspaceName] = useState('');

  // Selection state
  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  // Node & Edge state
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeHeights, setNodeHeights] = useState<Record<string, number>>({});
  
  // Visual Layout Calculation: Expanded nodes push down nodes below them
  const renderedNodes = React.useMemo(() => {
    // Sort by Y to ensure dependencies are processed (though simple iteration works for "all above")
    // We need to calculate offset for each node based on *base* positions of nodes above it.
    
    return nodes.map(node => {
      let offsetY = 0;
      
      nodes.forEach(upperNode => {
        if (upperNode.id === node.id) return;
        
        // Check if upperNode is strictly above this node (using base Y)
        if (upperNode.y < node.y) {
          // Check horizontal overlap
          const nodeLeft = node.x;
          const nodeRight = node.x + CANVAS_CONSTANTS.NODE_WIDTH;
          const upperLeft = upperNode.x;
          const upperRight = upperNode.x + CANVAS_CONSTANTS.NODE_WIDTH;
          
          const overlap = Math.max(0, Math.min(nodeRight, upperRight) - Math.max(nodeLeft, upperLeft));
          
          // If significant overlap (e.g. > 10px)
          if (overlap > 10) {
            const currentHeight = nodeHeights[upperNode.id] || CANVAS_CONSTANTS.NODE_HEIGHT;
            const baseHeight = CANVAS_CONSTANTS.NODE_HEIGHT;
            const extraHeight = Math.max(0, currentHeight - baseHeight);
            
            if (extraHeight > 0) {
              offsetY += extraHeight;
            }
          }
        }
      });

      return {
        ...node,
        y: node.y + offsetY,
        // Store original Y if needed, but for rendering we just use y
        _baseY: node.y 
      };
    });
  }, [nodes, nodeHeights]);
  
  // Group state
  const [groups, setGroups] = useState<import("./types").NodeGroup[]>([]);
  const [isGroupEditOpen, setIsGroupEditOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<import("./types").NodeGroup | null>(null);
  const [activeGroupColors, setActiveGroupColors] = useState<Set<string>>(new Set()); // 활성화된 그룹 색상
  
  // Workspace Tab state
  const [workspaceTabs, setWorkspaceTabs] = useState<WorkspaceTab[]>([
    {
      id: 'main',
      name: '메인 캔버스',
      type: 'main',
      nodes: [],
      edges: [],
      createdAt: Date.now(),
    }
  ]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState('main');
  
  // Generation settings
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [repeatCount, setRepeatCount] = useState(1);
  const [selectedSound, setSelectedSound] = useState('none');
  const [videoLength, setVideoLength] = useState(5);
  
  // Context menu
  const [contextMenu, setContextMenu] = useState<{ 
    x: number; 
    y: number; 
    canvasX: number; 
    canvasY: number 
  } | null>(null);

  // Drag state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<Record<string, { x: number; y: number }>>({});

  // History state
  const [history, setHistory] = useState<Node[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copiedNodeIds, setCopiedNodeIds] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string>('새 프로젝트');
  
  // Turn Into Menu state
  const [turnIntoMenuNodeId, setTurnIntoMenuNodeId] = useState<string | null>(null);

  // Comments hook
  const { comments, addComment, updateComment, cancelComment, cancelEditingComments, hasEditingComment, toggleCommentExpanded, updateCommentPosition } = useComments();

  // Turn Into hook
  const { turnIntoText, turnIntoImage, turnIntoVideo } = useTurnInto({
    selectedModel,
    selectedRatio,
    setNodes,
    setEdges,
  });

  // Initialize blank canvas
  const initializeBlankCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setProjectName('새 프로젝트');
  }, []);

  // Load scenario template
  useEffect(() => {
    if (!scenarioId) return;

    if (scenarioId === 'blank') {
      initializeBlankCanvas();
      return;
    }

    const isScenarioTemplate = SCENARIO_IDS.includes(scenarioId as any);
    const template = isScenarioTemplate
      ? getScenarioTemplate(scenarioId as ScenarioId)
      : getScenarioByCategory(scenarioId);

    if (template) {
      const loadedNodes = template.nodes as Node[];
      const loadedEdges = template.edges;
      const loadedGroups = template.groups || [];
      
      setNodes(loadedNodes);
      setEdges(loadedEdges);
      setGroups(loadedGroups);
      setHistory([loadedNodes]);
      setHistoryIndex(0);
      setProjectName(template.name);
      
      // 메인 워크스페이스에도 로드된 노드/엣지 저장
      setWorkspaceTabs(prev => prev.map(tab => 
        tab.id === 'main' 
          ? { ...tab, nodes: loadedNodes, edges: loadedEdges }
          : tab
      ));
    } else {
      initializeBlankCanvas();
    }
  }, [scenarioId, initializeBlankCanvas]);

  // Canvas interactions
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(CANVAS_CONSTANTS.MIN_ZOOM, Math.min(CANVAS_CONSTANTS.MAX_ZOOM, prev * delta)));
    } else if (!e.shiftKey) {
      e.preventDefault();
      setPanOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // 코멘트 모드: 캔버스 클릭 시 핀 생성 (버튼/노드/다이얼로그 제외)
    if (activeTool === 'comment') {
      // 입력창이나 다른 인터랙티브 요소 클릭 시에는 무시
      if (target.closest('input') || target.closest('button') || target.closest('[role="dialog"]')) {
        return;
      }
      
      // 노드 카드 클릭 시에도 무시
      if (target.closest('.node-card')) {
        return;
      }
      
      // 이미 편집 중인 코멘트가 있으면 새 코멘트 생성하지 않음
      if (hasEditingComment()) {
        return;
      }
      
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - panOffset.x) / zoom;
        const y = (e.clientY - rect.top - panOffset.y) / zoom;
        addComment(x, y);
      }
      return;
    }

    if (target.closest('.node-card') || target.closest('button') || target.closest('[role="dialog"]')) {
      return;
    }

    if (activeTool === 'select' || e.button === 1) {
      if (e.button === 1 || (e.button === 0 && activeTool === 'select' && (e.ctrlKey || e.metaKey))) {
        setIsPanning(true);
        setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      } else if (activeTool === 'select') {
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left - panOffset.x) / zoom;
          const y = (e.clientY - rect.top - panOffset.y) / zoom;
          setIsSelecting(true);
          setSelectionBox({ startX: x, startY: y, currentX: x, currentY: y });
          setSelectedNodeIds([]);
        }
      }
    }
  }, [activeTool, panOffset, zoom, addComment, hasEditingComment, cancelEditingComments]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    } else if (isSelecting && selectionBox && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = (e.clientX - rect.left - panOffset.x) / zoom;
      const currentY = (e.clientY - rect.top - panOffset.y) / zoom;
      setSelectionBox(prev => prev ? { ...prev, currentX, currentY } : null);
    } else if (draggingNodeId) {
      const deltaX = (e.clientX - dragStartPos.x) / zoom;
      const deltaY = (e.clientY - dragStartPos.y) / zoom;
      
      setNodes(prev => prev.map(node => {
        if (selectedNodeIds.length > 0 && selectedNodeIds.includes(node.id) && dragOffset[node.id]) {
          const offset = dragOffset[node.id];
          return { ...node, x: offset.x + deltaX, y: offset.y + deltaY };
        } else if (node.id === draggingNodeId && dragOffset[draggingNodeId]) {
          const offset = dragOffset[draggingNodeId];
          return { ...node, x: offset.x + deltaX, y: offset.y + deltaY };
        }
        return node;
      }));
    }
  }, [isPanning, startPan, isSelecting, selectionBox, panOffset, zoom, draggingNodeId, dragStartPos, selectedNodeIds, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting && selectionBox) {
      const { startX, startY, currentX, currentY } = selectionBox;
      const minX = Math.min(startX, currentX);
      const maxX = Math.max(startX, currentX);
      const minY = Math.min(startY, currentY);
      const maxY = Math.max(startY, currentY);

      const selectedIds = renderedNodes
        .filter(node => {
          const nodeRight = node.x + CANVAS_CONSTANTS.NODE_WIDTH;
          const nodeHeight = nodeHeights[node.id] || CANVAS_CONSTANTS.NODE_HEIGHT;
          const nodeBottom = node.y + nodeHeight;
          return (
            node.x < maxX &&
            nodeRight > minX &&
            node.y < maxY &&
            nodeBottom > minY
          );
        })
        .map(node => node.id);

      setSelectedNodeIds(selectedIds);
      setIsSelecting(false);
      setSelectionBox(null);
    }

    setIsPanning(false);
    setDraggingNodeId(null);
    setDragOffset({});
  }, [isSelecting, selectionBox, renderedNodes, nodeHeights]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(CANVAS_CONSTANTS.MAX_ZOOM, prev * 1.1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(CANVAS_CONSTANTS.MIN_ZOOM, prev * 0.9));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Tool handlers
  const handleToolChange = useCallback((toolId: CanvasToolId | AIToolId) => {
    setActiveTool(toolId);
  }, []);

  const handleFilesClick = useCallback(() => {
    setIsFileUploadOpen(true);
  }, []);

  const handleGalleryClick = useCallback(() => {
    setIsGalleryOpen(true);
  }, []);

  const handleFileUploadClose = useCallback(() => {
    setIsFileUploadOpen(false);
  }, []);

  const handleGalleryClose = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  // Node operations
  const handleAddNode = useCallback((type: NodeType = 'text', x?: number, y?: number) => {
    const position = calculateNodePosition(nodes, undefined, { x, y });
    const newNode = createNode(type, position, {
      model: selectedModel,
      ratio: selectedRatio,
    });
    
    setNodes(prev => [...prev, newNode]);
    toast.success(t('canvas.nodeAdded', { type }));
  }, [selectedModel, selectedRatio, nodes]);

  const handleDeleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(e => e.sourceId !== id && e.targetId !== id));
  }, []);

  const handleCreateCroppedNode = useCallback((imageUrl: string, bounds: { x: number; y: number; width: number; height: number }) => {
    let centerX = 0;
    let centerY = 0;
    
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      centerX = (rect.width / 2 - panOffset.x) / zoom;
      centerY = (rect.height / 2 - panOffset.y) / zoom;
    }

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'image',
      x: centerX - (CANVAS_CONSTANTS.NODE_WIDTH / 2),
      y: centerY - (CANVAS_CONSTANTS.NODE_HEIGHT / 2),
      imageUrl: imageUrl, // 실제 구현 시에는 크롭된 이미지 URL 사용
      prompt: 'Cropped Image',
      isOutput: true,
      metadata: {
        cropBounds: bounds,
        originalImageUrl: imageUrl,
        createdAt: new Date().toISOString()
      }
    };

    setNodes(prev => [...prev, newNode]);
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...nodes, newNode]);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);

    toast.success(t('canvas.nodeAdded', { type: 'image' }));
  }, [nodes, historyIndex, panOffset, zoom, t]);

  const handleExtractSegment = useCallback((nodeId: string, segmentId: string) => {
    const sourceNode = nodes.find(n => n.id === nodeId);
    if (!sourceNode || !sourceNode.segments) return;

    const segment = sourceNode.segments.find(s => s.id === segmentId);
    if (!segment) return;

    // 새 이미지 노드 생성 (원본 노드 오른쪽에 배치)
    const newNodePosition = {
      x: sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH + 150,
      y: sourceNode.y + 50
    };

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'image',
      x: newNodePosition.x,
      y: newNodePosition.y,
      imageUrl: 'figma:asset/2e108bcecab555e3654f266f2271a077f73ce7cb.png',
      prompt: `${segment.name} 세그먼트 추출됨`,
      isOutput: true,
      metadata: {
        extractedFrom: nodeId,
        segmentId: segmentId,
        segmentName: segment.name,
      }
    };

    // 엣지 생성 (원본 노드 → 새 노드)
    const newEdge: Edge = {
      id: `edge-${Date.now()}`,
      sourceId: nodeId,
      targetId: newNode.id,
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    setEdges(prev => [...prev, newEdge]);
    
    // 히스토리 저장
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(updatedNodes);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
    
    toast.success(t('canvas.segmentExtracted', { name: segment.name }));
  }, [nodes, historyIndex]);

  const handleGenerateNode = useCallback((id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    const inputNodes = getConnectedInputNodes(id, nodes, edges);
    const isVideo = node.type === 'video' || node.metadata?.targetType === 'video';
    
    const generationRequest = isVideo 
      ? buildVideoGenerationRequest(node, inputNodes, selectedModel, selectedRatio)
      : buildGenerationRequest(node, inputNodes, selectedModel, selectedRatio);
    
    toast.success(t('canvas.generationStarted', { type: node.type }), {
      description: `모델: ${generationRequest.model} | 비율: ${generationRequest.ratio}`,
    });

    // Mix Node의 경우: 현재 상태를 스냅샷으로 저장한 새 Mix Node 생성 + 우측에 결과 이미지 생성
    if (node.type === 'mix') {
      const timestamp = Date.now();
      
      // 1. 현재 노드로부�� 생성된 자식 Mix 노드들의 개수 계산
      const childMixNodes = nodes.filter(n => 
        n.type === 'mix' && 
        n.metadata?.sourceNodeId === id
      );
      const childCount = childMixNodes.length;
      
      // 2. 새 Mix Node 위치 계산 (원본 우측에 세로로 정렬, 겹치지 않게)
      const newMixNodeId = `node-${timestamp}-mix`;
      const newMixX = node.x + CANVAS_CONSTANTS.HORIZONTAL_SPACING;
      const newMixY = node.y + CANVAS_CONSTANTS.MIX_NODE_VERTICAL_SPACING * childCount;
      
      // 3. 결과 Image Node 위치 계산 (새 Mix Node 우측에 배치)
      const newImageNodeId = `node-${timestamp}-image`;
      const newImageX = newMixX + CANVAS_CONSTANTS.HORIZONTAL_SPACING;
      const newImageY = newMixY;
      
      // 4. 현재 Mix Node의 상태를 복제한 새 Mix Node 생성
      const newMixNode: Node = {
        id: newMixNodeId,
        type: 'mix' as NodeType,
        x: newMixX,
        y: newMixY,
        content: '',
        prompt: node.prompt || '',
        metadata: {
          ...node.metadata,
          segments: node.metadata?.segments || [],
          sourceNodeId: id,
          snapshotTimestamp: timestamp,
          model: selectedModel,
          ratio: selectedRatio,
          createdAt: new Date().toISOString(),
        },
      };
      
      // 5. Process 노드 생성 (임시 로딩 상태)
      const processNode: Node = {
        id: newImageNodeId,
        type: 'process' as NodeType,
        x: newImageX,
        y: newImageY,
        content: '',
        prompt: '',
        metadata: {
          sourceId: newMixNodeId,
          createdFromMix: true,
          model: selectedModel,
          ratio: selectedRatio,
          createdAt: new Date().toISOString(),
        },
      };
      
      // 6. 노드 추가 (새 Mix Node + Process Node)
      setNodes(prev => [...prev, newMixNode, processNode]);
      
      // 7. 연결선 생성
      const newEdges: Edge[] = [
        // 기존 Mix Node → 새 Mix Node
        {
          id: `edge-${timestamp}-original-to-snapshot`,
          sourceId: id,
          targetId: newMixNodeId,
        },
        // 새 Mix Node → Process Node
        {
          id: `edge-${timestamp}-snapshot-to-result`,
          sourceId: newMixNodeId,
          targetId: newImageNodeId,
        },
      ];
      setEdges(prev => [...prev, ...newEdges]);
      
      // 8. 3초 후 Process → Image 노드 변환
      setTimeout(() => {
        setNodes(prev => prev.map(n => {
          if (n.id === newImageNodeId) {
            return {
              ...n,
              type: 'image' as NodeType,
              imageUrl: 'https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a',
            };
          }
          return n;
        }));
        toast.success(t('canvas.mixGenerationComplete'));
      }, GENERATION_TIMEOUT_MS);
      
      toast.info(t('canvas.mixNodeCreated'));
      
      return;
    }

    // 기존 노드 타입들: 노드 자체를 변환
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, type: 'process' as NodeType } : n
    ));

    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === id) {
          const targetType = n.metadata?.targetType || n.type;
          return {
            ...n,
            type: targetType as NodeType,
            imageUrl: targetType === 'image' ? 'https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a' : undefined,
            videoUrl: targetType === 'video' ? 'sample-video.mp4' : undefined,
          };
        }
        return n;
      }));
      toast.success(t('canvas.generationComplete'));
    }, GENERATION_TIMEOUT_MS);
  }, [nodes, edges, selectedModel, selectedRatio]);

  // Context menu
  const handleCanvasRightClick = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'node' && canvasRef.current) {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - panOffset.x) / zoom;
      const canvasY = (e.clientY - rect.top - panOffset.y) / zoom;
      setContextMenu({ x: e.clientX, y: e.clientY, canvasX, canvasY });
    }
  }, [activeTool, panOffset, zoom]);

  const handleContextMenuSelectType = useCallback((type: NodeType) => {
    if (contextMenu) {
      handleAddNode(type, contextMenu.canvasX, contextMenu.canvasY);
      setContextMenu(null);
    }
  }, [contextMenu, handleAddNode]);

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  // History
  const saveHistory = useCallback((newNodes: Node[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newNodes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setNodes(history[historyIndex - 1]);
      toast.success(t('canvas.undo'));
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setNodes(history[historyIndex + 1]);
      toast.success(t('canvas.redo'));
    }
  }, [historyIndex, history]);

  // Selection
  const handleNodeSelect = useCallback((nodeId: string, isCtrlKey: boolean) => {
    if (isCtrlKey) {
      setSelectedNodeIds(prev => {
        if (prev.includes(nodeId)) {
          return prev.filter(id => id !== nodeId);
        } else {
          return [...prev, nodeId];
        }
      });
    } else {
      setSelectedNodeIds([nodeId]);
    }
  }, []);

  // Add node from node (+ button)
  const handleAddNodeFromNode = useCallback((sourceId: string, targetType: NodeType) => {
    // 선택된 노드들이 있으면 그것들을 기준으로, 없으면 sourceId 노드를 기준으로
    const sourceNodes = selectedNodeIds.length > 0 
      ? nodes.filter(n => selectedNodeIds.includes(n.id))
      : nodes.filter(n => n.id === sourceId);

    if (sourceNodes.length === 0) return;

    // 선택된 노드들의 중심 계산
    const centerX = sourceNodes.reduce((sum, node) => sum + node.x, 0) / sourceNodes.length;
    const centerY = sourceNodes.reduce((sum, node) => sum + node.y, 0) / sourceNodes.length;

    // 새 노드 생성 (우측에 배치)
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: targetType,
      x: centerX + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: centerY,
      content: '',
      prompt: '',
      metadata: {
        model: selectedModel,
        ratio: selectedRatio,
        createdAt: new Date().toISOString(),
        sourceNodeIds: sourceNodes.map(n => n.id),
      },
    };

    setNodes(prev => [...prev, newNode]);

    // 연결선 생성
    const newEdges: Edge[] = sourceNodes.map(sourceNode => ({
      id: `edge-${sourceNode.id}-${newNode.id}`,
      sourceId: sourceNode.id,
      targetId: newNode.id,
    }));

    setEdges(prev => [...prev, ...newEdges]);

    if (selectedNodeIds.length > 0) {
      toast.success(t('canvas.nodesFromSelected', { count: selectedNodeIds.length, type: targetType }));
    } else {
      toast.success(t('canvas.nodeAdded', { type: targetType }));
    }

    saveHistory([...nodes, newNode]);
  }, [selectedNodeIds, nodes, selectedModel, selectedRatio, saveHistory]);

  // Drag
  const handleNodeDragStart = useCallback((nodeId: string, clientX: number, clientY: number) => {
    setDraggingNodeId(nodeId);
    setDragStartPos({ x: clientX, y: clientY });
    
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
  }, [nodes, selectedNodeIds]);

  // Multi-select operations
  const handleDeleteSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;

    const newNodes = nodes.filter(n => !selectedNodeIds.includes(n.id));
    setNodes(newNodes);
    setEdges(edges.filter(e => 
      !selectedNodeIds.includes(e.sourceId) && !selectedNodeIds.includes(e.targetId)
    ));
    saveHistory(newNodes);
    setSelectedNodeIds([]);
    toast.success(t('canvas.nodesDeleted', { count: selectedNodeIds.length }));
  }, [selectedNodeIds, nodes, edges, saveHistory]);

  const handleDuplicateSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;

    const newNodes: Node[] = selectedNodeIds
      .map((nodeId, index) => {
        const selectedNode = nodes.find(n => n.id === nodeId);
        if (!selectedNode) return null;
        
        const position = calculateDuplicatePosition(selectedNode);
        return {
          ...selectedNode,
          id: `node-${Date.now()}-${index}`,
          x: position.x,
          y: position.y,
        };
      })
      .filter((node): node is Node => node !== null);

    const updatedNodes = [...nodes, ...newNodes];
    setNodes(updatedNodes);
    saveHistory(updatedNodes);
    toast.success(t('canvas.nodesDuplicated', { count: selectedNodeIds.length }));
  }, [selectedNodeIds, nodes, saveHistory]);

  // Metadata update
  const handleMetadataUpdate = useCallback((nodeId: string, metadata: Record<string, any>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, metadata } : node
    ));
  }, []);

  const handleCopySelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;
    setCopiedNodeIds(selectedNodeIds);
    toast.success(t('canvas.nodesCopied', { count: selectedNodeIds.length }));
  }, [selectedNodeIds]);

  const handlePasteNodes = useCallback(() => {
    if (copiedNodeIds.length === 0) return;

    const newNodes: Node[] = copiedNodeIds
      .map((nodeId, index) => {
        const copiedNode = nodes.find(n => n.id === nodeId);
        if (!copiedNode) return null;
        
        const position = calculatePastePosition(copiedNode);
        return {
          ...copiedNode,
          id: `node-${Date.now()}-${index}`,
          x: position.x,
          y: position.y,
        };
      })
      .filter((node): node is Node => node !== null);
    
    if (newNodes.length === 0) return;

    const updatedNodes = [...nodes, ...newNodes];
    setNodes(updatedNodes);
    saveHistory(updatedNodes);
    setSelectedNodeIds(newNodes.map(n => n.id));
    toast.success(t('canvas.nodesPasted', { count: newNodes.length }));
  }, [copiedNodeIds, nodes, saveHistory]);

  // Node updates
  const handleNodeHeightChange = useCallback((id: string, height: number) => {
    setNodeHeights(prev => ({ ...prev, [id]: height }));
  }, []);

  const handleNodeIdChange = useCallback((oldId: string, newId: string) => {
    if (nodes.some(n => n.id === newId && n.id !== oldId)) {
      toast.error(t('canvas.idExists'));
      return;
    }

    const updatedNodes = nodes.map(node => 
      node.id === oldId ? { ...node, id: newId } : node
    );
    
    const updatedEdges = edges.map(edge => ({
      ...edge,
      sourceId: edge.sourceId === oldId ? newId : edge.sourceId,
      targetId: edge.targetId === oldId ? newId : edge.targetId,
    }));

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    saveHistory(updatedNodes);
    
    if (selectedNodeIds.includes(oldId)) {
      setSelectedNodeIds(prev => prev.map(id => id === oldId ? newId : id));
    }

    toast.success(t('canvas.idChanged', { id: newId }));
  }, [nodes, edges, selectedNodeIds, saveHistory]);

  const handleLockSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;
    
    setNodes(prev => prev.map(node => 
      selectedNodeIds.includes(node.id)
        ? { ...node, metadata: { ...node.metadata, locked: !node.metadata?.locked } }
        : node
    ));
    toast.success(t('canvas.lockToggled', { count: selectedNodeIds.length }));
  }, [selectedNodeIds]);

  const handleDownloadSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;
    toast.success(t('canvas.nodesDownloaded', { count: selectedNodeIds.length }));
  }, [selectedNodeIds]);

  // Workspace tab management
  const createDetailWorkspace = useCallback((mixNodeId: string, selectedNodes: Node[]) => {
    const workspaceId = `workspace-${Date.now()}`;
    const workspaceName = `세부편집 #${workspaceTabs.length}`;
    
    // 선택된 노드들을 복사하여 새 워크스페이스에 배치
    const baseX = 100;
    const baseY = 100;
    const copiedNodes: Node[] = selectedNodes.map((node, index) => ({
      ...node,
      id: `${node.id}-copy-${Date.now()}-${index}`,
      x: baseX + (index * (CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING)),
      y: baseY,
    }));
    
    // 믹스 노드 생성 (복사된 노드들의 오른쪽)
    const mixNode: Node = {
      id: `mix-${Date.now()}`,
      type: 'mix',
      x: baseX + (copiedNodes.length * (CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING)),
      y: baseY,
      content: '',
      prompt: '',
      metadata: {
        connectedNodeIds: copiedNodes.map(n => n.id),
        segments: [],
        createdAt: new Date().toISOString(),
      },
    };
    
    // 엣지 생성
    const newEdges: Edge[] = copiedNodes.map(node => ({
      id: `edge-${node.id}-${mixNode.id}`,
      sourceId: node.id,
      targetId: mixNode.id,
    }));
    
    const newWorkspace: WorkspaceTab = {
      id: workspaceId,
      name: workspaceName,
      type: 'detail',
      nodes: [...copiedNodes, mixNode],
      edges: newEdges,
      createdAt: Date.now(),
    };
    
    setWorkspaceTabs(prev => [...prev, newWorkspace]);
    return workspaceId;
  }, [workspaceTabs.length]);
  
  const switchWorkspace = useCallback((workspaceId: string) => {
    // 현재 워크스페이스 저장
    const currentWorkspace = workspaceTabs.find(w => w.id === currentWorkspaceId);
    if (currentWorkspace) {
      setWorkspaceTabs(prev => prev.map(w => 
        w.id === currentWorkspaceId 
          ? { ...w, nodes, edges }
          : w
      ));
    }
    
    // 새 워크스페이스 로드
    const targetWorkspace = workspaceTabs.find(w => w.id === workspaceId);
    if (targetWorkspace) {
      setNodes(targetWorkspace.nodes);
      setEdges(targetWorkspace.edges);
      setCurrentWorkspaceId(workspaceId);
      setSelectedNodeIds([]);
      toast.success(t('canvas.switchedToWorkspace', { name: targetWorkspace.name }));
    }
  }, [workspaceTabs, currentWorkspaceId, nodes, edges]);
  
  const closeWorkspace = useCallback((workspaceId: string) => {
    // 메인 워크스페이스는 닫을 수 없음
    if (workspaceId === 'main') {
      toast.error(t('canvas.cannotCloseMain'));
      return;
    }
    
    // 현재 워크스페이스를 닫으려고 하면 메인으로 전환
    if (workspaceId === currentWorkspaceId) {
      switchWorkspace('main');
    }
    
    // 워크스페이�� 삭제
    setWorkspaceTabs(prev => prev.filter(tab => tab.id !== workspaceId));
    
    toast.success(t('canvas.detailTabClosed'));
  }, [currentWorkspaceId, switchWorkspace]);

  // 세그먼테이션 패널 열기 (NodeCard에서 호출)
  const handleOpenSegmentPanel = useCallback((imageUrl: string) => {
    setSegmentSourceImageUrl(imageUrl);
    setIsSegmentPanelOpen(true);
    toast.success(t('canvas.segmentPanelOpened'));
  }, [t]);

  // Segment separate - 세그먼트 분리 패널 열기
  const handleSegmentSeparate = useCallback(() => {
    if (selectedNodeIds.length !== 1) {
      toast.error(t('canvas.selectOneImageNode'));
      return;
    }

    const selectedNode = nodes.find(n => n.id === selectedNodeIds[0]);
    
    if (!selectedNode) {
      toast.error(t('canvas.nodeNotFound'));
      return;
    }

    // 이미지 노드인지 확인
    if (selectedNode.type !== 'image') {
      toast.error(t('canvas.onlyImageNodes'));
      return;
    }

    // 이미지 URL 확인
    const imageUrl = selectedNode.imageUrl;
    if (!imageUrl) {
      toast.error(t('canvas.noImageInNode'));
      return;
    }

    setSegmentSourceImageUrl(imageUrl);
    setIsSegmentPanelOpen(true);
    toast.success(t('canvas.segmentPanelOpened'));
  }, [selectedNodeIds, nodes]);
  
  // Move to workspace - 선택된 노드들로 세부편집 모달 열기
  const handleMoveToWorkspace = useCallback(() => {
    if (selectedNodeIds.length === 0) {
      toast.error(t('canvas.selectNodesToMove'));
      return;
    }
    
    // 이미지 노드만 필터링
    const selectedNodes = nodes.filter(n => 
      selectedNodeIds.includes(n.id) && n.type === 'image'
    );
    
    if (selectedNodes.length === 0) {
      toast.error(t('canvas.onlyImageNodesToMove'));
      return;
    }
    
    // 선택된 노드들을 복사하여 세부편집 모달에 배치
    const copiedNodes: Node[] = selectedNodes.map((node, index) => ({
      ...node,
      id: `${node.id}-copy`,
      x: 100 + (index * (CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING)),
      y: 100,
    }));
    
    setDetailEditNodes(copiedNodes);
    setDetailEditEdges([]);
    setDetailEditWorkspaceName(t('canvas.detailEditWorkspace'));
    setIsDetailEditModalOpen(true);
    
    toast.success(t('canvas.detailEditWorkspaceOpened'));
  }, [selectedNodeIds, nodes, t]);

  // =============== Group Management ===============
  const handleCreateGroup = useCallback((
    name: string, 
    color: import("./types").NodeGroup['color'], 
    nodeIds: string[]
  ) => {
    const newGroup: import("./types").NodeGroup = {
      id: `group-${Date.now()}`,
      name,
      color,
      nodeIds,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setGroups(prev => [...prev, newGroup]);
    toast.success(t('canvas.groupCreated', { name, count: nodeIds.length }));
  }, [t]);
  
  const handleUpdateGroup = useCallback((groupId: string, updates: Partial<import("./types").NodeGroup>) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, ...updates } : g));
    
    // 현재 편집 중인 그룹도 함께 업데이트하여 Dialog에 즉시 반영
    setEditingGroup(prev => {
      if (prev && prev.id === groupId) {
        return { ...prev, ...updates };
      }
      return prev;
    });

    // toast.success('그룹 업데이트됨'); // 중복 토스트 방지 (Dialog 내부에서 처리)
  }, []);
  
  const handleDeleteGroup = useCallback((groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    toast.success(t('canvas.groupDeleted'));
  }, [t]);
  
  const handleAddNodesToGroup = useCallback((groupId: string, nodeIds: string[]) => {
    setGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        const updatedNodeIds = [...new Set([...g.nodeIds, ...nodeIds])];
        return { ...g, nodeIds: updatedNodeIds };
      }
      return g;
    }));
    toast.success(`${nodeIds.length}개 노드를 그룹에 추가함`);
  }, []);
  
  const handleRemoveNodesFromGroup = useCallback((groupId: string, nodeIds: string[]) => {
    setGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        const updatedNodeIds = g.nodeIds.filter(id => !nodeIds.includes(id));
        return { ...g, nodeIds: updatedNodeIds };
      }
      return g;
    }));
    toast.success(`${nodeIds.length}개 노드를 그룹에서 제거함`);
  }, []);
  
  // 선택된 노드들을 그룹으로 묶기 (Ctrl+G 단축키)
  const handleGroupSelected = useCallback(() => {
    if (selectedNodeIds.length < 2) {
      toast.error('그룹을 만들려면 최소 2개의 노드를 선택해야 합니다');
      return;
    }
    
    setEditingGroup(null); // 새 그룹 생성
    setIsGroupEditOpen(true);
  }, [selectedNodeIds]);

  // 그룹 편집 다이얼로그 열기
  const handleEditGroup = useCallback((group: import("./types").NodeGroup) => {
    setEditingGroup(group);
    setIsGroupEditOpen(true);
  }, []);

  // 그룹 색상 토글
  const handleToggleGroupColor = useCallback((color: string) => {
    setActiveGroupColors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(color)) {
        newSet.delete(color);
      } else {
        newSet.add(color);
      }
      return newSet;
    });
  }, []);

  // 모든 그룹 표시
  const handleShowAllGroups = useCallback(() => {
    setActiveGroupColors(new Set());
  }, []);

  // 그룹 드래그 - 그룹에 속한 모든 노드 이동
  const handleDragGroup = useCallback((groupId: string, deltaX: number, deltaY: number) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    setNodes(prevNodes => 
      prevNodes.map(node => {
        if (group.nodeIds.includes(node.id)) {
          return {
            ...node,
            x: node.x + deltaX,
            y: node.y + deltaY,
          };
        }
        return node;
      })
    );
  }, [groups]);

  // AI로 그룹 상징 생성
  const handleGenerateSymbol = useCallback(async (groupId: string, imageNodeIds: string[]) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    // Unsplash에서 임의 이미지 생성 (타임스탬프로 매번 다른 이미지)
    // 그룹 이름을 검색어로 활용하되, 공백을 쉼표로 변경
    const searchQuery = (group.name || 'abstract art design').replace(/\s+/g, ',');
    const timestamp = Date.now();
    const imageUrl = `https://source.unsplash.com/800x800/?${searchQuery}&t=${timestamp}`;
    
    const mockDescription = `"${group.name}"은(는) ${group.nodeIds.length}개의 노드로 구성된 워크플로우 그룹입니다.`;

    const updatedGroup = { 
      ...group, 
      symbolImage: imageUrl,
      // 히스토리에 새 이미지 추가 (최신순)
      symbolImageHistory: [imageUrl, ...(group.symbolImageHistory || [])],
      description: mockDescription,
      updatedAt: Date.now(),
    };

    setGroups(prev => prev.map(g => g.id === groupId ? updatedGroup : g));
    
    // editingGroup도 업데이트하여 Dialog UI 즉시 반영
    if (editingGroup?.id === groupId) {
      setEditingGroup(updatedGroup);
    }
  }, [groups, editingGroup]);

  // Composition nodes - 선택된 노드들을 컴포지션하여 새로운 노드 생성
  const handleCompositionNodes = useCallback(() => {
    if (selectedNodeIds.length < 2) {
      toast.error("컴포지션(composition) 노드를 생성하려면 노드를 2개 이상 선택해야합니다.");
      return;
    }

    // 선택된 노드들의 중심 위치 계산
    const selectedNodes = nodes.filter(n => selectedNodeIds.includes(n.id));
    const avgX = selectedNodes.reduce((sum, n) => sum + n.x, 0) / selectedNodes.length;
    const avgY = selectedNodes.reduce((sum, n) => sum + n.y, 0) / selectedNodes.length;

    // Mock 세그먼트 데이터 (시안용) - 실제로는 세그먼트 추출 API 호출
    const getMockSegments = (nodeId: string) => {
      if (nodeId === 'node-3') {
        // node-3은 3개의 세그먼트를 가지고 있다고 가정 (소파, 의자, 샹들리에)
        return [
          {
            id: `${nodeId}-segment-1`,
            name: '소파',
            nodeName: nodeId,
            thumbnailUrl: 'https://images.unsplash.com/photo-1759722668253-1767030ad9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
            visible: true,
          },
          {
            id: `${nodeId}-segment-2`,
            name: '의자',
            nodeName: nodeId,
            thumbnailUrl: 'https://images.unsplash.com/photo-1761052180945-9fcefc9a07d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
            visible: true,
          },
          {
            id: `${nodeId}-segment-3`,
            name: '샹들리에',
            nodeName: nodeId,
            thumbnailUrl: 'https://images.unsplash.com/photo-1684163627776-50b94a9ac58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
            visible: true,
          },
        ];
      } else if (nodeId === 'node-5') {
        // node-5는 2개의 세그먼트를 가지고 있다고 가정
        return [
          {
            id: `${nodeId}-segment-1`,
            name: '벽',
            nodeName: nodeId,
            thumbnailUrl: 'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
            visible: true,
          },
          {
            id: `${nodeId}-segment-2`,
            name: '바닥',
            nodeName: nodeId,
            thumbnailUrl: 'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
            visible: true,
          },
        ];
      }
      // 기본: 노드 자체를 1개 세그먼트로
      return [
        {
          id: `${nodeId}-segment-1`,
          name: `세그먼트`,
          nodeName: nodeId,
          thumbnailUrl: undefined,
          visible: true,
        },
      ];
    };

    // 선택된 노드들에서 세그먼트 정보 수집
    const segments = selectedNodes.flatMap((node, nodeIndex) => {
      const nodeSegments = getMockSegments(node.id);
      return nodeSegments.map((seg, segIndex) => ({
        ...seg,
        order: nodeIndex * 10 + segIndex, // 노드별로 순서 구분
      }));
    });

    // 컴포지션 노드 생성 (선택된 노드들의 오른쪽에 배치)
    const maxX = Math.max(...selectedNodes.map(n => n.x));
    const compositionNodeId = `node-${Date.now()}`;
    
    // 세부편집 워크스페이스 생성
    const workspaceId = createDetailWorkspace(compositionNodeId, selectedNodes);
    
    const compositionNode: Node = {
      id: compositionNodeId,
      type: 'composition',
      x: maxX + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: avgY,
      content: '',
      prompt: '',
      metadata: {
        segments,
        sourceNodeIds: selectedNodeIds,
        workspaceId,
      },
    };

    setNodes(prev => [...prev, compositionNode]);
    
    // 선택된 노드들에서 새 컴포지션 노드로 엣지 생성
    const newEdges: Edge[] = selectedNodeIds.map(sourceId => ({
      id: `edge-${sourceId}-${compositionNodeId}`,
      sourceId: sourceId,
      targetId: compositionNodeId,
    }));
    
    setEdges(prev => [...prev, ...newEdges]);
    
    // 컴포지션 노드 선택
    setSelectedNodeIds([compositionNodeId]);
    
    toast.success(`컴포지션 노드 생성됨 (${segments.length}개 세그먼트)`);
  }, [selectedNodeIds, nodes, createDetailWorkspace]);

  // Mix node create (파일 첨부용) - 빈 믹스 노드 생성
  const handleMixNodeCreate = useCallback(() => {
    // 캔버스 중앙에 믹스 노드 생성
    const position = calculateNodePosition(nodes);
    const mixNodeId = `node-${Date.now()}`;
    
    // 빈 믹스 노드 생성 (사용자가 이미지를 추가할 수 있도록)
    const mixNode: Node = {
      id: mixNodeId,
      type: 'mix',
      x: position.x,
      y: position.y,
      content: '',
      prompt: '',
      metadata: {
        connectedNodeIds: [],
        createdAt: new Date().toISOString(),
      },
    };

    const updatedNodes = [...nodes, mixNode];
    setNodes(updatedNodes);
    saveHistory(updatedNodes);
    setSelectedNodeIds([mixNode.id]);
    
    toast.success('믹스 노드가 생성되었습니다. 이미지를 업로드해주세요.');
  }, [nodes, saveHistory]);

  // Mix nodes - 선택된 노드들을 믹스하여 새로운 노드 생성
  const handleMixNodes = useCallback(() => {
    if (selectedNodeIds.length === 0) {
      toast.error("믹스(mix) 노드를 생성하려면 노드를 선택해야합니다.");
      return;
    }

    // 선택된 노드들의 중심 위치 계산
    const selectedNodes = nodes.filter(n => selectedNodeIds.includes(n.id));
    const avgX = selectedNodes.reduce((sum, n) => sum + n.x, 0) / selectedNodes.length;
    const avgY = selectedNodes.reduce((sum, n) => sum + n.y, 0) / selectedNodes.length;

    // 믹스 노드 초기 세그먼트 구성
    const initialMixSegments: any[] = [];
    
    // Main Reference
    if (selectedNodes[0]) {
      initialMixSegments.push({
        id: `main-${selectedNodes[0].id}`,
        name: t('mix.mainReference'),
        type: "main",
        thumbnailUrl: selectedNodes[0].imageUrl,
        visible: true,
        weight: 0.5,
      });
    }
    
    // Added Reference
    if (selectedNodes[1]) {
      initialMixSegments.push({
        id: `source-${selectedNodes[1].id}`,
        name: t('mix.addedReference'),
        type: "source",
        thumbnailUrl: selectedNodes[1].imageUrl,
        visible: true,
        weight: 0.5,
      });
    } else {
      // 2번째 노드가 없으면 빈 슬롯 추가
      initialMixSegments.push({
        id: "source-empty",
        name: t('mix.addedReference'),
        type: "source",
        thumbnailUrl: undefined,
        visible: true,
        weight: 0.5,
      });
    }

    // 선택된 노드들에서 세그먼트 정보 수집
    const segments = selectedNodes.flatMap((node, nodeIndex) => {
      const nodeSegments: any[] = [];
      return nodeSegments.map((seg, segIndex) => ({
        ...seg,
        order: nodeIndex * 10 + segIndex, // 노드별로 순서 구���
      }));
    });

    // 믹스 노드 생성 (선택된 노드들의 오른쪽에 배치)
    const maxX = Math.max(...selectedNodes.map(n => n.x));
    const mixNodeId = `node-${Date.now()}`;
    
    // 세부편집 워크스페이스 생성 (필요 시 사용)
    const workspaceId = createDetailWorkspace(mixNodeId, selectedNodes);
    
    const mixNode: Node = {
      id: mixNodeId,
      type: 'mix',
      x: maxX + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: avgY,
      content: '',
      prompt: '',
      workspaceId: workspaceId,
      metadata: {
        connectedNodeIds: selectedNodeIds,
        segments: initialMixSegments,
        createdAt: new Date().toISOString(),
      },
    };

    // 선택된 노드들에서 믹스 노드로 연결하는 엣지 생성
    const newEdges: Edge[] = selectedNodeIds.map(nodeId => ({
      id: `edge-${nodeId}-${mixNode.id}`,
      sourceId: nodeId,
      targetId: mixNode.id,
    }));

    const updatedNodes = [...nodes, mixNode];
    setNodes(updatedNodes);
    setEdges([...edges, ...newEdges]);
    saveHistory(updatedNodes);
    setSelectedNodeIds([mixNode.id]);
    
    toast.success(t('canvas.mixNodeCreated'));
  }, [selectedNodeIds, nodes, edges, saveHistory, createDetailWorkspace, t]);

  // Keyboard shortcuts
  useCanvasShortcuts({
    activeTool,
    onToolChange: handleToolChange,
    onDeleteSelected: handleDeleteSelected,
    onDuplicateSelected: handleDuplicateSelected,
    onCopy: handleCopySelected,
    onPaste: handlePasteNodes,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onGroupSelected: handleGroupSelected,
  });

  // Turn Into menu handlers
  const handleTurnIntoText = useCallback((node: Node) => {
    turnIntoText(node);
    setTurnIntoMenuNodeId(null);
  }, [turnIntoText]);

  const handleTurnIntoImage = useCallback((node: Node) => {
    turnIntoImage(node);
    setTurnIntoMenuNodeId(null);
  }, [turnIntoImage]);

  const handleTurnIntoVideo = useCallback((node: Node) => {
    turnIntoVideo(node);
    setTurnIntoMenuNodeId(null);
  }, [turnIntoVideo]);

  // Drag and Drop for images
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!canvasRef.current) return;

    // 세그먼트 드롭 처리
    const segmentDataStr = e.dataTransfer.getData('application/react-flow-segment');
    if (segmentDataStr) {
      try {
        const segmentData = JSON.parse(segmentDataStr);
        const rect = canvasRef.current.getBoundingClientRect();
        const dropX = (e.clientX - rect.left - panOffset.x) / zoom;
        const dropY = (e.clientY - rect.top - panOffset.y) / zoom;

        const newNode: Node = {
          id: `node-${Date.now()}`,
          type: 'image',
          x: dropX - (CANVAS_CONSTANTS.NODE_WIDTH / 2),
          y: dropY - (CANVAS_CONSTANTS.NODE_HEIGHT / 2),
          imageUrl: segmentData.imageUrl, // 실제 구현 시에는 크롭된 이미지 URL 사용 권장
          content: '',
          prompt: `${segmentData.segmentName}`,
          metadata: {
            model: selectedModel,
            ratio: selectedRatio,
            createdAt: new Date().toISOString(),
            cropBounds: segmentData.cropBounds,
            sourceSegmentId: segmentData.segmentId,
            isSegmentExtracted: true
          }
        };

        setNodes(prev => [...prev, newNode]);
        
        // 원본 노드와 연결된 엣지 생성
        if (segmentData.sourceNodeId) {
          const newEdge: Edge = {
            id: `edge-${segmentData.sourceNodeId}-${newNode.id}`,
            sourceId: segmentData.sourceNodeId,
            targetId: newNode.id,
          };
          setEdges(prev => [...prev, newEdge]);
        }
        
        saveHistory([...nodes, newNode]);
        toast.success(`세그먼트 노드 생성됨: ${segmentData.segmentName}`);
        return;
      } catch (err) {
        console.error("Failed to parse segment data", err);
      }
    }

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const dropX = (e.clientX - rect.left - panOffset.x) / zoom;
    const dropY = (e.clientY - rect.top - panOffset.y) / zoom;

    const newNodes: Node[] = imageFiles.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      // 위치를 조금씩 겹치지 않게 배치
      const x = dropX + (index * 40);
      const y = dropY + (index * 40);

      return {
        id: `node-${Date.now()}-${index}`,
        type: 'image',
        x,
        y,
        imageUrl,
        content: '',
        prompt: file.name,
        metadata: {
          model: selectedModel,
          ratio: selectedRatio,
          createdAt: new Date().toISOString(),
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }
      };
    });

    setNodes(prev => [...prev, ...newNodes]);
    saveHistory([...nodes, ...newNodes]);
    
    toast.success(`${newNodes.length}개의 이미지가 추가되었습니다.`);
  }, [panOffset, zoom, selectedModel, selectedRatio, nodes, saveHistory]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={canvasRef}
        className="absolute inset-0"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={handleCanvasRightClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          cursor: isPanning ? 'grabbing' : activeTool === 'hand' ? 'grab' : activeTool === 'node' ? 'crosshair' : activeTool === 'comment' ? 'crosshair' : 'default',
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-glass-border) 1px, transparent 1px)`,
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
          }}
        />

        <div
          className="absolute"
          style={{
            width: `${CANVAS_CONSTANTS.CANVAS_WIDTH}px`,
            height: `${CANVAS_CONSTANTS.CANVAS_HEIGHT}px`,
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            transition: isPanning ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* 그룹 오버레이 - 노드 아래에 렌더링 */}
          {groups.length > 0 && (
            <NodeGroupOverlay
              groups={groups}
              nodes={renderedNodes}
              zoom={zoom}
              onGroupClick={handleEditGroup}
              activeGroupColors={activeGroupColors}
              onToggleGroupColor={handleToggleGroupColor}
              onShowAllGroups={handleShowAllGroups}
              onDragGroup={handleDragGroup}
              onUpdateGroup={handleUpdateGroup}
            />
          )}

          <NodeEdgesContainer
            edges={edges}
            nodes={renderedNodes}
            nodeHeights={nodeHeights}
          />

          {renderedNodes.length > 0 ? (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: Z_INDEX.NODES }}>
              {renderedNodes.map((node) => {
                const isSelected = selectedNodeIds.includes(node.id);
                const isSingleSelected = selectedNodeIds.length === 1 && isSelected;
                const nodeHeight = nodeHeights[node.id] || CANVAS_CONSTANTS.NODE_HEIGHT;

                // 노드가 속한 그룹 찾기
                const nodeGroups = groups.filter(g => g.nodeIds.includes(node.id));
                const isFilterActive = activeGroupColors.size > 0;
                const isNodeInActiveGroup = nodeGroups.some(g => activeGroupColors.has(g.color));
                const shouldDimNode = isFilterActive && !isNodeInActiveGroup;

                return (
                  <div
                    key={node.id}
                    className="absolute pointer-events-auto group node-card transition-opacity duration-200"
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: `${CANVAS_CONSTANTS.NODE_WIDTH}px`,
                      opacity: shouldDimNode ? 0.2 : 1,
                      pointerEvents: shouldDimNode ? 'none' : 'auto',
                      // Add transition for smooth visual shift
                      transition: 'top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.1s, opacity 0.2s'
                    }}
                  >
                    {/* FloatingToolbar - 노드 상단 16px 위 */}
                    {isSingleSelected && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2" 
                        style={{ 
                          top: '-52px',
                          zIndex: Z_INDEX.FLOATING_TOOLBAR 
                        }}
                      >
                        <FloatingToolbar
                          nodeType={node.type}
                          selectedModel={selectedModel}
                          selectedRatio={selectedRatio}
                          repeatCount={repeatCount}
                          selectedSound={selectedSound}
                          videoLength={videoLength}
                          onModelChange={setSelectedModel}
                          onRatioChange={setSelectedRatio}
                          onRepeatCountChange={setRepeatCount}
                          onSoundChange={setSelectedSound}
                          onVideoLengthChange={setVideoLength}
                        />
                      </div>
                    )}

                    <NodeCard
                      id={node.id}
                      type={node.type}
                      content={node.content}
                      imageUrl={node.imageUrl}
                      videoUrl={node.videoUrl}
                      prompt={node.prompt}
                      isOutput={node.isOutput}
                      segments={node.segments}
                      metadata={node.metadata}
                      isSelected={isSelected}
                      onDelete={handleDeleteNode}
                      onAddNode={handleAddNodeFromNode}
                      onSelect={handleNodeSelect}
                      onDragStart={handleNodeDragStart}
                      onGenerate={handleGenerateNode}
                      onIdChange={handleNodeIdChange}
                      onHeightChange={handleNodeHeightChange}
                      onExtractSegment={handleExtractSegment}
                      onOpenSegmentPanel={handleOpenSegmentPanel}
                      onMetadataUpdate={handleMetadataUpdate}
                      groups={groups}
                      onAddToGroup={handleAddNodesToGroup}
                      onRemoveFromGroup={handleRemoveNodesFromGroup}
                    />

                    {/* 생성하기 버튼 - 노드 하단 8px 아래 */}
                    {isSingleSelected && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{ 
                          top: `${nodeHeight + 8}px`,
                          zIndex: Z_INDEX.FLOATING_TOOLBAR 
                        }}
                      >
                        <Button
                          onClick={() => handleGenerateNode(node.id)}
                          className="group rounded-full h-10 min-w-[96px] px-4 gap-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-all duration-200 mt-1"
                        >
                          <IconSparkles 
                            size={16} 
                            className="group-hover:text-secondary-foreground transition-colors duration-200"
                            color="currentColor"
                          />
                          <span className="font-bold group-hover:text-secondary-foreground transition-colors duration-200">생성하기</span>
                        </Button>
                      </div>
                    )}

                    {/* TurnIntoMenu - 노드 우측 중앙 */}
                    {isSingleSelected && (
                      <div 
                        className="absolute left-full ml-4" 
                        style={{ 
                          top: `${nodeHeight / 2}px`,
                          transform: 'translateY(-50%)',
                          zIndex: Z_INDEX.FLOATING_TOOLBAR 
                        }}
                      >
                        <button
                          className="w-7 h-7 rounded-full flex items-center justify-center border-[0.5px] border-solid transition-all duration-200 hover:scale-110"
                          style={{
                            backgroundColor: 'var(--color-glass-bg)',
                            backdropFilter: 'blur(var(--blur-glass))',
                            WebkitBackdropFilter: 'blur(var(--blur-glass))',
                            borderColor: 'var(--color-glass-border)',
                            boxShadow: 'var(--glass-shadow)',
                          }}
                          onClick={() => setTurnIntoMenuNodeId(node.id)}
                          aria-label="Turn into"
                          type="button"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyCanvas />
          )}

          {isSelecting && selectionBox && (
            <SelectionBox 
              selectionBox={selectionBox} 
              zoom={zoom} 
              panOffset={panOffset} 
            />
          )}

          {/* 코멘트 핀 렌더링 */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: Z_INDEX.COMMENTS }}>
            {comments.map((comment) => (
              <CommentPin
                key={comment.id}
                comment={comment}
                zoom={zoom}
                onSave={(content) => updateComment(comment.id, content)}
                onCancel={() => cancelComment(comment.id)}
                onToggleExpand={() => toggleCommentExpanded(comment.id)}
                onUpdatePosition={(x, y) => updateCommentPosition(comment.id, x, y)}
              />
            ))}
          </div>
        </div>
      </div>

      <AIAssistantToolbar 
        isVisible={selectedNodeIds.length > 0}
        selectedNodeCount={selectedNodeIds.length}
        onMixNodes={handleMixNodes}
        onCompositionNodes={handleCompositionNodes}
        onGroupNodes={() => {
          setEditingGroup(null);
          setIsGroupEditOpen(true);
        }}
      />
      
      <TopToolbar 
        activeTool={activeTool} 
        onToolChange={handleToolChange}
        selectedNodeCount={selectedNodeIds.length}
        onDeleteSelected={handleDeleteSelected}
        onLockSelected={handleLockSelected}
        onDownloadSelected={handleDownloadSelected}
        onSegmentSeparate={handleSegmentSeparate}
        onMoveToWorkspace={handleMoveToWorkspace}
      />

      <ZoomControls 
        zoom={zoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onZoomReset={handleZoomReset} 
      />

      <LeftToolbar 
        activeTool={activeTool} 
        onToolChange={handleToolChange} 
        onFilesClick={handleFilesClick} 
        onGalleryClick={handleGalleryClick}
        onNodeCreate={(type) => handleAddNode(type)}
      />

      <GenerationInput 
        visible={isChatBarVisible}
        onHide={() => setIsChatBarVisible(false)}
        onShow={() => setIsChatBarVisible(true)}
        onMixNodeCreate={handleMixNodeCreate}
      />


      <SegmentationPanel
        isOpen={isSegmentPanelOpen}
        onClose={() => {
          setIsSegmentPanelOpen(false);
          setSegmentSourceImageUrl(undefined);
        }}
        sourceImageUrl={segmentSourceImageUrl}
        onCreateNode={handleCreateCroppedNode}
      />

      <FileUploadPanel 
        isOpen={isFileUploadOpen} 
        onClose={handleFileUploadClose} 
      />

      <GalleryPanel 
        isOpen={isGalleryOpen} 
        onClose={handleGalleryClose} 
      />

      {contextMenu && (
        <NodeContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          selectedNodeCount={selectedNodeIds.length}
          onSelectType={handleContextMenuSelectType}
          onClose={handleContextMenuClose}
          onMixNodes={handleMixNodes}
        />
      )}

      {/* TurnIntoMenu - 전역 렌더링 */}
      {turnIntoMenuNodeId && (() => {
        const node = renderedNodes.find(n => n.id === turnIntoMenuNodeId);
        if (!node) return null;
        
        const nodeHeight = nodeHeights[node.id] || CANVAS_CONSTANTS.NODE_HEIGHT;
        const buttonX = (node.x + CANVAS_CONSTANTS.NODE_WIDTH + 16) * zoom + panOffset.x;
        const buttonY = (node.y + nodeHeight / 2) * zoom + panOffset.y;
        
        return (
          <div 
            className="fixed"
            style={{ 
              left: `${buttonX}px`,
              top: `${buttonY}px`,
              transform: 'translateY(-50%)',
              zIndex: Z_INDEX.FLOATING_TOOLBAR 
            }}
          >
            <TurnIntoMenu
              node={node}
              isOpen={true}
              onOpenChange={(open) => setTurnIntoMenuNodeId(open ? node.id : null)}
              onTurnIntoText={handleTurnIntoText}
              onTurnIntoImage={handleTurnIntoImage}
              onTurnIntoVideo={handleTurnIntoVideo}
              onMixNodes={handleMixNodes}
            />
          </div>
        );
      })()}

      {/* 세부편집 모달 */}
      {isDetailEditModalOpen && (
        <DetailEditModal
          nodes={detailEditNodes}
          edges={detailEditEdges}
          workspaceName={detailEditWorkspaceName}
          onClose={() => setIsDetailEditModalOpen(false)}
          onNodesChange={(nodes) => setDetailEditNodes(nodes)}
          onEdgesChange={(edges) => setDetailEditEdges(edges)}
        />
      )}

      {/* 그룹 편집 Dialog */}
      <GroupEditDialog
        isOpen={isGroupEditOpen}
        onClose={() => {
          setIsGroupEditOpen(false);
          setEditingGroup(null);
        }}
        group={editingGroup}
        nodes={nodes}
        selectedNodeIds={selectedNodeIds}
        onCreateGroup={handleCreateGroup}
        onUpdateGroup={handleUpdateGroup}
        onDeleteGroup={handleDeleteGroup}
        onAddNodesToGroup={handleAddNodesToGroup}
        onRemoveNodesFromGroup={handleRemoveNodesFromGroup}
        onGenerateSymbol={handleGenerateSymbol}
      />
    </div>
  );
}
