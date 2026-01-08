import { useCallback } from 'react';
import type { Node, Edge } from '../types';
import { CANVAS_CONSTANTS } from '../constants';

interface UseTurnIntoProps {
  selectedModel: string;
  selectedRatio: string;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useTurnInto({
  selectedModel,
  selectedRatio,
  setNodes,
  setEdges,
}: UseTurnIntoProps) {
  const turnIntoText = useCallback((sourceNode: Node) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'text',
      x: sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: sourceNode.y,
      content: '',
      prompt: '',
      metadata: {
        createdAt: new Date().toISOString(),
        sourceNodeIds: [sourceNode.id],
      },
    };

    setNodes(prev => [...prev, newNode]);

    const newEdge: Edge = {
      id: `edge-${sourceNode.id}-${newNode.id}`,
      sourceId: sourceNode.id,
      targetId: newNode.id,
    };

    setEdges(prev => [...prev, newEdge]);

    return newNode;
  }, [setNodes, setEdges]);

  const turnIntoImage = useCallback((sourceNode: Node) => {
    const referenceImage = sourceNode.imageUrl || sourceNode.videoUrl;
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'image',
      x: sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: sourceNode.y,
      content: '',
      prompt: '',
      metadata: {
        model: selectedModel,
        ratio: selectedRatio,
        createdAt: new Date().toISOString(),
        sourceNodeIds: [sourceNode.id],
        referenceImage: referenceImage,
      },
    };

    setNodes(prev => [...prev, newNode]);

    const newEdge: Edge = {
      id: `edge-${sourceNode.id}-${newNode.id}`,
      sourceId: sourceNode.id,
      targetId: newNode.id,
    };

    setEdges(prev => [...prev, newEdge]);

    return newNode;
  }, [selectedModel, selectedRatio, setNodes, setEdges]);

  const turnIntoVideo = useCallback((sourceNode: Node) => {
    const referenceImage = sourceNode.imageUrl || sourceNode.videoUrl;
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'video',
      x: sourceNode.x + CANVAS_CONSTANTS.NODE_WIDTH + CANVAS_CONSTANTS.HORIZONTAL_SPACING,
      y: sourceNode.y,
      content: '',
      prompt: '',
      metadata: {
        model: selectedModel,
        ratio: selectedRatio,
        duration: '5s',
        createdAt: new Date().toISOString(),
        sourceNodeIds: [sourceNode.id],
        frames: referenceImage ? [
          { id: 'frame-1', imageUrl: referenceImage, selected: true },
          { id: 'frame-2', imageUrl: referenceImage, selected: false },
          { id: 'frame-3', imageUrl: referenceImage, selected: false },
        ] : undefined,
      },
    };

    setNodes(prev => [...prev, newNode]);

    const newEdge: Edge = {
      id: `edge-${sourceNode.id}-${newNode.id}`,
      sourceId: sourceNode.id,
      targetId: newNode.id,
    };

    setEdges(prev => [...prev, newEdge]);

    return newNode;
  }, [selectedModel, selectedRatio, setNodes, setEdges]);

  return {
    turnIntoText,
    turnIntoImage,
    turnIntoVideo,
  };
}
