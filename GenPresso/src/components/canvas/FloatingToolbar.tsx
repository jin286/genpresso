import React, { useMemo, useCallback } from "react";
import { ChevronDown, Info, Plus, Minus, Volume2, VolumeX, Music, Upload, Zap } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Badge } from "../ui/badge";
import type { NodeType } from "./NodeCard";
import { MODEL_DATA, RATIO_OPTIONS, REPEAT_COUNT_RANGE, SOUND_OPTIONS, VIDEO_LENGTH_RANGE } from "./constants";
import { getAvailableModels } from "./utils";
import { ModelSelectionDialog } from "./ModelSelectionDialog";
import { useLanguage } from "../../contexts/LanguageContext";

interface FloatingToolbarProps {
  nodeType: NodeType;
  selectedModel: string;
  selectedRatio: string;
  repeatCount: number;
  selectedSound?: string;
  videoLength?: number;
  onModelChange: (model: string) => void;
  onRatioChange: (ratio: string) => void;
  onRepeatCountChange: (count: number) => void;
  onSoundChange?: (sound: string) => void;
  onVideoLengthChange?: (length: number) => void;
}

const SOUND_ICONS = {
  'none': VolumeX,
  'ai-generated': Volume2,
  'bgm': Music,
  'upload': Upload,
} as const;

export const FloatingToolbar = React.memo(function FloatingToolbar({
  nodeType,
  selectedModel,
  selectedRatio,
  repeatCount,
  selectedSound = 'none',
  videoLength = VIDEO_LENGTH_RANGE.MIN,
  onModelChange,
  onRatioChange,
  onRepeatCountChange,
  onSoundChange,
  onVideoLengthChange,
}: FloatingToolbarProps) {
  const availableModels = useMemo(() => getAvailableModels(nodeType), [nodeType]);
  
  React.useEffect(() => {
    if (!selectedModel || !availableModels.find(m => m.id === selectedModel)) {
      if (availableModels.length > 0) {
        onModelChange(availableModels[0].id);
      }
    }
  }, [nodeType, availableModels, selectedModel, onModelChange]);
  
  const currentModel = useMemo(() => MODEL_DATA.find(m => m.id === selectedModel), [selectedModel]);
  const currentRatio = useMemo(() => RATIO_OPTIONS.find(r => r.id === selectedRatio), [selectedRatio]);
  const currentSound = useMemo(() => SOUND_OPTIONS.find(s => s.id === selectedSound), [selectedSound]);
  const SoundIcon = currentSound ? SOUND_ICONS[currentSound.id as keyof typeof SOUND_ICONS] : VolumeX;
  const isVideoModel = currentModel?.type === 'video';
  
  // 비디오 노드는 16:9(가로)와 9:16(세로)만 표시
  const availableRatios = useMemo(() => {
    if (isVideoModel) {
      return RATIO_OPTIONS.filter(r => r.id === '16:9' || r.id === '9:16');
    }
    return RATIO_OPTIONS;
  }, [isVideoModel]);

  const handleDecreaseCount = useCallback(() => {
    onRepeatCountChange(Math.max(REPEAT_COUNT_RANGE.MIN, repeatCount - 1));
  }, [repeatCount, onRepeatCountChange]);

  const handleIncreaseCount = useCallback(() => {
    onRepeatCountChange(Math.min(REPEAT_COUNT_RANGE.MAX, repeatCount + 1));
  }, [repeatCount, onRepeatCountChange]);

  // 영상 길이 조정 핸들러
  const handleDecreaseVideoLength = useCallback(() => {
    if (onVideoLengthChange) {
      onVideoLengthChange(Math.max(VIDEO_LENGTH_RANGE.MIN, videoLength - VIDEO_LENGTH_RANGE.STEP));
    }
  }, [videoLength, onVideoLengthChange]);

  const handleIncreaseVideoLength = useCallback(() => {
    if (onVideoLengthChange && currentModel?.videoLength) {
      // 모델의 최대 시간 추출 (예: "20초" → 20)
      const maxLength = parseInt(currentModel.videoLength);
      onVideoLengthChange(Math.min(maxLength, videoLength + VIDEO_LENGTH_RANGE.STEP));
    }
  }, [videoLength, onVideoLengthChange, currentModel]);

  const { t } = useLanguage();

  return (
    <div 
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full border-[0.5px] border-solid whitespace-nowrap"
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
      role="toolbar"
      aria-label={t('canvas.floatingToolbar.generationOptions')}
    >
      {/* Model 선택 */}
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className="flex items-center gap-1.5 px-2 h-9 rounded-full hover:bg-secondary/10 transition-colors max-w-[140px]"
            aria-label={t('canvas.floatingToolbar.selectModel')}
            title={currentModel?.label || t('canvas.floatingToolbar.selectModel')}
          >
            <span className="text-sm truncate">{currentModel?.label || t('canvas.floatingToolbar.selectModel')}</span>
            <ChevronDown className="w-5 h-5 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">{t('canvas.floatingToolbar.modelSelection')}</p>
            {availableModels.map((model) => (
              <button
                key={model.id}
                className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-secondary/10 transition-colors ${
                  selectedModel === model.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => onModelChange(model.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm truncate">{model.label}</span>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0 flex items-center gap-1 shrink-0">
                      {model.credits}
                      <Zap className="w-3 h-3 fill-current" />
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {model.workflow}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Ratio 선택 */}
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className="flex items-center gap-1.5 px-2 h-9 rounded-full hover:bg-secondary/10 transition-colors"
            aria-label={t('canvas.floatingToolbar.selectRatio')}
          >
            <span className="text-sm">{currentRatio?.id || t('canvas.floatingToolbar.selectRatio')}</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-28" align="start">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">{t('canvas.floatingToolbar.ratioSetting')}</p>
            {availableRatios.map((ratio) => (
              <button
                key={ratio.id}
                className={`w-full px-2 py-1.5 rounded-lg text-left hover:bg-secondary/10 transition-colors ${
                  selectedRatio === ratio.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => onRatioChange(ratio.id)}
              >
                <div className="flex items-center gap-2">
                  <div className={`border-[1.5px] border-current rounded-[1px] ${
                    ratio.id === '1:1' ? 'w-3.5 h-3.5' :
                    ratio.id === '16:9' ? 'w-5 h-3' :
                    ratio.id === '9:16' ? 'w-3 h-5' :
                    ratio.id === '4:3' ? 'w-4 h-3' :
                    ratio.id === '3:4' ? 'w-3 h-4' : 'w-3.5 h-3.5'
                  }`} />
                  <span className="text-sm">{ratio.id}</span>
                </div>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Sound 선택 (비디오 모델만) */}
      {isVideoModel && onSoundChange && (
        <Popover>
          <PopoverTrigger asChild>
            <button 
              className="flex items-center gap-1.5 px-2 h-9 rounded-full hover:bg-secondary/10 transition-colors"
              aria-label={t('canvas.floatingToolbar.selectSound')}
            >
              <SoundIcon className="w-5 h-5" />
              <span className="text-sm">{currentSound?.label || 'Sound'}</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-44" align="start">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">{t('canvas.floatingToolbar.soundSetting')}</p>
              {SOUND_OPTIONS.map((sound) => {
                const Icon = SOUND_ICONS[sound.id as keyof typeof SOUND_ICONS];
                return (
                  <button
                    key={sound.id}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-secondary/10 transition-colors ${
                      selectedSound === sound.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => onSoundChange(sound.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{sound.label}</span>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* 영상 길이 조정 (비디오 모델만, 사운드와 동일 조건) */}
      {isVideoModel && onSoundChange && onVideoLengthChange && (
        <div className="flex items-center gap-1">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDecreaseVideoLength}
            disabled={videoLength <= VIDEO_LENGTH_RANGE.MIN}
            aria-label={t('canvas.floatingToolbar.decreaseVideoLength')}
          >
            <Minus className="w-5 h-5" aria-hidden="true" />
          </button>
          <span className="text-sm min-w-[3ch] text-center" aria-label={t('canvas.floatingToolbar.seconds', { count: videoLength })}>
            {t('canvas.floatingToolbar.seconds', { count: videoLength })}
          </span>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleIncreaseVideoLength}
            disabled={currentModel?.videoLength ? videoLength >= parseInt(currentModel.videoLength) : true}
            aria-label={t('canvas.floatingToolbar.increaseVideoLength')}
          >
            <Plus className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* 반복 생성 횟수 */}
      <div className="flex items-center gap-1">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDecreaseCount}
          disabled={repeatCount <= REPEAT_COUNT_RANGE.MIN}
          aria-label={t('canvas.floatingToolbar.decreaseRepeatCount')}
        >
          <Minus className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className="text-sm min-w-[2ch] text-center" aria-label={t('canvas.floatingToolbar.repeatTimes', { count: repeatCount })}>
          {repeatCount}
        </span>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleIncreaseCount}
          disabled={repeatCount >= REPEAT_COUNT_RANGE.MAX}
          aria-label={t('canvas.floatingToolbar.increaseRepeatCount')}
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* 정보 아이콘 */}
      <ModelSelectionDialog
        nodeType={nodeType}
        selectedModel={selectedModel}
        repeatCount={repeatCount}
        availableModels={availableModels}
        onModelChange={onModelChange}
      >
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors"
          aria-label={t('canvas.floatingToolbar.modelInfo')}
        >
          <Info className="w-5 h-5" />
        </button>
      </ModelSelectionDialog>
    </div>
  );
});

FloatingToolbar.displayName = "FloatingToolbar";