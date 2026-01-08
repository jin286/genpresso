import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { IconEye, IconHeart, IconBookmark, IconShare } from "../icons";
import { toast } from "sonner@2.0.3";
import { Play } from "lucide-react";
import { useClipboard } from "./hooks/useClipboard";
import { useLanguage } from "../../contexts/LanguageContext";

interface GalleryDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    category: string;
    creator: string;
    createdAt: string;
    views: string;
    likes: number;
    description: string;
    prompt: string;
    model: string;
    resolution: string;
    aspectRatio: string;
    finalResultImage: string;
    isVideo?: boolean;
  } | null;
  onDuplicate?: () => void;
}

export function GalleryDetailDialog({ 
  open, 
  onOpenChange, 
  item,
  onDuplicate 
}: GalleryDetailDialogProps) {
  const { copyToClipboard } = useClipboard();
  const { t } = useLanguage();

  if (!item) return null;

  const handleShare = async () => {
    await copyToClipboard(window.location.href);
  };

  const handleDuplicate = () => {
    onDuplicate?.();
    toast.success(t('gallery.workDuplicated'));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col md:flex-row bg-background/95 backdrop-blur-xl border-none shadow-2xl z-[100]">
        <VisuallyHidden>
          <DialogTitle>{item.category}</DialogTitle>
          <DialogDescription>
            {t('gallery.creatorWork', { creator: item.creator })}
          </DialogDescription>
        </VisuallyHidden>

        {/* 좌측: 이미지 영역 (밝은 회색 배경, 이미지 전체 보기) */}
        <div className="relative w-full md:w-[65%] h-[40vh] md:h-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
          <ImageWithFallback
            src={item.finalResultImage}
            alt={item.category}
            className="w-full h-full object-contain"
          />
          {item.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors hover:scale-105 transform duration-200">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* 우측: 정보 영역 (스크롤 가능) */}
        <div className="w-full md:w-[35%] flex flex-col h-full bg-background border-l border-border/50">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
            {/* 헤더 */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2 leading-tight">{item.category}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.creator}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span>{item.createdAt}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handleShare} className="h-9 w-9 text-muted-foreground hover:text-foreground">
                    <IconShare size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                    <IconBookmark size={18} />
                  </Button>
                </div>
              </div>

              {/* 통계 */}
              <div className="flex items-center gap-6 py-3 border-y border-border/40">
                <div className="flex items-center gap-2 text-sm">
                  <IconEye size={16} className="text-muted-foreground" />
                  <span className="font-medium">{item.views}</span>
                  <span className="text-xs text-muted-foreground">{t('gallery.views')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IconHeart size={16} className="text-muted-foreground" />
                  <span className="font-medium">{item.likes}</span>
                  <span className="text-xs text-muted-foreground">{t('gallery.likes')}</span>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                {t('gallery.workDescription')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            </div>

            {/* 프롬프트 */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                {t('gallery.prompt')}
              </h3>
              <div 
                className="rounded-xl p-4 text-sm text-muted-foreground leading-relaxed font-mono relative group"
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  border: '1px solid var(--color-glass-border)',
                }}
              >
                {item.prompt}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                  onClick={() => {
                    copyToClipboard(item.prompt, t('gallery.promptCopied'));
                  }}
                >
                  <span className="sr-only">{t('common.copy')}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </Button>
              </div>
            </div>

            {/* 메타데이터 */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{t('gallery.generationInfo')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">{t('gallery.model')}</div>
                  <div className="text-xs font-medium">{item.model}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">{t('gallery.resolution')}</div>
                  <div className="text-xs font-medium">{item.resolution}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">{t('gallery.aspectRatio')}</div>
                  <div className="text-xs font-medium">{item.aspectRatio}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 (고정) */}
          <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm shrink-0 flex gap-3">
            <Button 
              className="flex-1 h-11 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              onClick={handleDuplicate}
            >
              {t('gallery.duplicateAndStart')}
            </Button>
            <Button 
              variant="outline"
              className="h-11 px-6 border-border/50 hover:bg-muted/50"
              onClick={() => onOpenChange(false)}
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}