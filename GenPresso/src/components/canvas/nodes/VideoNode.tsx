import React, { useState, useCallback } from "react";
import { Play, Upload, Download, Info, Maximize2, Minimize2, Bookmark } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { FileAttachPopover } from "../../ui/file-attach-popover";
import { NodeFooter } from "./NodeFooter";
import { ExpandToggle } from "./ExpandToggle";
import { MetadataGrid } from "./MetadataGrid";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../ui/dialog";
import { VisuallyHidden } from "../../ui/visually-hidden";
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
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleFrameClick = (frame: FrameType, e: React.MouseEvent) => {
    e.stopPropagation();
    onFrameSelect(selectedFrame === frame ? null : frame);
    toast.success(frame ? `${frame} Frame` : "");
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoViewerOpen(true);
  };

  const handleFullViewClick = () => {
    setIsVideoViewerOpen(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    toast.success(`${t('node.video')} ${t('common.download')} ${t('common.started')}`);
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
                'absolute inset-0 bg-black/20 z-10 pointer-events-none',
                FLEX.CENTER
              )}>
                <button
                  className={cn(
                    NODE_BUTTON.SIZE_LG_CLASS,
                    NODE_RADIUS.FULL,
                    'bg-black/60 backdrop-blur-sm pointer-events-auto',
                    FLEX.CENTER,
                    'hover:bg-black/80',
                    INTERACTIVE_STYLES.HOVER_SCALE,
                    INTERACTIVE_STYLES.TRANSITION_ALL
                  )}
                  onClick={handlePlayClick}
                  aria-label={t('node.play')}
                >
                  <Play className={cn(NODE_ICON.SIZE_XL_CLASS, 'text-white ml-1')} />
                </button>
              </div>
            )}
            <NodeFooter
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
              onFullView={handleFullViewClick}
              imageUrl={videoUrl}
              mediaType="video"
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

      {/* 비디오 뷰어 Dialog */}
      {videoUrl && (
        <Dialog open={isVideoViewerOpen} onOpenChange={setIsVideoViewerOpen}>
          <DialogContent 
            className="max-w-[calc(100vw-2rem)] sm:max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
            style={{
              backgroundColor: "var(--color-glass-bg)",
              backdropFilter: "blur(var(--blur-glass))",
              WebkitBackdropFilter: "blur(var(--blur-glass))",
              borderColor: "var(--color-glass-border)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <VisuallyHidden>
              <DialogTitle>Video Viewer</DialogTitle>
              <DialogDescription>
                View video with controls and information
              </DialogDescription>
            </VisuallyHidden>

            {/* 헤더 */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--color-glass-border)" }}
            >
              <h2 className="text-base font-semibold text-foreground">
                {`${t('node.videoViewer')} (노드)`}
              </h2>
              
              <div className="flex items-center gap-2 mr-4">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-lg transition-colors",
                    showInfo 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                  )}
                  title={t('upload.basicInfo')}
                >
                  <Info className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleDownload}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors"
                  title={t('common.download')}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div 
              className="flex-1 relative overflow-hidden flex min-h-0" 
              style={{ backgroundColor: 'var(--history-item-bg)' }}
            >
              <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out overflow-y-auto">
                {/* 비디오 영역 */}
                <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden relative">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* 우측 정보 패널 - 전체화면일 때 숨김 */}
              {!isFullscreen && (
                <div 
                  className={cn(
                    "flex-shrink-0 border-l flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                    showInfo ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-20 border-l-0"
                  )}
                  style={{ 
                    borderColor: "var(--color-glass-border)",
                    backgroundColor: 'rgba(20, 20, 21, 0.5)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="w-64 flex flex-col h-full overflow-y-auto p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">{t('upload.basicInfo')}</h3>
                    <div className="space-y-4">
                      {/* 파일명 */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.filename')}</p>
                        <p className="text-sm text-foreground">{metadata?.filename || "video_001.mp4"}</p>
                      </div>

                      {/* 생성일시 */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.date')}</p>
                        <p className="text-sm text-foreground">{metadata?.date || "2025-01-14 15:30"}</p>
                      </div>
                      
                      {/* 사이즈 | 비율 | 길이 */}
                      <div className="grid grid-cols-3 gap-4">
                        {/* 사이즈 */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('node.size')}</p>
                          <p className="text-sm text-foreground">{metadata?.size || "1280x720"}</p>
                        </div>
                        {/* 비율 */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('node.aspectRatio')}</p>
                          <p className="text-sm text-foreground">{metadata?.aspectRatio || "16:9"}</p>
                        </div>
                        {/* 길이 */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('node.duration')}</p>
                          <p className="text-sm text-foreground">{metadata?.duration || "5s"}</p>
                        </div>
                      </div>

                      {/* 생성한 사람 */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.creator')}</p>
                        <p className="text-sm text-foreground">{metadata?.creator || t('profile.defaultName')}</p>
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="my-6 h-px rounded-2xl" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='grad' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' style='stop-color:rgba(255,255,255,0.2);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgba(255,255,255,0);stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='1' fill='url(%23grad)' /%3E%3C/svg%3E")`
                    }} />

                    {/* 액션 버튼 섹션 */}
                    <div className="space-y-3">
                      <button
                        onClick={handleDownload}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl text-white border text-base font-medium transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--secondary)',
                          borderColor: 'var(--color-glass-border)',
                        }}
                      >
                        <Download className="w-5 h-5" />
                        {t('common.download')}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookmarkToggle();
                        }}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#254B5E] hover:bg-[#254B5E]/90 text-white text-base font-medium transition-all duration-200"
                      >
                        <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                        {isBookmarked ? t('node.removeFromBookmark') : t('node.addToBookmark')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
});

FrameButton.displayName = "FrameButton";
VideoNode.displayName = "VideoNode";