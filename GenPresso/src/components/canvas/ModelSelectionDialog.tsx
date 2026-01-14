import React from "react";
import { Image, Video, Zap } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { NodeType } from "./NodeCard";
import type { ModelInfo } from "./constants";
import { calculateTotalCredits, sortRatiosByOrder } from "./utils";

interface ModelSelectionDialogProps {
  nodeType: NodeType;
  selectedModel: string;
  repeatCount: number;
  availableModels: ModelInfo[];
  onModelChange: (model: string) => void;
  children: React.ReactNode;
}

export const ModelSelectionDialog = React.memo(function ModelSelectionDialog({
  nodeType,
  selectedModel,
  repeatCount,
  availableModels,
  onModelChange,
  children,
}: ModelSelectionDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="max-w-[calc(100vw-2rem)] sm:max-w-6xl max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {t('canvas.modelSelection.title')} {nodeType === 'text' ? `(${t('canvas.nodeTypes.text')})` : nodeType === 'image' ? `(${t('canvas.nodeTypes.image')})` : `(${t('canvas.nodeTypes.video')})`}
          </DialogTitle>
          <DialogDescription>
            {nodeType === 'text' && t('canvas.modelSelection.textDescription')}
            {nodeType === 'image' && t('canvas.modelSelection.imageDescription')}
            {nodeType === 'video' && t('canvas.modelSelection.videoDescription')}
          </DialogDescription>
        </VisuallyHidden>

        {/* 커스텀 헤더 */}
        <div 
          className="flex flex-col px-6 py-4 border-b shrink-0" 
          style={{ borderColor: "var(--color-glass-border)" }}
        >
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            {t('canvas.modelSelection.title')}
            <span className="text-muted-foreground font-normal text-sm">
              {nodeType === 'text' && `(${t('canvas.nodeTypes.text')})`}
              {nodeType === 'image' && `(${t('canvas.nodeTypes.image')})`}
              {nodeType === 'video' && `(${t('canvas.nodeTypes.video')})`}
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {nodeType === 'text' && t('canvas.modelSelection.textShortDescription')}
            {nodeType === 'image' && t('canvas.modelSelection.imageShortDescription')}
            {nodeType === 'video' && t('canvas.modelSelection.videoShortDescription')}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableModels.map((model) => {
              const isSelected = selectedModel === model.id;
              const modelTotalCredits = calculateTotalCredits(model.credits, repeatCount);
              
              return (
                <button
                  key={model.id}
                  className={`group relative p-4 rounded-2xl border-[2px] text-left transition-all hover:scale-[1.01] h-full flex flex-col ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-transparent bg-secondary/5 hover:bg-secondary/10 hover:border-primary/30'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--primary)' : 'var(--color-glass-border)',
                  }}
                  onClick={() => onModelChange(model.id)}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm ring-2 ring-background">
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col h-full w-full">
                    {/* 상단 영역: 헤더 + 설명 */}
                    <div className="space-y-3">
                      {/* 모델명 & 워크플로우 */}
                      <div className="flex items-center gap-2">
                        {model.type === 'image' ? (
                          <Image className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <Video className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <h4 className="font-semibold text-sm">{model.label}</h4>
                        <span className="text-xs text-primary ml-auto font-medium">{model.workflow}</span>
                      </div>

                      {/* 모델 설명 - 높이 통일을 위해 min-h 설정 및 줄 수 제한 */}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {t(`model.descriptions.${model.id}`) || model.description}
                      </p>
                    </div>

                    {/* 모델 상세 정보 - 항상 하단에 고정 */}
                    <div className="mt-3 space-y-2 pt-3 border-t text-xs" style={{ borderColor: 'var(--color-glass-border)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('model.maxResolution')}</span>
                        <span className="font-medium text-foreground">{model.resolution}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('model.credits')}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-foreground">{model.credits}</span>
                          <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('model.ratio')}</span>
                        <span className="text-xs text-foreground">
                          {sortRatiosByOrder(model.supportedRatios).join(' · ')}
                        </span>
                      </div>
                      
                      {model.type === 'video' && model.videoLength && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{t('model.maxDuration')}</span>
                          <span className="font-medium text-foreground">{model.videoLength}{t('model.videoLengthUnit')}</span>
                        </div>
                      )}
                      
                      {model.type === 'video' && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">{t('model.audio')}</span>
                          <span className="font-medium text-foreground">{model.audioSupport ? t('model.supported') : t('model.notSupported')}</span>
                        </div>
                      )}
                      
                      {repeatCount > 1 && (
                        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--color-glass-border)' }}>
                          <span className="text-muted-foreground">{t('model.totalCredits')}</span>
                          <span className="text-primary font-medium">{modelTotalCredits}{t('model.creditsUnit')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});