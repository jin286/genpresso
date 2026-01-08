import React, { useRef, useState, useCallback } from "react";
import { Textarea } from "../../ui/textarea";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { NodeFooter } from "./NodeFooter";
import { ExpandToggle } from "./ExpandToggle";
import { MetadataGrid } from "./MetadataGrid";
import { MediaUploadArea } from "./MediaUploadArea";
import { toast } from "sonner@2.0.3";
import type { Segment } from "../types";
import {
  NODE_PADDING,
  NODE_GAP,
  NODE_RADIUS,
  NODE_BORDER,
  NODE_TEXT,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";
interface AttachedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface ImageNodeProps {
  id?: string;
  imageUrl?: string;
  promptText: string;
  onPromptChange: (value: string) => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onFullView: () => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  metadata?: Record<string, any>;
  isSegmentActive?: boolean;
  onSegmentToggle?: () => void;
  segments?: Segment[];
  hoveredSegmentId?: string | null;
  onSegmentHover?: (id: string | null) => void;
  onSegmentExtract?: (id: string) => void;
  attachedFile?: AttachedFile | null;
  onFileAttach?: (file: AttachedFile) => void;
  isSelected?: boolean;
  onTurnIntoText?: () => void;
  onTurnIntoVideo?: () => void;
  onGenerate?: () => void;
}

export const ImageNode = React.memo<ImageNodeProps>(({
  id,
  imageUrl,
  promptText,
  onPromptChange,
  isBookmarked,
  onBookmarkToggle,
  onFullView,
  isExpanded,
  onExpandToggle,
  metadata,
  isSegmentActive = false,
  onSegmentToggle,
  segments = [],
  hoveredSegmentId = null,
  onSegmentHover,
  onSegmentExtract,
  attachedFile = null,
  onFileAttach,
  isSelected = false,
  onTurnIntoText,
  onTurnIntoVideo,
  onGenerate,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileAttach) {
      // 파일 URL 생성
      const url = URL.createObjectURL(file);
      onFileAttach({
        name: file.name,
        size: file.size,
        type: file.type,
        url,
      });
    }
  }, [onFileAttach]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      <div className={cn(NODE_PADDING.ALL, FLEX.COL, NODE_GAP.LG)}>
        {/* 결과물 노드(imageUrl 있음): 이미지만 표시 */}
        {imageUrl ? (
          <div className={cn(
            'relative w-full aspect-square group',
            NODE_RADIUS.SM,
            'overflow-hidden',
            NODE_BORDER.DEFAULT
          )}>
            {metadata?.cropBounds ? (
              <div className="w-full h-full relative overflow-hidden bg-black/5">
                <ImageWithFallback
                  src={imageUrl}
                  alt="Segment"
                  className="absolute max-w-none"
                  style={{
                    width: `${100 * (100 / metadata.cropBounds.width)}%`,
                    height: `${100 * (100 / metadata.cropBounds.height)}%`,
                    left: `-${(metadata.cropBounds.x / metadata.cropBounds.width) * 100}%`,
                    top: `-${(metadata.cropBounds.y / metadata.cropBounds.height) * 100}%`,
                  }}
                />
              </div>
            ) : (
              <ImageWithFallback
                src={imageUrl}
                alt="Generated image"
                className="w-full h-full object-cover"
              />
            )}

            <NodeFooter
              nodeId={id}
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
              onFullView={onFullView}
              imageUrl={imageUrl}
              isSegmentActive={isSegmentActive}
              onSegmentToggle={onSegmentToggle}
              segments={segments}
              hoveredSegmentId={hoveredSegmentId}
              onSegmentHover={onSegmentHover}
              onSegmentExtract={onSegmentExtract}
            />
          </div>
        ) : (
          /* 입력 노드(imageUrl 없음): 텍스트 입력 + 업로드 영역 + 파일 추가 버튼 + 툴바 */
          <>
            <Textarea
              placeholder={t('node.enterPrompt')}
              value={promptText}
              onChange={(e) => onPromptChange(e.target.value)}
              className={cn(
                'w-full min-h-[60px] resize-none overflow-y-auto',
                NODE_RADIUS.SM,
                NODE_BORDER.DEFAULT,
                'border-border focus-visible:ring-0 focus-visible:border-primary/50 text-xs p-2'
              )}
            />

            <MediaUploadArea 
              message="해당 영역에 드래그 하여 파일을 첨부하거나<br />아래의 버튼을 통해 파일을 첨부하세요." 
              attachedFile={attachedFile}
            />

            {/* 파일 첨부 버튼 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={handleButtonClick}
              className={cn(
                'w-full justify-center gap-0.5',
                NODE_RADIUS.SM,
                'h-8',
                'backdrop-blur-sm border text-foreground hover:bg-primary/20 hover:border-primary/30 hover:text-primary transition-all'
              )}
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderColor: 'var(--glass-border)',
              }}
            >
              <Plus className="w-4 h-4" />
              파일첨부
            </Button>
          </>
        )}
      </div>

      {imageUrl && (
        <>
          <ExpandToggle isExpanded={isExpanded} onToggle={onExpandToggle} />

          {isExpanded && (
            <div className={cn(NODE_PADDING.ALL, NODE_BORDER.TOP, 'space-y-2')}>
              <div>
                <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>프롬프트</p>
                <p className={cn(NODE_TEXT.XS, 'text-foreground')}>
                  {metadata?.prompt || promptText || "프롬프트가 없습니다."}
                </p>
              </div>

              {metadata?.referenceImage && (
                <div>
                  <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>
                    참조 이미지
                  </p>
                  <div className={cn(
                    'w-full h-20',
                    NODE_RADIUS.SM,
                    'overflow-hidden',
                    NODE_BORDER.DEFAULT
                  )}>
                    <ImageWithFallback
                      src={metadata.referenceImage}
                      alt="Reference"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div>
                <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>
                  첨부된 이미지
                </p>
                {metadata?.attachedImage ? (
                  <div className={cn(
                    'w-full h-20',
                    NODE_RADIUS.SM,
                    'overflow-hidden',
                    NODE_BORDER.DEFAULT
                  )}>
                    <ImageWithFallback
                      src={metadata.attachedImage}
                      alt="Attached"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <p className={cn(NODE_TEXT.XS, 'text-foreground')}>
                    첨부된 이미지가 없습니다
                  </p>
                )}
              </div>

              <MetadataGrid
                items={[
                  { label: t('node.model'), value: metadata?.model || "FLUX 1.1 Pro" },
                  { label: t('node.aspectRatio'), value: metadata?.aspectRatio || "1:1" },
                  { label: t('node.seed'), value: metadata?.seed || t('node.random') },
                  { label: t('node.size'), value: metadata?.size || "1024x1024" },
                ]}
              />
            </div>
          )}
        </>
      )}
    </>
  );
});

ImageNode.displayName = "ImageNode";
