import { useCallback } from 'react';
import type { Node, Edge, CanvasHistory } from '../types';
import type { NodeType } from '../NodeCard';
import { 
  getConnectedInputNodes, 
  buildGenerationRequest, 
  buildVideoGenerationRequest 
} from '../NodeMetadataCollector';
import { CANVAS_CONSTANTS } from '../constants';
import { toast } from 'sonner@2.0.3';

interface UseNodeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  selectedNodeIds: string[];
  selectedModel: string;
  selectedRatio: string;
  setNodes: (value: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (value: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  setSelectedNodeIds: (value: string[] | ((prev: string[]) => string[])) => void;
  setHistory: (value: CanvasHistory[] | ((prev: CanvasHistory[]) => CanvasHistory[])) => void;
  setHistoryIndex: (value: number | ((prev: number) => number)) => void;
}

export const useNodeOperations = ({
  nodes,
  edges,
  selectedNodeIds,
  selectedModel,
  selectedRatio,
  setNodes,
  setEdges,
  setSelectedNodeIds,
  setHistory,
  setHistoryIndex,
}: UseNodeOperationsProps) => {
  
  const saveHistory = useCallback(() => {
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.push({ nodes: [...nodes], edges: [...edges] });
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [nodes, edges, setHistory, setHistoryIndex]);

  const handleAddNode = useCallback((
    type: NodeType = 'text', 
    x: number = CANVAS_CONSTANTS.INITIAL_NODE_X, 
    y: number = CANVAS_CONSTANTS.INITIAL_NODE_Y
  ) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      x,
      y,
      content: '',
      prompt: '',
      metadata: {
        model: selectedModel,
        ratio: selectedRatio,
        createdAt: new Date().toISOString(),
      },
    };
    setNodes(prev => [...prev, newNode]);
    saveHistory();
    toast.success(`${type} 노드 추가됨`);
  }, [selectedModel, selectedRatio, setNodes, saveHistory]);

  const handleDeleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(edge => edge.sourceId !== id && edge.targetId !== id));
    setSelectedNodeIds(prev => prev.filter(nodeId => nodeId !== id));
    saveHistory();
  }, [setNodes, setEdges, setSelectedNodeIds, saveHistory]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;
    
    setNodes(prev => prev.filter(node => !selectedNodeIds.includes(node.id)));
    setEdges(prev => prev.filter(edge => 
      !selectedNodeIds.includes(edge.sourceId) && 
      !selectedNodeIds.includes(edge.targetId)
    ));
    toast.success(`${selectedNodeIds.length}개 노드 삭제됨`);
    setSelectedNodeIds([]);
    saveHistory();
  }, [selectedNodeIds, setNodes, setEdges, setSelectedNodeIds, saveHistory]);

  const handleDuplicateSelected = useCallback(() => {
    if (selectedNodeIds.length === 0) return;

    const nodesToDuplicate = nodes.filter(node => selectedNodeIds.includes(node.id));
    const newNodes: Node[] = nodesToDuplicate.map(node => ({
      ...node,
      id: `node-${Date.now()}-${Math.random()}`,
      x: node.x + 50,
      y: node.y + 50,
    }));

    setNodes(prev => [...prev, ...newNodes]);
    setSelectedNodeIds(newNodes.map(n => n.id));
    toast.success(`${newNodes.length}개 노드 복제됨`);
    saveHistory();
  }, [selectedNodeIds, nodes, setNodes, setSelectedNodeIds, saveHistory]);

  const handleGenerateNode = useCallback((id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    const inputNodes = getConnectedInputNodes(id, nodes, edges);

    let generationRequest;
    if (node.type === 'video' || node.metadata?.targetType === 'video') {
      generationRequest = buildVideoGenerationRequest(
        node,
        inputNodes,
        selectedModel,
        selectedRatio
      );
    } else {
      generationRequest = buildGenerationRequest(
        node,
        inputNodes,
        selectedModel,
        selectedRatio
      );
    }

    console.log('Generation Request:', generationRequest);
    
    toast.success(`${node.type} 생성 시작`, {
      description: `모델: ${generationRequest.model} | 비율: ${generationRequest.ratio}`,
    });

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
      toast.success('생성 완료!');
    }, 3000);
  }, [nodes, edges, selectedModel, selectedRatio, setNodes]);

  const handleAddNodeFromNode = useCallback((sourceId: string, targetType: NodeType) => {
    const sourceNodes = selectedNodeIds.length > 0 
      ? nodes.filter(n => selectedNodeIds.includes(n.id))
      : nodes.filter(n => n.id === sourceId);

    if (sourceNodes.length === 0) return;

    const centerX = sourceNodes.reduce((sum, node) => sum + node.x, 0) / sourceNodes.length;
    const centerY = sourceNodes.reduce((sum, node) => sum + node.y, 0) / sourceNodes.length;

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

    const newEdges: Edge[] = sourceNodes.map(sourceNode => ({
      id: `edge-${sourceNode.id}-${newNode.id}`,
      sourceId: sourceNode.id,
      targetId: newNode.id,
    }));

    setEdges(prev => [...prev, ...newEdges]);

    if (selectedNodeIds.length > 0) {
      toast.success(`${selectedNodeIds.length}개 노드에서 ${targetType} 노드 생성`);
    } else {
      toast.success(`${targetType} 노드 추가됨`);
    }

    saveHistory();
  }, [selectedNodeIds, nodes, selectedModel, selectedRatio, setNodes, setEdges, saveHistory]);

  const handleNodeSelect = useCallback((id: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedNodeIds(prev => 
        prev.includes(id) ? prev.filter(nodeId => nodeId !== id) : [...prev, id]
      );
    } else {
      setSelectedNodeIds([id]);
    }
  }, [setSelectedNodeIds]);

  const handleNodeIdChange = useCallback((oldId: string, newId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === oldId ? { ...node, id: newId } : node
    ));
    setEdges(prev => prev.map(edge => ({
      ...edge,
      sourceId: edge.sourceId === oldId ? newId : edge.sourceId,
      targetId: edge.targetId === oldId ? newId : edge.targetId,
    })));
    setSelectedNodeIds(prev => prev.map(nodeId => 
      nodeId === oldId ? newId : nodeId
    ));
  }, [setNodes, setEdges, setSelectedNodeIds]);

  const handleNodeHeightChange = useCallback((id: string, height: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, metadata: { ...node.metadata, height } } : node
    ));
  }, [setNodes]);

  return {
    handleAddNode,
    handleDeleteNode,
    handleDeleteSelected,
    handleDuplicateSelected,
    handleGenerateNode,
    handleAddNodeFromNode,
    handleNodeSelect,
    handleNodeIdChange,
    handleNodeHeightChange,
  };
};
