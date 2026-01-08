import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../../ui/dialog";
import { VisuallyHidden } from "../../ui/visually-hidden";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { toast } from "sonner@2.0.3";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Scissors, Crop, MousePointer2, Square, Plus, Hourglass } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { SegmentViewer } from "./SegmentViewer";
import { SegmentProperties } from "./SegmentProperties";
import { SegmentListItem } from "./SegmentListItem";
import { PreviewCanvas } from "./PreviewCanvas";
import type { SegmentationData, Segment, PreviewItem, SegmentationMode } from "./types";
import { mockSegmentation, segmentToPreviewItem } from "./utils";

interface SegmentationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sourceImageUrl?: string;
  onCreateNode?: (imageUrl: string, bounds: { x: number; y: number; width: number; height: number }) => void;
}

const SegmentationPanelComponent = ({
  isOpen,
  onClose,
  sourceImageUrl,
  onCreateNode,
}: SegmentationPanelProps) => {
  const { t } = useLanguage();
  
  // 초기 상태는 빈 세그먼트로 시작 (수동 모드)
  const [segmentationData, setSegmentationData] = useState<SegmentationData>({
    id: 'init',
    sourceImageUrl: sourceImageUrl || '',
    segments: [],
    createdAt: new Date().toISOString()
  });
  
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<string[]>([]);
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'segment' | 'crop'>('segment');
  const [selectionBounds, setSelectionBounds] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Preview Canvas 상태
  const [mode, setMode] = useState<SegmentationMode>('viewer');
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
  const [canvasMode, setCanvasMode] = useState<'normal' | 'segment' | 'mix'>('segment');
  const [attachMode, setAttachMode] = useState<'attach' | 'replace'>('attach');

  // sourceImageUrl이 변경될 때마다 초기화 (자동 세그먼테이션 실행 안 함)
  useEffect(() => {
    if (isOpen && sourceImageUrl) {
      setSegmentationData({
        id: `seg-data-${Date.now()}`,
        sourceImageUrl,
        segments: [],
        createdAt: new Date().toISOString()
      });
      setSelectedSegmentIds([]);
      setHoveredSegmentId(null);
      setMode('viewer');
      setPreviewItems([]);
      setActiveTool('segment');
    }
  }, [isOpen, sourceImageUrl]);

  // 선택 영역 처리 (세그먼트 생성 또는 노드 생성)
  const handleCreateSegmentFromSelection = useCallback(() => {
    if (!selectionBounds) {
      toast.error("이미지 위에서 영역을 먼저 선택해주세요");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // activeTool에 따라 type 설정
      const type = activeTool === 'crop' ? 'crop' : 'segment';

      // 세그먼트 추가 (crop이든 segment든 동일하게 추가)
      const newSegment: Segment = {
        id: `seg-${Date.now()}`,
        name: activeTool === 'crop' ? `Crop ${segmentationData.segments.length + 1}` : `Segment ${segmentationData.segments.length + 1}`,
        maskUrl: "", 
        thumbnailUrl: sourceImageUrl || "", 
        bounds: selectionBounds,
        layer: segmentationData.segments.length + 1,
        isSelected: false,
        isFavorite: false,
        type: type // 타입 추가
      };

      setSegmentationData(prev => ({
        ...prev,
        segments: [...prev.segments, newSegment]
      }));
      
      setSelectedSegmentIds([newSegment.id]);
      setSelectionBounds(null);
      
      toast.success(activeTool === 'crop' ? "크롭 영역이 추가되었습니다" : t('segment.segmentCreated'));
      setIsProcessing(false);
    }, 1000);
  }, [selectionBounds, segmentationData.segments.length, sourceImageUrl, t, activeTool]); // onCreateNode 의존성 제거

  // 다중 선택 지원 (Shift: 범위 선택, Cmd/Ctrl: 토글)
  const handleSegmentClick = useCallback((segmentId: string, e?: React.MouseEvent) => {
    const allSegmentIds = segmentationData.segments.map((s) => s.id);

    // Shift 클릭: 범위 선택
    if (e?.shiftKey && selectedSegmentIds.length > 0) {
      const lastSelectedId = selectedSegmentIds[selectedSegmentIds.length - 1];
      const lastIndex = allSegmentIds.indexOf(lastSelectedId);
      const currentIndex = allSegmentIds.indexOf(segmentId);

      const startIndex = Math.min(lastIndex, currentIndex);
      const endIndex = Math.max(lastIndex, currentIndex);
      const rangeIds = allSegmentIds.slice(startIndex, endIndex + 1);

      setSelectedSegmentIds(Array.from(new Set([...selectedSegmentIds, ...rangeIds])));
      return;
    }

    // Cmd/Ctrl 클릭 또는 일반 클릭: 토글
    setSelectedSegmentIds((prev) =>
      prev.includes(segmentId)
        ? prev.filter((id) => id !== segmentId)
        : [...prev, segmentId]
    );
  }, [segmentationData.segments, selectedSegmentIds]);

  // 세그먼트 이름 업데이트
  const handleNameUpdate = useCallback((segmentId: string, newName: string) => {
    setSegmentationData((prev) => ({
      ...prev,
      segments: prev.segments.map((seg) =>
        seg.id === segmentId ? { ...seg, name: newName } : seg
      ),
    }));
  }, []);

  // 일괄 이름 업데이트
  const handleBatchNameUpdate = useCallback((name: string) => {
    setSegmentationData((prev) => ({
      ...prev,
      segments: prev.segments.map((s) =>
        selectedSegmentIds.includes(s.id) ? { ...s, name } : s
      ),
    }));
  }, [selectedSegmentIds]);

  // 일괄 프롬프트 업데이트
  const handleBatchPromptUpdate = useCallback((prompt: string) => {
    setSegmentationData((prev) => ({
      ...prev,
      segments: prev.segments.map((s) =>
        selectedSegmentIds.includes(s.id) ? { ...s, prompt } : s
      ),
    }));
  }, [selectedSegmentIds]);

  // 즐겨찾기 토글
  const handleFavoriteToggle = useCallback((segmentId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setSegmentationData((prev) => ({
      ...prev,
      segments: prev.segments.map((seg) =>
        seg.id === segmentId ? { ...seg, isFavorite: !seg.isFavorite } : seg
      ),
    }));

    const segment = segmentationData.segments.find((s) => s.id === segmentId);
    const newState = !segment?.isFavorite;

    toast.success(
      newState
        ? t('segment.favoriteAdded', { name: segment?.name })
        : t('segment.favoriteRemoved', { name: segment?.name })
    );
  }, [segmentationData.segments]);

  // 세그먼트 순서 변경 (드래그 앤 드롭)
  const moveSegment = useCallback((dragIndex: number, hoverIndex: number) => {
    const newSegments = [...segmentationData.segments];
    const [draggedSegment] = newSegments.splice(dragIndex, 1);
    newSegments.splice(hoverIndex, 0, draggedSegment);

    // layer 번호 자동 업데이트
    const updatedSegments = newSegments.map((seg, index) => ({
      ...seg,
      layer: index + 1,
    }));

    setSegmentationData((prev) => ({
      ...prev,
      segments: updatedSegments,
    }));
  }, [segmentationData.segments]);

  const handleDeleteSegment = useCallback((segmentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSegmentationData((prev) => ({
      ...prev,
      segments: prev.segments.filter((s) => s.id !== segmentId),
    }));
    
    if (selectedSegmentIds.includes(segmentId)) {
      setSelectedSegmentIds((prev) => prev.filter((id) => id !== segmentId));
    }

    toast.success("세그먼트가 삭제되었습니다.");
  }, [selectedSegmentIds]);

  // 선택 해제
  const handleDeselectSegment = useCallback((segmentId: string) => {
    setSelectedSegmentIds((prev) => prev.filter((id) => id !== segmentId));
  }, []);

  // 프리뷰로 보내기
  const handleSendToPreview = useCallback(() => {
    const segments = segmentationData.segments.filter((seg) =>
      selectedSegmentIds.includes(seg.id)
    );

    if (segments.length === 0) {
      toast.error(t('segment.selectSegments'));
      return;
    }

    const newItems = segments.map((seg) => segmentToPreviewItem(seg, attachMode));
    setPreviewItems((prev) => [...prev, ...newItems]);
    setMode('preview');
    toast.success(t('segment.sentToPreview', { count: segments.length }));
  }, [segmentationData.segments, selectedSegmentIds, attachMode]);

  // PreviewItem 업데이트
  const handlePreviewItemUpdate = useCallback((itemId: string, updates: Partial<PreviewItem>) => {
    setPreviewItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
  }, []);

  // PreviewItem 추가 (복제용)
  const handlePreviewItemAdd = useCallback((item: PreviewItem) => {
    setPreviewItems((prev) => [...prev, item]);
  }, []);

  // PreviewItem 삭제
  const handlePreviewItemDelete = useCallback((itemId: string) => {
    setPreviewItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Mix Node 생성
  const handleCreateMixNode = useCallback(() => {
    if (previewItems.length === 0) {
      toast.error(t('segment.noPreviewLayers'));
      return;
    }

    toast.success(t('segment.mixNodeCreated', { count: previewItems.length }));
    
    // 패널 닫기
    onClose();
  }, [previewItems.length, onClose]);

  const selectedSegments = useMemo(() => 
    segmentationData.segments.filter((seg) =>
      selectedSegmentIds.includes(seg.id)
    ),
    [segmentationData.segments, selectedSegmentIds]
  );

  // Preview 모드인 경우 PreviewCanvas 렌더링
  if (mode === 'preview') {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
          style={{
            backgroundColor: "var(--color-glass-bg)",
            backdropFilter: "blur(var(--blur-glass))",
            WebkitBackdropFilter: "blur(var(--blur-glass))",
            borderColor: "var(--color-glass-border)",
            boxShadow: "var(--glass-shadow)",
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Preview Canvas</DialogTitle>
            <DialogDescription>
              세그먼트를 배치하고 편집할 수 있습니다
            </DialogDescription>
          </VisuallyHidden>

          <PreviewCanvas
            segmentationData={segmentationData}
            previewItems={previewItems}
            canvasMode={canvasMode}
            attachMode={attachMode}
            onCanvasModeChange={setCanvasMode}
            onAttachModeChange={setAttachMode}
            onPreviewItemUpdate={handlePreviewItemUpdate}
            onPreviewItemAdd={handlePreviewItemAdd}
            onPreviewItemDelete={handlePreviewItemDelete}
            onBackToViewer={() => setMode('viewer')}
            onCreateMixNode={handleCreateMixNode}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
          style={{
            backgroundColor: "var(--color-glass-bg)",
            backdropFilter: "blur(var(--blur-glass))",
            WebkitBackdropFilter: "blur(var(--blur-glass))",
            borderColor: "var(--color-glass-border)",
            boxShadow: "var(--glass-shadow)",
          }}
        >
          <VisuallyHidden>
            <DialogTitle>세그먼테이션 뷰어</DialogTitle>
            <DialogDescription>
              이미지 세그먼트를 선택하고 편집할 수 있습니다
            </DialogDescription>
          </VisuallyHidden>

          {/* 헤더 */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ borderColor: "var(--color-glass-border)" }}
          >
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {t('segment.title')}
              </h2>
            </div>
          </div>

          {/* 메인 레이아웃 */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* 좌측: 캔버스 + 푸터 (이동됨) */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* 캔버스 영역 */}
              <div className="flex-1 relative overflow-hidden bg-muted/30">
                <SegmentViewer
                  segmentationData={{
                    ...segmentationData,
                    segments: segmentationData.segments.filter(s => (s.type || 'segment') === activeTool)
                  }}
                  selectedSegmentIds={selectedSegmentIds}
                  hoveredSegmentId={hoveredSegmentId}
                  onSegmentClick={handleSegmentClick}
                  onSegmentHover={setHoveredSegmentId}
                  activeTool={activeTool}
                  selectionBounds={selectionBounds}
                  onSelectionChange={setSelectionBounds}
                />

                {/* 상태 배지 */}
                {selectedSegmentIds.length > 0 && (
                  <div className="absolute left-4 bottom-4">
                    <div
                      className="px-4 py-2.5 text-sm text-primary rounded-2xl"
                      style={{
                        backgroundColor: "var(--color-glass-bg)",
                        backdropFilter: "blur(var(--blur-glass))",
                        WebkitBackdropFilter: "blur(var(--blur-glass))",
                        borderColor: "var(--color-glass-border)",
                        boxShadow: "var(--glass-shadow)",
                      }}
                    >
                      {t('segment.selectedCount', { count: selectedSegmentIds.length })}
                    </div>
                  </div>
                )}
              </div>

              {/* 푸터 영역 (왼쪽으로 이동) */}
              <div 
                className="px-6 py-4 border-t shrink-0 bg-background/80 backdrop-blur-xl flex items-center justify-between gap-2"
                style={{ borderColor: "var(--color-glass-border)" }}
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="h-10 rounded-xl px-6 border-[#444444] bg-transparent hover:bg-[#333333] text-muted-foreground hover:text-foreground"
                >
                  {t('common.cancel')}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCreateSegmentFromSelection}
                    className="h-10 text-base font-medium rounded-xl bg-[#4FA8D8] hover:bg-[#4FA8D8]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed px-6"
                    disabled={(activeTool !== 'segment' && activeTool !== 'crop') || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Hourglass className="w-5 h-5 animate-pulse" />
                        <span>{t('node.processing')}</span>
                      </div>
                    ) : (
                      activeTool === 'crop' ? t('segment.cropSelection') : t('segment.runSegmentation')
                    )}
                  </Button>

                  <Button
                    onClick={() => {
                      setSelectedSegmentIds([]);
                      setSelectionBounds(null);
                    }}
                    className="h-10 text-base font-medium rounded-xl px-6 bg-[#254B5E] text-white hover:bg-[#254B5E]/90"
                  >
                    {t('common.cancelSelection')}
                  </Button>
                </div>
              </div>
            </div>

            {/* 우측: 세그먼트 리스트 (이동됨) */}
            <div
              className="w-[280px] flex-shrink-0 border-l flex flex-col min-w-0"
              style={{ borderColor: "var(--color-glass-border)" }}
            >
              <div
                className="px-6 py-4 border-b shrink-0 flex items-center justify-between"
                style={{ borderColor: "var(--color-glass-border)" }}
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {t('segment.list')}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t('segment.itemCount', { count: segmentationData.segments.length })}
                </p>
              </div>
              
              {/* 컨트롤 바 */}
              <div 
                className="px-4 py-3 border-b shrink-0 grid grid-cols-2 gap-2"
                style={{ borderColor: "var(--color-glass-border)" }}
              >
                <Button
                  variant={activeTool === 'segment' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTool('segment')}
                  className="flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  {t('segment.segments')}
                </Button>
                <Button
                  variant={activeTool === 'crop' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTool('crop')}
                  className="flex items-center justify-center gap-2"
                >
                  <Crop className="w-4 h-4" />
                  {t('segment.crop')}
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-2 min-h-full flex flex-col">
                  {segmentationData.segments.filter(s => (s.type || 'segment') === activeTool).length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                      <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                        <MousePointer2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p 
                        className="text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: t('segment.emptyList') }}
                      />
                    </div>
                  ) : (
                    segmentationData.segments
                      .filter(s => (s.type || 'segment') === activeTool)
                      .map((segment, index) => (
                      <SegmentListItem
                        key={segment.id}
                        segment={segment}
                        index={index} // 주의: 필터링된 인덱스이므로 DnD 시 문제될 수 있음
                        isSelected={selectedSegmentIds.includes(segment.id)}
                        onSegmentClick={handleSegmentClick}
                        onFavoriteToggle={handleFavoriteToggle}
                        onDelete={handleDeleteSegment}
                        onEditStart={(id) => {
                          // 편집 시작 시 속성 패널에서 처리
                        }}
                        onNameUpdate={handleNameUpdate}
                        moveSegment={moveSegment}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* 액션 버튼들 (전체 선택/초기화) */}
              <div 
                className="px-4 py-3 border-t shrink-0 space-y-3"
                style={{ 
                  borderColor: "var(--color-glass-border)",
                  height: "73px" // 좌측 footer 높이와 맞춤
                }}
              >
                <div className="flex w-full h-full items-center">
                  <Button
                    onClick={() => {
                      const selected = segmentationData.segments.filter((s) => selectedSegmentIds.includes(s.id));
                      
                      if (selected.length === 0) {
                        toast.error(t('segment.selectItemsToExport'));
                        return;
                      }

                      if (onCreateNode && sourceImageUrl) {
                        selected.forEach((seg) => {
                          onCreateNode(sourceImageUrl, seg.bounds);
                        });
                        toast.success(t('segment.imageNodesCreated', { count: selected.length }));
                      }
                    }}
                    className="w-full h-10 text-sm font-medium rounded-xl bg-[#333333] hover:bg-[#333333]/90 text-white border border-[#444444]"
                  >
                    {t('segment.exportToImageNode')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
};

SegmentationPanelComponent.displayName = 'SegmentationPanel';

export const SegmentationPanel = React.memo(SegmentationPanelComponent);