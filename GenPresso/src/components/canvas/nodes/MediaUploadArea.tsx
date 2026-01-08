import React, { memo, useMemo } from "react";
import { Upload, Plus } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import {
  NODE_ICON,
  NODE_BUTTON,
  NODE_RADIUS,
  NODE_TEXT,
  NODE_GAP,
  NODE_BORDER,
  NODE_SPACE_Y,
  FLEX,
  cn,
} from "./node-styles";

interface AttachedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface MediaUploadAreaProps {
  message?: string;
  variant?: "dashed" | "solid";
  icon?: "upload" | "plus";
  title?: string;
  attachedFile?: AttachedFile | null;
}

const MediaUploadAreaComponent: React.FC<MediaUploadAreaProps> = ({
  message = "해당 영역에 드래그 하여 파일을 첨부하거나<br />아래의 버튼을 통해 파일을 첨부하세요",
  variant = "dashed",
  icon = "upload",
  title = "참조 파일이 없습니다.",
  attachedFile = null,
}) => {
  const Icon = useMemo(() => icon === "plus" ? Plus : Upload, [icon]);

  // 파일 크기를 읽기 쉬운 형식으로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // 파일이 첨부된 경우
  if (attachedFile) {
    return (
      <div className={cn(
        'w-full aspect-square',
        NODE_RADIUS.SM,
        NODE_BORDER.DEFAULT,
        FLEX.CENTER,
        'bg-muted/5'
      )}>
        <div className={cn(FLEX.COL, 'items-center justify-center', NODE_GAP.LG, 'text-center')}>
          {/* 이미지 썸네일 */}
          <div className={cn(
            NODE_BUTTON.SIZE_LG_CLASS,
            NODE_RADIUS.SM,
            'overflow-hidden',
            NODE_BORDER.DEFAULT
          )}>
            <ImageWithFallback
              src={attachedFile.url}
              alt={attachedFile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={NODE_SPACE_Y.SM}>
            {/* 파일명 */}
            <p className={cn(NODE_TEXT.XS, 'text-foreground', 'truncate max-w-full')}>
              {attachedFile.name}
            </p>
            {/* 파일 용량 */}
            <p className={cn(NODE_TEXT.XS, 'text-muted-foreground')}>
              {formatFileSize(attachedFile.size)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 파일이 없는 경우 (기존 UI)
  return (
    <div className={cn(
      'w-full aspect-square',
      NODE_RADIUS.SM,
      NODE_BORDER.DEFAULT,
      FLEX.CENTER,
      'bg-muted/5'
    )}>
      <div className={cn(FLEX.COL, 'items-center justify-center', 'gap-3', 'text-center')}>
        <Plus className={cn('w-8 h-8', 'text-muted-foreground/30')} />
        <div className={NODE_SPACE_Y.XS}>
          {title && <p className={cn(NODE_TEXT.XS, 'text-foreground', 'leading-tight')}>{title}</p>}
          {message && (
            <p
              className={cn(NODE_TEXT.XXS, 'text-muted-foreground', 'leading-tight')}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

MediaUploadAreaComponent.displayName = "MediaUploadArea";

export const MediaUploadArea = memo(MediaUploadAreaComponent);
