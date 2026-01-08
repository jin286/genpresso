import React, { useCallback } from "react";
import { Eye, EyeOff, GripVertical, ArrowLeftRight } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Slider } from "../../ui/slider";
import chairImage from "../../../public/chair.jpg";
import {
  NODE_TEXT,
  NODE_GAP,
  NODE_RADIUS,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";

interface SegmentListItemProps {
  /** 세그먼트 ID */
  id: string;
  /** 세그먼트 이름 */
  name: string;
  /** 노드 태그 (옵션) */
  nodeName?: string;
  /** 썸네일 URL */
  thumbnailUrl?: string;
  /** 가시성 상태 */
  visible: boolean;
  /** 슬라이더 값 (0~100) */
  sliderValue: number;
  /** 슬라이더 라벨 (예: "100%") */
  sliderLabel: string;
  /** 드래그 핸들 표시 여부 */
  showDragHandle?: boolean;
  /** 교체 버튼 표시 여부 */
  showSwapButton?: boolean;
  /** 추가 className (wrapper) */
  className?: string;
  /** 추가 style (wrapper) */
  style?: React.CSSProperties;
  /** 마우스 엔터 이벤트 */
  onMouseEnter?: () => void;
  /** 마우스 리브 이벤트 */
  onMouseLeave?: () => void;
  /** 드래그 시작 이벤트 */
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  /** 드래그 오버 이벤트 */
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  /** 드래그 종료 이벤트 */
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  /** 드롭 이벤트 */
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  /** 가시성 토글 핸들러 */
  onToggleVisibility: (id: string) => void;
  /** 슬라이더 변경 핸들러 */
  onSliderChange: (id: string, value: number[]) => void;
  /** 교체 핸들러 (MixNode 전용) */
  onSwap?: (id: string) => void;
}

/**
 * MixNode/CompositionNode 공용 세그먼트 리스트 아이템
 * 
 * @example
 * // MixNode에서 사용
 * <SegmentListItem
 *   id={segment.id}
 *   name={segment.name}
 *   nodeName={segment.nodeName}
 *   thumbnailUrl={segment.thumbnailUrl}
 *   visible={segment.visible}
 *   sliderValue={(segment.weight || 0) * 100}
 *   sliderLabel={`${Math.round((segment.weight || 0) * 100)}%`}
 *   showSwapButton={true}
 *   onToggleVisibility={toggleVisibility}
 *   onSliderChange={handleWeightChange}
 *   onSwap={handleSwap}
 * />
 * 
 * // CompositionNode에서 사용
 * <SegmentListItem
 *   id={segment.id}
 *   name={segment.name}
 *   nodeName={segment.nodeName}
 *   thumbnailUrl={segment.thumbnailUrl}
 *   visible={segment.visible}
 *   sliderValue={(segment.opacity || 0) * 100}
 *   sliderLabel={`${Math.round((segment.opacity || 0) * 100)}%`}
 *   onToggleVisibility={toggleVisibility}
 *   onSliderChange={handleOpacityChange}
 * />
 */
export const SegmentListItem = React.memo<SegmentListItemProps>(({
  id,
  name,
  nodeName,
  thumbnailUrl,
  visible,
  sliderValue,
  sliderLabel,
  showDragHandle = false,
  showSwapButton = false,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onToggleVisibility,
  onSliderChange,
  onSwap,
}) => {
  // 가시성 토글 핸들러 메모이제이션
  const handleToggleVisibility = useCallback(() => {
    onToggleVisibility(id);
  }, [id, onToggleVisibility]);

  // 슬라이더 변경 핸들러 메모이제이션
  const handleSliderChange = useCallback((value: number[]) => {
    onSliderChange(id, value);
  }, [id, onSliderChange]);

  // 교체 핸들러 메모이제이션
  const handleSwap = useCallback(() => {
    onSwap?.(id);
  }, [id, onSwap]);

  return (
    <div
      draggable={showDragHandle}
      className={cn(
        "flex flex-col",
        NODE_GAP.SM,
        "bg-card/50",
        NODE_RADIUS.SM,
        "p-1.5",
        className
      )}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      {/* 위 줄: 드래그 핸들 (옵션), 썸네일, 이름+설명, 교체 버튼 (옵션), 눈동자 */}
      <div className={cn("flex items-center", NODE_GAP.SM)}>
        {/* 드래그 핸들 (CompositionNode만) */}
        {showDragHandle && (
          <GripVertical
            className="shrink-0 text-muted-foreground cursor-grab active:cursor-grabbing"
            style={{ width: "14px", height: "14px" }}
            onMouseDown={(e) => e.stopPropagation()}
          />
        )}

        {/* 썸네일 (32px) */}
        <ImageWithFallback
          src={thumbnailUrl || chairImage}
          alt={name}
          className={cn("shrink-0 object-cover", NODE_RADIUS.SM)}
          style={{ width: "32px", height: "32px" }}
        />

        {/* 세그먼트 정보 (이름 + 노드태그) */}
        <div className={cn(FLEX.COL, "min-w-0 flex-1")}>
          <span className={cn(NODE_TEXT.XS, "truncate")} style={{ lineHeight: "1.2" }}>
            {name}
          </span>
          {nodeName && (
            <span
              className={cn(NODE_TEXT.XXS, "text-muted-foreground truncate")}
              style={{ lineHeight: "1.2" }}
            >
              {nodeName}
            </span>
          )}
        </div>

        {/* 교체 버튼 (MixNode 전용) */}
        {showSwapButton && onSwap && (
          <button
            onClick={handleSwap}
            className={cn(
              FLEX.CENTER,
              "shrink-0",
              NODE_RADIUS.SM,
              INTERACTIVE_STYLES.HOVER_BG,
              "text-muted-foreground hover:text-primary",
              INTERACTIVE_STYLES.TRANSITION
            )}
            style={{ width: "28px", height: "28px" }}
            title="메인/소스 교체"
          >
            <ArrowLeftRight style={{ width: "14px", height: "14px" }} />
          </button>
        )}

        {/* 가시성 토글 버튼 (14px 아이콘) */}
        <button
          onClick={handleToggleVisibility}
          className={cn(
            FLEX.CENTER,
            "shrink-0",
            NODE_RADIUS.SM,
            INTERACTIVE_STYLES.HOVER_BG
          )}
          style={{ width: "28px", height: "28px" }}
        >
          {visible ? (
            <Eye style={{ width: "14px", height: "14px" }} />
          ) : (
            <EyeOff style={{ width: "14px", height: "14px" }} />
          )}
        </button>
      </div>

      {/* 아래 줄: 가로 슬라이더 */}
      <div className={cn("flex items-center", NODE_GAP.SM, "pl-[18px]")}>
        {/* 슬라이더 (전체 너비) */}
        <div className="flex-1">
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            orientation="horizontal"
          />
        </div>

        {/* 퍼센트 */}
        <span
          className={cn(NODE_TEXT.XXS, "shrink-0 text-muted-foreground")}
          style={{
            lineHeight: "1.2",
            width: "32px",
            textAlign: "right",
          }}
        >
          {sliderLabel}
        </span>
      </div>
    </div>
  );
});

SegmentListItem.displayName = "SegmentListItem";
