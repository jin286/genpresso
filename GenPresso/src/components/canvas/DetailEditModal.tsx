import React, { useState, useRef, useCallback, memo } from "react";
import { X } from "lucide-react";
import { NodeCard, type NodeType } from "./NodeCard";
import { NodeEdgesContainer } from "./NodeEdge";
import { CanvasBackground } from "./CanvasBackground";
import ZoomControls from "./ZoomControls";
import type { Node, Edge } from "./types";
import { CANVAS_CONSTANTS } from "./constants";
import { CloseButton } from "../ui/close-button";
import { getGlassmorphismStyle } from "../layout/layout-constants";

interface DetailEditModalProps {
  nodes: Node[];
  edges: Edge[];
  workspaceName: string;
  onClose: () => void;
  onNodesChange?: (nodes: Node[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
}

const DetailEditModalComponent = ({
  nodes: initialNodes,
  edges: initialEdges,
  workspaceName,
  onClose,
  onNodesChange,
  onEdgesChange,
}: DetailEditModalProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Canvas state
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [nodeHeights, setNodeHeights] = useState<Record<string, number>>({});
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  // Wheel handler for zoom and pan
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

  // Mouse down handler for panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.closest('.node-card') || target.closest('button') || target.closest('[role="dialog"]')) {
      return;
    }

    if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.metaKey))) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  }, [panOffset]);

  // Mouse move handler for panning
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  }, [isPanning, startPan]);

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);



  // Update node height
  const updateNodeHeight = useCallback((nodeId: string, height: number) => {
    setNodeHeights(prev => ({ ...prev, [nodeId]: height }));
  }, []);

  // Notify parent of changes (필요한 경우에만 활성화)
  // React.useEffect(() => {
  //   onNodesChange?.(nodes);
  // }, [nodes, onNodesChange]);

  // React.useEffect(() => {
  //   onEdgesChange?.(edges);
  // }, [edges, onEdgesChange]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="relative w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] max-w-5xl h-[90vh] rounded-2xl border-[0.5px] overflow-hidden"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b"
          style={{ 
            borderColor: 'var(--color-glass-border)',
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
          }}
        >
          <h2 className="font-semibold">{workspaceName}</h2>
          <div className="absolute right-2.5 top-2.5 z-50">
            <CloseButton onClick={onClose} size="md" />
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="absolute inset-0 top-[57px] overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >
          <CanvasBackground zoom={zoom} panOffset={panOffset} />
          
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Edges */}
            <NodeEdgesContainer
              nodes={nodes}
              edges={edges}
              nodeHeights={nodeHeights}
              zoom={zoom}
            />

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className="node-card absolute"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
              >
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
                  connectedInputCount={node.connectedInputCount}
                  isSelected={selectedNodeIds.includes(node.id)}
                  onHeightChange={updateNodeHeight}
                  onDelete={() => {
                    setNodes(prev => prev.filter(n => n.id !== node.id));
                    setEdges(prev => prev.filter(e => e.from !== node.id && e.to !== node.id));
                  }}
                  onSelect={(nodeId, isCtrl) => {
                    if (isCtrl) {
                      setSelectedNodeIds(prev => 
                        prev.includes(nodeId) 
                          ? prev.filter(id => id !== nodeId)
                          : [...prev, nodeId]
                      );
                    } else {
                      setSelectedNodeIds([nodeId]);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-50">
          <ZoomControls
            zoom={zoom}
            onZoomIn={() => setZoom(prev => Math.min(CANVAS_CONSTANTS.MAX_ZOOM, prev * 1.2))}
            onZoomOut={() => setZoom(prev => Math.max(CANVAS_CONSTANTS.MIN_ZOOM, prev / 1.2))}
            onZoomReset={() => setZoom(1)}
          />
        </div>
      </div>
    </div>
  );
};

DetailEditModalComponent.displayName = "DetailEditModal";

export const DetailEditModal = memo(DetailEditModalComponent);
