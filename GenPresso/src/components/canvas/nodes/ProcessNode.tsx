import React from "react";
import { IconSparkles } from "../../icons";
import { ExpandToggle } from "./ExpandToggle";
import { MetadataGrid } from "./MetadataGrid";
import {
  NODE_PADDING,
  NODE_GAP,
  NODE_BUTTON,
  NODE_RADIUS,
  NODE_BORDER,
  NODE_TEXT,
  FLEX,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";

interface ProcessNodeProps {
  metadata?: Record<string, any>;
  isExpanded: boolean;
  onExpandToggle: () => void;
}

export const ProcessNode = React.memo<ProcessNodeProps>(({
  metadata,
  isExpanded,
  onExpandToggle,
}) => {
  const { t } = useLanguage();
  const targetType = metadata?.targetType === "video" ? t('node.types.video') : t('node.types.image');
  const generatingText = metadata?.targetType === "video" ? t('node.videoGenerating') : t('node.imageGenerating');

  return (
    <>
      <div className={NODE_PADDING.ALL}>
        <div className={cn(
          'w-full aspect-square',
          NODE_RADIUS.SM,
          NODE_BORDER.DEFAULT,
          FLEX.CENTER
        )}>
          <div className={cn(FLEX.COL, 'items-center justify-center', NODE_GAP.LG, 'text-center')}>
            <div className={cn('relative', NODE_BUTTON.SIZE_LG_CLASS)}>
              <div className={cn(
                'absolute inset-0',
                NODE_RADIUS.FULL,
                'border-4 border-primary/20 border-t-primary animate-spin'
              )} />
              <div className={cn(
                'absolute inset-0',
                NODE_RADIUS.FULL,
                'bg-primary/20',
                FLEX.CENTER
              )}>
                <IconSparkles size={28} color="var(--primary)" className="animate-pulse" />
              </div>
            </div>
            <p className={NODE_TEXT.SM}>{generatingText}</p>
          </div>
        </div>
      </div>

      <ExpandToggle isExpanded={isExpanded} onToggle={onExpandToggle} />

      {isExpanded && (
        <div className={cn(NODE_PADDING.ALL, NODE_BORDER.TOP, 'space-y-2')}>
          <div>
            <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>생성 정보</p>
            <p className={cn(NODE_TEXT.XS, 'text-foreground')}>{targetType} 생성 중...</p>
          </div>

          {metadata?.prompt && (
            <div>
              <p className={cn(NODE_TEXT.XS, 'text-muted-foreground mb-1')}>{t('node.prompt')}</p>
              <p className={cn(NODE_TEXT.XS, 'text-foreground')}>{metadata.prompt}</p>
            </div>
          )}

          <MetadataGrid
            items={[
              {
                label: t('node.model'),
                value:
                  metadata?.model ||
                  (metadata?.targetType === "video"
                    ? "Runway Gen-3"
                    : "FLUX 1.1 Pro"),
              },
              {
                label: t('node.aspectRatio'),
                value:
                  metadata?.aspectRatio ||
                  (metadata?.targetType === "video" ? "16:9" : "1:1"),
              },
              ...(metadata?.targetType === "video"
                ? [
                    {
                      label: t('node.sound'),
                      value: metadata?.sound || t('node.mute'),
                    },
                  ]
                : []),
            ]}
          />
        </div>
      )}
    </>
  );
});

ProcessNode.displayName = "ProcessNode";
