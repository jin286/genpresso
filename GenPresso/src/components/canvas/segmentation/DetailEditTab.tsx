import React, { useState, useCallback } from "react";
import { ArrowLeft, Save, RefreshCw, Image, Sparkles } from "lucide-react";
import { CloseButton } from "../../ui/close-button";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Slider } from "../../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import type { Segment, DetailEditVersion } from "./types";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../../contexts/LanguageContext";

interface DetailEditTabProps {
  segment: Segment;
  onSegmentUpdate: (updates: Partial<Segment>) => void;
  onClose: () => void;
  onApplyToCanvas: () => void;
  showGallery: boolean;
  onToggleGallery: () => void;
}

/**
 * Detail Edit Tab + Segment Gallery
 * 
 * 목표: "세부편집 팝업/탭·노드 라인·갤러리 리유즈"까지 한 장에
 * 
 * - 탭바: [Canvas] [Detail: Seg#12] (자동 생성)
 * - 좌: 파라미터/프롬프트
 * - 중: 미리보기 (전/후 토글)
 * - 우: 노드 라인, 가중치 슬라이더
 * - 하단: [적용 후 캔버스로] [갤러리에 저장]
 * 
 * Segment Gallery (우측 Dock):
 * - 즐겨찾기/최근 사용/내 파트
 * - 드래그 → 세부편집 탭 드롭
 */
const DetailEditTabComponent = ({
  segment,
  onSegmentUpdate,
  onClose,
  onApplyToCanvas,
  showGallery,
  onToggleGallery,
}: DetailEditTabProps) => {
  const { t } = useLanguage();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [loraModel, setLoraModel] = useState('');
  const [weight, setWeight] = useState(0.7);
  const [versions, setVersions] = useState<DetailEditVersion[]>([
    {
      id: 'v1',
      timestamp: new Date(),
      thumbnailUrl: segment.thumbnailUrl,
      prompt: segment.prompt || '',
      parameters: { brightness, contrast, saturation, blur },
    },
  ]);
  const [showBefore, setShowBefore] = useState(false);

  const handleSave = useCallback(() => {
    const newVersion: DetailEditVersion = {
      id: `v${versions.length + 1}`,
      timestamp: new Date(),
      thumbnailUrl: segment.thumbnailUrl,
      prompt: segment.prompt || '',
      parameters: { brightness, contrast, saturation, blur },
    };
    setVersions([...versions, newVersion]);
    toast.success(t('segment.versionSaved'));
  }, [versions, segment.thumbnailUrl, segment.prompt, brightness, contrast, saturation, blur, t]);

  const handleRegenerate = useCallback(() => {
    toast.info(t('segment.regenerating'), { duration: 2000 });
    setTimeout(() => {
      toast.success(t('segment.regenerationComplete'));
    }, 2000);
  }, [t]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 탭바 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-glass-border)]">
        <Tabs defaultValue="detail" className="w-full">
          <TabsList className="h-10">
            <TabsTrigger value="canvas" onClick={onClose} className="gap-2">
              Canvas
            </TabsTrigger>
            <TabsTrigger value="detail" className="gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Detail: {segment.name}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* X 닫기 버튼 */}
        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>
      </div>

      {/* 메인 레이아웃: 2열 그리드 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 좌측: 파라미터 & 프롬프트 */}
        <div 
          className="w-80 border-r flex flex-col overflow-y-auto"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <div className="p-3 space-y-4">
            {/* 프롬프트 */}
            <div>
              <Label className="text-xs font-semibold text-foreground">Prompt</Label>
              <Textarea
                value={segment.prompt || ''}
                onChange={(e) => onSegmentUpdate({ prompt: e.target.value })}
                className="text-xs mt-1 min-h-[100px] resize-none"
                placeholder="세그먼트 설명 또는 프롬프트..."
              />
            </div>

            {/* 이미지 조정 */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-foreground">이미지 조정</Label>

              <div>
                <Label className="text-xs text-muted-foreground">밝기</Label>
                <Slider
                  value={[brightness]}
                  onValueChange={([v]) => setBrightness(v)}
                  min={0}
                  max={200}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{brightness}%</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">대비</Label>
                <Slider
                  value={[contrast]}
                  onValueChange={([v]) => setContrast(v)}
                  min={0}
                  max={200}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{contrast}%</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">채도</Label>
                <Slider
                  value={[saturation]}
                  onValueChange={([v]) => setSaturation(v)}
                  min={0}
                  max={200}
                  step={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{saturation}%</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">블러</Label>
                <Slider
                  value={[blur]}
                  onValueChange={([v]) => setBlur(v)}
                  min={0}
                  max={20}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{blur}px</p>
              </div>
            </div>

            {/* LoRA 모델 */}
            <div>
              <Label className="text-xs font-semibold text-foreground">LoRA 모델</Label>
              <Input
                value={loraModel}
                onChange={(e) => setLoraModel(e.target.value)}
                className="h-8 text-xs mt-1"
                placeholder="모델 ID 또는 경로"
              />
            </div>

            {/* 가중치 */}
            <div>
              <Label className="text-xs font-semibold text-foreground">가중치 (Weight)</Label>
              <Slider
                value={[weight * 100]}
                onValueChange={([v]) => setWeight(v / 100)}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">{(weight * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* 중앙: 미리보기 */}
        <div className="flex-1 flex flex-col">
          {/* 전/후 토글 */}
          <div className="px-3 py-2.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-glass-border)' }}>
            <Label className="text-xs font-semibold text-foreground">미리보기</Label>
            <Button
              size="sm"
              variant={showBefore ? 'default' : 'outline'}
              onClick={() => setShowBefore(!showBefore)}
              className="h-7 text-xs"
            >
              {showBefore ? t('segment.original') : t('segment.edited')}
            </Button>
          </div>

          {/* 이미지 */}
          <div className="flex-1 p-6 flex items-center justify-center bg-muted/30">
            <div className="relative max-w-full max-h-full">
              <ImageWithFallback
                src={segment.thumbnailUrl}
                alt={segment.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{
                  filter: showBefore
                    ? 'none'
                    : `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`,
                }}
              />

              {/* 배지 */}
              <Badge
                variant={showBefore ? 'secondary' : 'default'}
                className="absolute top-2 right-2"
              >
                {showBefore ? 'Before' : 'After'}
              </Badge>
            </div>
          </div>

          {/* 버전 히스토리 */}
          <div 
            className="px-3 py-2.5 border-t flex items-center gap-2 overflow-x-auto"
            style={{ borderColor: 'var(--color-glass-border)' }}
          >
            <Label className="text-xs font-semibold text-foreground shrink-0">버전 히스토리</Label>
            {versions.map((version, idx) => (
              <div
                key={version.id}
                className="w-12 h-12 rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all shrink-0"
                title={`버전 ${idx + 1} - ${version.timestamp.toLocaleTimeString()}`}
              >
                <ImageWithFallback
                  src={version.thumbnailUrl}
                  alt={`v${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 노드 라인 & 미니맵 */}
        <div
          className="w-80 border-l flex flex-col"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <div className="p-3 space-y-4">
            {/* 노드 연결 미니맵 */}
            <div>
              <Label className="text-xs font-semibold text-foreground">노드 연결</Label>
              <div 
                className="mt-2 p-4 rounded-lg bg-muted/30 aspect-square flex items-center justify-center"
              >
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* 세그먼트 노드 */}
                  <rect x="10" y="80" width="60" height="40" rx="8" fill="var(--primary)" opacity="0.3" />
                  <text x="40" y="105" textAnchor="middle" className="text-xs fill-foreground">
                    Segment
                  </text>

                  {/* Mix Node */}
                  <rect x="130" y="80" width="60" height="40" rx="8" fill="var(--primary)" opacity="0.8" />
                  <text x="160" y="105" textAnchor="middle" className="text-xs fill-primary-foreground">
                    Mix
                  </text>

                  {/* 연결선 */}
                  <path
                    d="M 70 100 Q 100 100 130 100"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* 가중치 표시 */}
                  <circle cx="100" cy="100" r="12" fill="var(--background)" stroke="var(--primary)" strokeWidth="2" />
                  <text x="100" y="105" textAnchor="middle" className="text-xs font-semibold fill-primary">
                    {(weight * 100).toFixed(0)}
                  </text>
                </svg>
              </div>
            </div>

            {/* 가중치 조정 */}
            <div>
              <Label className="text-xs font-semibold text-foreground">Mix 가중치</Label>
              <Slider
                value={[weight * 100]}
                onValueChange={([v]) => setWeight(v / 100)}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">약함</span>
                <span className="text-xs font-semibold text-primary">{(weight * 100).toFixed(0)}%</span>
                <span className="text-xs text-muted-foreground">강함</span>
              </div>
            </div>

            {/* 갤러리 토글 */}
            <Button
              onClick={onToggleGallery}
              variant="outline"
              className="w-full h-9 text-xs gap-2"
            >
              <Image className="w-4 h-4" />
              {showGallery ? '갤러리 닫기' : '갤러리 열기'}
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div 
        className="px-12 py-3 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--color-glass-border)' }}
      >
        <div className="flex items-center gap-2">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            갤러리에 저장
          </Button>

          <Button
            onClick={handleRegenerate}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            재생성
          </Button>

          <Button
            onClick={onApplyToCanvas}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            적용 후 캔버스로
          </Button>
        </div>
      </div>
    </div>
  );
};

DetailEditTabComponent.displayName = 'DetailEditTab';

export const DetailEditTab = React.memo(DetailEditTabComponent);
