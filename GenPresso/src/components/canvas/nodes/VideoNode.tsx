import React, { useState, useCallback } from "react";
import { Play, Upload } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { FileAttachPopover } from "../../ui/file-attach-popover";
import { NodeFooter } from "./NodeFooter";
import { ExpandToggle } from "./ExpandToggle";
import { MetadataGrid } from "./MetadataGrid";
import { toast } from "sonner@2.0.3";
import {
  NODE_PADDING,
  NODE_GAP,
  NODE_ICON,
  NODE_BUTTON,
  NODE_RADIUS,
  NODE_BORDER,
  NODE_TEXT,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";
type FrameType = "start" | "end" | "style" | null;

interface VideoNodeProps {
  videoUrl?: string;
  promptText: string;
  onPromptChange: (value: string) => void;
  selectedFrame: FrameType;
  onFrameSelect: (frame: FrameType) => void;
  isSelected: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onFullView: () => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  metadata?: Record<string, any>;
  onTurnIntoText?: () => void;
  onTurnIntoImage?: () => void;
  onGenerate?: () => void;
}

const FrameButton = React.memo<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}>(({ label, isSelected, onClick }) => (
  <button
    className={cn(
      'w-full py-3',
      NODE_RADIUS.SM,
      NODE_BORDER.THICK,
      FLEX.COL,
      'items-center justify-center',
      NODE_GAP.SM,
      INTERACTIVE_STYLES.TRANSITION_ALL,
      isSelected
        ? INTERACTIVE_STYLES.ACTIVE
        : cn(
            'border-dashed border-muted-foreground/30',
            INTERACTIVE_STYLES.HOVER_BORDER,
            INTERACTIVE_STYLES.HOVER_BG_MUTED
          )
    )}
    onClick={onClick}
  >
    <div className={cn(
      'w-6 h-6',
      NODE_RADIUS.FULL,
      'bg-primary/20',
      FLEX.CENTER
    )}>
      <Upload className={cn(NODE_ICON.SIZE_CLASS, 'text-primary')} />
    </div>
    <span className={cn('text-[9px]', 'tracking-tight leading-none')}>{label}</span>
  </button>
));

export const VideoNode = React.memo<VideoNodeProps>(({
  videoUrl,
  promptText,
  onPromptChange,
  selectedFrame,
  onFrameSelect,
  isSelected,
  isBookmarked,
  onBookmarkToggle,
  onFullView,
  isExpanded,
  onExpandToggle,
  metadata,
  onTurnIntoText,
  onTurnIntoImage,
  onGenerate,
}) => {
  const { t } = useLanguage();
  
  const handleFrameClick = (frame: FrameType, e: React.MouseEvent) => {
    e.stopPropagation();
    onFrameSelect(selectedFrame === frame ? null : frame);
    toast.success(frame ? `${frame} Frame` : "");
  };

  return (
    <>
      <div className={cn(NODE_PADDING.ALL, FLEX.COL, NODE_GAP.LG)}>
        {!videoUrl && (
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

            <div className={cn('grid grid-cols-3', NODE_GAP.MD)}>
              <button
                className={cn(
                  'w-full aspect-square',
                  NODE_RADIUS.SM,
                  NODE_BORDER.DEFAULT,
                  FLEX.COL,
                  'items-center justify-center',
                  NODE_GAP.XS,
                  'bg-muted/5 hover:bg-muted/10 transition-colors',
                  selectedFrame === "start" && 'border-primary bg-primary/5'
                )}
                onClick={(e) => handleFrameClick("start", e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-muted-foreground/30"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span className={cn('text-[9px]', 'tracking-tight leading-none', 'mt-1')}>{t('node.startFrame')}</span>
              </button>
              <button
                className={cn(
                  'w-full aspect-square',
                  NODE_RADIUS.SM,
                  NODE_BORDER.DEFAULT,
                  FLEX.COL,
                  'items-center justify-center',
                  NODE_GAP.XS,
                  'bg-muted/5 hover:bg-muted/10 transition-colors',
                  selectedFrame === "end" && 'border-primary bg-primary/5'
                )}
                onClick={(e) => handleFrameClick("end", e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-muted-foreground/30"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span className={cn('text-[9px]', 'tracking-tight leading-none', 'mt-1')}>{t('node.endFrame')}</span>
              </button>
              <button
                className={cn(
                  'w-full aspect-square',
                  NODE_RADIUS.SM,
                  NODE_BORDER.DEFAULT,
                  FLEX.COL,
                  'items-center justify-center',
                  NODE_GAP.XS,
                  'bg-muted/5 hover:bg-muted/10 transition-colors',
                  selectedFrame === "style" && 'border-primary bg-primary/5'
                )}
                onClick={(e) => handleFrameClick("style", e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-muted-foreground/30"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span className={cn('text-[9px]', 'tracking-tight leading-none', 'mt-1')}>{t('node.styleFrame')}</span>
              </button>
            </div>

            <FileAttachPopover
              align="center"
              side="bottom"
              sideOffset={4}
              buttonClassName={cn('w-full justify-center', NODE_RADIUS.SM, 'h-8')}
              showLabel={true}
            />
          </>
        )}

        {videoUrl && (
          <div className={cn(
            'relative w-full aspect-square group',
            NODE_RADIUS.SM,
            'overflow-hidden bg-black',
            NODE_BORDER.DEFAULT
          )}>
            <video src={videoUrl} className="w-full h-full object-cover" />
            {isSelected && (
              <div className={cn(
                'absolute inset-0 bg-black/20 z-10',
                FLEX.CENTER
              )}>
                <button
                  className={cn(
                    NODE_BUTTON.SIZE_LG_CLASS,
                    NODE_RADIUS.FULL,
                    'bg-black/60 backdrop-blur-sm',
                    FLEX.CENTER,
                    'hover:bg-black/80',
                    INTERACTIVE_STYLES.HOVER_SCALE,
                    INTERACTIVE_STYLES.TRANSITION_ALL
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success(t('node.videoPlaying'));
                  }}
                  aria-label={t('node.play')}
                >
                  <Play className={cn(NODE_ICON.SIZE_XL_CLASS, 'text-white ml-1')} />
                </button>
              </div>
            )}
            <NodeFooter
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
              onFullView={onFullView}
              imageUrl={videoUrl}
            />
          </div>
        )}
      </div>

      {videoUrl && (
        <>
          <ExpandToggle isExpanded={isExpanded} onToggle={onExpandToggle} />

          {isExpanded && (
            <div className={cn(NODE_PADDING.ALL, NODE_BORDER.TOP, 'space-y-2')}>
              <div>
                <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>{t('node.prompt')}</p>
                <p className={cn(NODE_TEXT.XS, 'text-foreground')}>
                  {metadata?.prompt || promptText || t('node.defaultVideoPrompt')}
                </p>
              </div>

              <div>
                <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>
                  {t('node.frameImages')}
                </p>
                {metadata?.frames && Array.isArray(metadata.frames) && metadata.frames.length > 0 ? (
                  <div className={cn('grid grid-cols-3', NODE_GAP.MD)}>
                    {metadata.frames.map((frame: any, index: number) => (
                      <div key={frame.id || index} className="space-y-0.5">
                        <div className={cn(
                          'w-full aspect-square overflow-hidden relative',
                          NODE_RADIUS.SM,
                          NODE_BORDER.DEFAULT,
                          frame.selected && 'border-primary border-2'
                        )}>
                          <ImageWithFallback
                            src={frame.imageUrl}
                            alt={`Frame ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {frame.selected && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : metadata?.referenceFrames ? (
                  <div className={cn('grid grid-cols-3', NODE_GAP.MD)}>
                    {["start", "end", "style"].map((frameType) => {
                      const frame =
                        metadata.referenceFrames[
                          frameType as keyof typeof metadata.referenceFrames
                        ];
                      if (!frame) return null;

                      return (
                        <div key={frameType} className="space-y-0.5">
                          <p className={cn(NODE_TEXT.XS, 'text-muted-foreground')}>
                            {frameType === "start"
                              ? t('node.startFrame')
                              : frameType === "end"
                              ? t('node.endFrame')
                              : t('node.styleFrame')}
                          </p>
                          <div className={cn(
                            'w-full aspect-square overflow-hidden',
                            NODE_RADIUS.SM,
                            NODE_BORDER.DEFAULT
                          )}>
                            <ImageWithFallback
                              src={frame}
                              alt={`${frameType} frame`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={cn(NODE_TEXT.XS, 'text-foreground')}>
                    {t('node.noAttachedImages')}
                  </p>
                )}
              </div>

              <MetadataGrid
                items={[
                  { label: t('node.model'), value: metadata?.model || "Runway Gen-3" },
                  { label: t('node.aspectRatio'), value: metadata?.aspectRatio || "16:9" },
                  { label: t('node.duration'), value: metadata?.duration || "5s" },
                  { label: t('node.size'), value: metadata?.size || "1280x720" },
                ]}
              />
            </div>
          )}
        </>
      )}
    </>
  );
});

FrameButton.displayName = "FrameButton";
VideoNode.displayName = "VideoNode";
