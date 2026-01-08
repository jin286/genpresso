import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { Textarea } from "../../ui/textarea";
import { ChevronDown, ChevronUp, X, Plus } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Slider } from "../../ui/slider"; // Slider 컴포넌트 필요 (없으면 shadcn ui 사용 가정)
import {
  NODE_PADDING,
  NODE_GAP,
  NODE_RADIUS,
  NODE_TEXT,
  NODE_ICON,
  NODE_BORDER,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";

interface MixSegment {
  id: string;
  name: string;
  type: "main" | "source";
  nodeName?: string;
  description?: string;
  thumbnailUrl?: string;
  visible?: boolean;
  weight?: number;
  cropBounds?: { x: number; y: number; width: number; height: number };
}

interface MixNodeProps {
  segments?: MixSegment[];
  promptText?: string;
  onPromptChange?: (text: string) => void;
  onGenerate?: () => void;
  onSegmentsChange?: (segments: MixSegment[]) => void;
}

const MixNodeComponent = ({
  segments: initialSegments,
  promptText = "",
  onPromptChange,
  onGenerate,
  onSegmentsChange,
}: MixNodeProps) => {
  const { t } = useLanguage();
  
  // 초기 상태 설정 (번역 적용)
  const [segments, setSegments] = useState<MixSegment[]>(
    (initialSegments && initialSegments.length > 0) ? initialSegments : [
      {
        id: "main",
        name: t('mix.mainReference'),
        type: "main",
        thumbnailUrl: undefined, // 초기에는 비어있음 (좌측 도구바 생성 시)
        visible: true,
        weight: 0.5,
      },
      {
        id: "source",
        name: t('mix.addedReference'),
        type: "source",
        thumbnailUrl: undefined,
        visible: true,
        weight: 0.5,
      },
    ]
  );

  const [dragOverSegmentId, setDragOverSegmentId] = useState<string | null>(null);

  // onSegmentsChange 콜백을 ref로 관리하여 useEffect 의존성에서 제거 (무한 루프 방지)
  const onSegmentsChangeRef = useRef(onSegmentsChange);
  
  useEffect(() => {
    onSegmentsChangeRef.current = onSegmentsChange;
  }, [onSegmentsChange]);

  useEffect(() => {
    if (onSegmentsChangeRef.current) {
      onSegmentsChangeRef.current(segments);
    }
  }, [segments]);

  const handleWeightChange = useCallback((segmentId: string, value: number[]) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === segmentId ? { ...seg, weight: value[0] / 100 } : seg
      )
    );
  }, []);

  // 이미지 제거 핸들러
  const handleRemoveImage = useCallback((segmentId: string) => {
    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === segmentId ? { ...seg, thumbnailUrl: undefined } : seg
      )
    );
  }, []);

  return (
    <div className={cn(FLEX.COL, "w-full", NODE_PADDING.ALL, NODE_GAP.LG)}>
      {/* 상단: 텍스트 입력 (설명) */}
      <Textarea
        value={promptText}
        onChange={(e) => onPromptChange?.(e.target.value)}
        placeholder={t('node.enterPrompt')}
        className={cn(
          "w-full min-h-[60px] resize-none overflow-y-auto",
          NODE_RADIUS.SM,
          NODE_BORDER.DEFAULT,
          "border-border focus-visible:ring-0 focus-visible:border-primary/50 text-xs p-2"
        )}
      />

      {/* 하단: 레퍼런스 슬롯 (2열 그리드) */}
      <div className={cn("grid grid-cols-2 gap-2")}>
        {segments.map((segment) => (
          <div 
            key={segment.id} 
            className={cn(
              "flex flex-col gap-2 p-2 rounded-xl bg-muted/10 border border-border/10",
              "transition-all duration-200 hover:bg-muted/20"
            )}
          >
            {/* 헤더: 라벨 */}
            <div className="flex flex-col text-muted-foreground leading-tight min-h-[24px] gap-0.5">
              <span className="text-[10px] font-semibold">
                {segment.type === "main" ? t('mix.mainReference') : t('mix.addedReference')}
              </span>
              <span className="text-[9px] font-normal">
                {segment.type === "main" 
                  ? "세그먼트 없는 원본" 
                  : "세그먼트만 포함"}
              </span>
            </div>

            {/* 이미지 슬롯 */}
            <div 
              className={cn(
                "relative aspect-square w-full rounded-lg bg-muted/30 overflow-hidden border border-border/10 group transition-colors",
                dragOverSegmentId === segment.id && "border-primary bg-primary/10 ring-2 ring-primary/20"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOverSegmentId(segment.id);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOverSegmentId(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOverSegmentId(null);
                const segmentDataStr = e.dataTransfer.getData('application/react-flow-segment');
                if (segmentDataStr) {
                  try {
                    const segmentData = JSON.parse(segmentDataStr);
                    // 해당 슬롯에 이미지 설정
                    setSegments(prev => prev.map(s => 
                      s.id === segment.id 
                        ? { 
                            ...s, 
                            thumbnailUrl: segmentData.imageUrl,
                            cropBounds: segmentData.cropBounds,
                            name: segmentData.segmentName || s.name
                          } 
                        : s
                    ));
                  } catch (err) {
                    console.error("Failed to parse drop data", err);
                  }
                }
              }}
            >
              {segment.thumbnailUrl ? (
                <>
                  {segment.cropBounds ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <ImageWithFallback
                        src={segment.thumbnailUrl}
                        alt={segment.name}
                        className="absolute max-w-none"
                        style={{
                          width: `${100 * (100 / segment.cropBounds.width)}%`,
                          height: `${100 * (100 / segment.cropBounds.height)}%`,
                          left: `-${(segment.cropBounds.x / segment.cropBounds.width) * 100}%`,
                          top: `-${(segment.cropBounds.y / segment.cropBounds.height) * 100}%`,
                        }}
                      />
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={segment.thumbnailUrl}
                      alt={segment.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(segment.id);
                    }}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-black/50 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                  <Plus className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* 슬라이더 */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{t('mix.weight')}</span>
                <span className="text-[10px] font-medium text-primary">
                  {Math.round((segment.weight || 0) * 100)}%
                </span>
              </div>
              <Slider
                defaultValue={[(segment.weight || 0) * 100]}
                max={100}
                step={1}
                onValueChange={(val) => handleWeightChange(segment.id, val)}
                className="py-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MixNodeComponent.displayName = "MixNode";

export const MixNode = memo(MixNodeComponent);
