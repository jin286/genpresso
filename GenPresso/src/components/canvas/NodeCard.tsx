import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { toast } from "sonner@2.0.3";
import { NodeHeader } from "./nodes/NodeHeader";
import { TextNode } from "./nodes/TextNode";
import { ImageNode } from "./nodes/ImageNode";
import { VideoNode } from "./nodes/VideoNode";
import { ProcessNode } from "./nodes/ProcessNode";
import { MixNode } from "./nodes/MixNode";
import { CompositionNode } from "./nodes/CompositionNode";
import { GroupQuickSelect } from "./GroupQuickSelect";
import { getNodeBadgeStyles, getGlassStyles, calculateIdInputWidth, NODE_WIDTH, cn } from "./nodes/node-styles";
import { NODE_TYPE_LABELS, ID_INPUT_CONSTANTS } from "./constants";
import { isDragThresholdExceeded } from "./utils";
import { useLanguage } from "../../contexts/LanguageContext";

import type { Segment, NodeGroup } from "./types";

export type NodeType = "text" | "image" | "video" | "process" | "mix" | "composition";

interface NodeCardProps {
  id: string;
  type: NodeType;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  prompt?: string;
  isOutput?: boolean;
  segments?: Segment[];
  metadata?: Record<string, any>;
  connectedInputCount?: number;
  isSelected?: boolean;
  onDelete?: (id: string) => void;
  onAddNode?: (sourceId: string, targetType: NodeType) => void;
  onSelect?: (id: string, isCtrlKey: boolean) => void;
  onDragStart?: (nodeId: string, clientX: number, clientY: number) => void;
  onIdChange?: (oldId: string, newId: string) => void;
  onHeightChange?: (id: string, height: number) => void;
  onGenerate?: (id: string) => void;
  onExtractSegment?: (nodeId: string, segmentId: string) => void;
  onOpenSegmentPanel?: (imageUrl: string) => void;
  onMetadataUpdate?: (id: string, metadata: Record<string, any>) => void;
  groups?: NodeGroup[];
  onAddToGroup?: (groupId: string, nodeIds: string[]) => void;
  onRemoveFromGroup?: (groupId: string, nodeIds: string[]) => void;
}

export const NodeCard = React.memo(function NodeCard({
  id,
  type,
  content,
  imageUrl,
  videoUrl,
  prompt = "",
  isOutput = false,
  segments = [],
  metadata = {},
  connectedInputCount = 0,
  isSelected = false,
  onDelete,
  onAddNode,
  onSelect,
  onDragStart,
  onIdChange,
  onHeightChange,
  onGenerate,
  onExtractSegment,
  onOpenSegmentPanel,
  onMetadataUpdate,
  groups = [],
  onAddToGroup,
  onRemoveFromGroup,
}: NodeCardProps) {
  const { t } = useLanguage();
  const nodeCardRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isEditingId, setIsEditingId] = useState(false);
  const [editedId, setEditedId] = useState(id);
  const [textContent, setTextContent] = useState(content || "");
  const [promptText, setPromptText] = useState("");
  const [selectedFrame, setSelectedFrame] = useState<
    "start" | "end" | "style" | null
  >(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSegmentActive, setIsSegmentActive] = useState(false);
  // nodeSegments state removed - using prop directly
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: number;
    type: string;
    url: string;
  } | null>(null);

  useEffect(() => setEditedId(id), [id]);
  useEffect(() => setTextContent(content || ""), [content]);
  // useEffect for nodeSegments removed

  // ResizeObserver로 모든 높이 변화를 감지 (중복 useEffect 제거)
  useEffect(() => {
    const element = nodeCardRef.current;
    if (!element || !onHeightChange) return;

    let lastHeight = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        // 높이가 실제로 변경된 경우에만 콜백 호출
        if (Math.abs(height - lastHeight) > 1) {
          lastHeight = height;
          onHeightChange(id, height);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
    // onHeightChange를 dependency에서 제거하여 무한 루프 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLockToggle = useCallback(() => {
    setIsLocked(prev => !prev);
    toast.success(isLocked ? t('node.unlock') : t('node.lock'));
  }, [isLocked, t]);

  const handleDelete = useCallback(() => {
    if (isLocked) {
      toast.error(t('node.cannotDeleteLocked'));
      return;
    }
    onDelete?.(id);
    toast.success(t('node.deleted'));
  }, [isLocked, onDelete, id, t]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isEditingId || (e.target as HTMLElement).tagName === "INPUT") return;
    setIsDragging(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    if (onDragStart) onDragStart(id, e.clientX, e.clientY);
  }, [isEditingId, onDragStart, id]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (
      isDragging &&
      !isDragThresholdExceeded(dragStartPos.x, dragStartPos.y, e.clientX, e.clientY)
    ) {
      const isCtrlKey = e.ctrlKey || e.metaKey;
      onSelect?.(id, isCtrlKey);
    }
    setIsDragging(false);
  }, [isDragging, dragStartPos, onSelect, id]);

  const handleIdDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingId(true);
  }, []);

  const handleIdBlur = useCallback(() => {
    if (editedId.trim() && editedId !== id) {
      onIdChange?.(id, editedId.trim());
    } else {
      setEditedId(id);
    }
    setIsEditingId(false);
  }, [editedId, id, onIdChange]);

  const handleIdKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setEditedId(id);
      setIsEditingId(false);
    }
  }, [id]);

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked(prev => !prev);
    toast.success(isBookmarked ? t('node.unbookmarked') : t('node.bookmarked'));
  }, [isBookmarked, t]);

  const handleFullView = useCallback(() => {
    toast.success(t('node.viewFull'));
  }, [t]);

  const handleExpandToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleSegmentsChange = useCallback((segments: any[]) => {
    // Mix Node의 세그먼트 상태 변경을 metadata에 저장
    if (onMetadataUpdate) {
      onMetadataUpdate(id, {
        ...metadata,
        segments,
      });
    }
  }, [id, metadata, onMetadataUpdate]);

  const handleSegmentToggle = useCallback(() => {
    // 세그먼테이션 패널을 여는 대신 노드 상의 오버레이만 토글하도록 변경
    setIsSegmentActive(prev => {
      const newState = !prev;
      
      if (newState && segments.length === 0) {
        toast.info(t('node.noSegments'));
        return false;
      }
      
      if (newState) {
        toast.success(t('node.segmentsActivated'));
      } else {
        toast.success(t('node.segmentsDeactivated'));
      }
      return newState;
    });
  }, [segments.length, t]);

  const handleSegmentExtract = useCallback((segmentId: string) => {
    onExtractSegment?.(id, segmentId);
  }, [id, onExtractSegment]);

  const handleFileAttach = useCallback((file: {
    name: string;
    size: number;
    type: string;
    url: string;
  }) => {
    setAttachedFile(file);
    toast.success(t('node.fileAttached', { name: file.name }));
  }, [t]);

  const badgeStyle = useMemo(() => getNodeBadgeStyles(type), [type]);
  const glassStyle = useMemo(() => getGlassStyles(isSelected), [isSelected]);
  const idInputWidth = useMemo(
    () => calculateIdInputWidth(editedId, ID_INPUT_CONSTANTS.MIN_WIDTH, ID_INPUT_CONSTANTS.CHAR_WIDTH),
    [editedId]
  );

  // 노드가 속한 그룹들 찾기
  const nodeGroups = useMemo(() => groups.filter(g => g.nodeIds.includes(id)), [groups, id]);

  // 그룹 색상 매핑
  const groupColorMap: Record<string, string> = {
    yellow: '#eab308',
    blue: '#3b82f6',
    pink: '#ec4899',
    green: '#22c55e',
    purple: '#a855f7',
    orange: '#f97316',
    cyan: '#06b6d4',
    red: '#ef4444',
  };

  return (
    <div className="relative">
      {isEditingId ? (
        <input
          type="text"
          value={editedId}
          onChange={(e) => setEditedId(e.target.value)}
          onBlur={handleIdBlur}
          onKeyDown={handleIdKeyDown}
          autoFocus
          className="absolute -top-6 left-0 text-xs text-foreground font-mono bg-transparent border-b border-primary outline-none px-1"
          style={{ width: `${idInputWidth}px` }}
        />
      ) : (
        <span
          className={`absolute -top-6 left-0 text-xs text-muted-foreground/50 font-mono ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } flex items-center gap-0.5`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          #{id}
          


          {/* 그룹 퀵 셀렉트 - ID 라벨과 같은 높이 */}
          {onAddToGroup && onRemoveFromGroup && (
            <GroupQuickSelect
              nodeId={id}
              groups={groups}
              onAddToGroup={onAddToGroup}
              onRemoveFromGroup={onRemoveFromGroup}
            />
          )}
        </span>
      )}

      <div
        ref={nodeCardRef}
        className={cn(
          "relative flex flex-col rounded-2xl border-[0.5px] border-solid transition-all pb-1",
          NODE_WIDTH.DEFAULT,
          isDragging ? "cursor-grabbing" : "cursor-grab",
          isSelected && "ring-2 ring-primary ring-offset-2"
        )}
        style={glassStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        role="article"
        aria-label={`${NODE_TYPE_LABELS[type]} 노드 ${id}`}
        aria-selected={isSelected}
      >
        <NodeHeader
          type={type}
          isLocked={isLocked}
          onLockToggle={handleLockToggle}
          onDelete={handleDelete}
          badgeStyle={badgeStyle}
          typeLabel={NODE_TYPE_LABELS[type]}
          nodeId={id}
          groups={groups}
          onAddToGroup={onAddToGroup}
          onRemoveFromGroup={onRemoveFromGroup}
        />

        {type === "text" && (
          <TextNode 
            content={textContent} 
            onChange={setTextContent} 
            isOutput={isOutput}
            isSelected={isSelected}
            onTurnIntoImage={() => toast.success(t('node.convertToImage'))}
            onTurnIntoVideo={() => toast.success(t('node.convertToVideo'))}
            onGenerate={() => onGenerate?.(id)}
          />
        )}

        {type === "image" && (
          <ImageNode
            id={id}
            imageUrl={imageUrl}
            promptText={promptText}
            onPromptChange={setPromptText}
            isBookmarked={isBookmarked}
            onBookmarkToggle={handleBookmarkToggle}
            onFullView={handleFullView}
            isExpanded={isExpanded}
            onExpandToggle={handleExpandToggle}
            metadata={metadata}
            isSegmentActive={isSegmentActive}
            onSegmentToggle={handleSegmentToggle}
            segments={segments}
            hoveredSegmentId={hoveredSegmentId}
            onSegmentHover={setHoveredSegmentId}
            onSegmentExtract={handleSegmentExtract}
            attachedFile={attachedFile}
            onFileAttach={handleFileAttach}
            isSelected={isSelected}
            onTurnIntoText={() => toast.success(t('node.convertToText'))}
            onTurnIntoVideo={() => toast.success(t('node.convertToVideo'))}
            onGenerate={() => onGenerate?.(id)}
          />
        )}

        {type === "video" && (
          <VideoNode
            videoUrl={videoUrl}
            promptText={promptText}
            onPromptChange={setPromptText}
            selectedFrame={selectedFrame}
            onFrameSelect={setSelectedFrame}
            isSelected={isSelected}
            isBookmarked={isBookmarked}
            onBookmarkToggle={handleBookmarkToggle}
            onFullView={handleFullView}
            isExpanded={isExpanded}
            onExpandToggle={handleExpandToggle}
            metadata={metadata}
            onTurnIntoText={() => toast.success(t('node.convertToText'))}
            onTurnIntoImage={() => toast.success(t('node.convertToImage'))}
            onGenerate={() => onGenerate?.(id)}
          />
        )}

        {type === "process" && (
          <ProcessNode
            metadata={metadata}
            isExpanded={isExpanded}
            onExpandToggle={handleExpandToggle}
          />
        )}

        {type === "mix" && (
          <MixNode
            segments={metadata?.segments}
            promptText={promptText}
            onPromptChange={setPromptText}
            onGenerate={() => onGenerate?.(id)}
            onSegmentsChange={handleSegmentsChange}
          />
        )}

        {type === "composition" && (
          <CompositionNode
            segments={metadata?.segments || []}
            promptText={promptText}
            onPromptChange={setPromptText}
            onGenerate={() => onGenerate?.(id)}
            onSegmentsChange={handleSegmentsChange}
          />
        )}
      </div>
    </div>
  );
});