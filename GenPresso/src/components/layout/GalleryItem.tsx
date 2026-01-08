import React, { memo } from "react";
import { toast } from "sonner@2.0.3";
import { IconHeart, IconBookmark, IconShare, IconEye } from "../icons";
import { CanvasThumbnail } from "../canvas/CanvasThumbnail";
import { categoryToScenarioMap } from "../canvas/scenario-templates";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../contexts/LanguageContext";
import { useClipboard } from "./hooks/useClipboard";

// 최적화된 갤러리 아이템 컴포넌트
export const GalleryItem = memo(function GalleryItem({ 
  item, 
  index, 
  onClick,
  isBookmarked = false,
  onBookmarkToggle,
  isLiked = false,
  onLikeToggle,
  showFinalResult = false
}: { 
  item: any; 
  index: number; 
  onClick?: () => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: (e: React.MouseEvent) => void;
  isLiked?: boolean;
  onLikeToggle?: (e: React.MouseEvent) => void;
  showFinalResult?: boolean;
}) {
  const { t } = useLanguage();
  const { copyToClipboard } = useClipboard();
  
  // 캐시된 값들 계산
  const viewCount = item.views || `${((index * 0.3 + 1) % 5 + 1).toFixed(1)}k`;
  const likeCount = item.likes || (Math.floor((index * 1.7 + 1) % 20 + 1) + (isLiked ? 1 : 0));
  
  // 시나리오 ID 가져오기
  const scenarioId = categoryToScenarioMap[item.category] || item.scenarioId || 'blank';

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border w-full"
      style={{ 
        aspectRatio: item.aspectRatio,
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        backgroundColor: 'var(--color-glass-bg)',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
      onClick={onClick}
    >
      {/* 썸네일 - 최종 결과물 또는 캔버스 워크플로우 */}
      {showFinalResult && item.finalResultImage ? (
        <ImageWithFallback
          src={item.finalResultImage}
          alt={item.category}
          className="w-full h-full object-cover"
        />
      ) : (
        <CanvasThumbnail scenarioId={scenarioId} />
      )}

      {/* 호버 오버레이 - Figma 디자인 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(9,9,11,0.5)] to-[rgba(9,9,11,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="flex flex-col items-center relative size-full">
          <div className="box-border flex flex-col justify-between overflow-clip p-2.5 relative size-full">
            
            {/* 상단 - 타이틀과 공유하기 버튼 */}
            <div className="flex items-center justify-between relative w-full">
              <div className="flex gap-1.5 items-center relative shrink-0">
                <div className="leading-[1.4] not-italic relative shrink-0 text-xs text-nowrap text-white">
                  <p className="leading-[1.4] whitespace-pre">{item.category}</p>
                </div>
              </div>
              <div 
                className="relative shrink-0 size-[15px] cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(window.location.href, t('gallery.shareLinkCopied'));
                }}
              >
                <IconShare size={15} color="currentColor" className="text-white" />
              </div>
            </div>

            {/* 하단 - 조회수, 좋아요, 북마크 */}
            <div className="flex gap-2 items-center justify-between relative w-full">
              {/* 조회수 */}
              <div className="content-stretch flex gap-1 items-center relative shrink-0">
                <div className="relative shrink-0 size-[15px]">
                  <IconEye size={15} color="currentColor" className="text-white" />
                </div>
                <span className="text-xs text-white">{viewCount}</span>
              </div>

              <div className="flex gap-2 items-center">
                {/* 좋아요 */}
                <div 
                  className="content-stretch flex gap-1 items-center relative shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={onLikeToggle}
                >
                  <div className="relative shrink-0 size-[15px]">
                    <IconHeart 
                      size={15} 
                      color="currentColor"
                      className={isLiked ? "text-destructive fill-destructive" : "text-white"}
                    />
                  </div>
                  <span className="text-xs text-white">{likeCount}</span>
                </div>

                {/* 북마크 */}
                <div 
                  className="relative shrink-0 size-[15px] cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={onBookmarkToggle}
                >
                  <IconBookmark 
                    size={15} 
                    color="currentColor"
                    className={isBookmarked ? "text-primary fill-primary" : "text-white"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
