import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import { CloseButton } from "../ui/close-button";
import { useLanguage } from "../../contexts/LanguageContext";

interface ModelSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Model {
  id: string;
  name: string;
  type: 'image' | 'video' | '3d';
  provider: string;
  enabled: boolean;
  description: string;
}

// Mock model data
const MOCK_MODELS: Model[] = [
  // Image Models
  {
    id: 'zimage-turbo',
    name: 'Z-Image Turbo',
    type: 'image',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → Image',
  },
  {
    id: 'flux-2-pro',
    name: 'Flux 2 Pro',
    type: 'image',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → Image',
  },
  {
    id: 'flux-2-flex',
    name: 'Flux 2 Flex',
    type: 'image',
    provider: 'GenPresso',
    enabled: false,
    description: 'Text → Image',
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    type: 'image',
    provider: 'GenPresso',
    enabled: false,
    description: 'Text → Image',
  },
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    type: 'image',
    provider: 'GenPresso',
    enabled: false,
    description: 'Text → Image',
  },

  // Video Models
  {
    id: 'hailuo-2.3-standard-text',
    name: 'Hailuo 2.3 Standard',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → Video',
  },
  {
    id: 'hailuo-2.3-pro-text',
    name: 'Hailuo 2.3 Pro',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → Video',
  },
  {
    id: 'sora-2-text',
    name: 'Sora 2',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'Text → Video',
  },
  {
    id: 'veo-3.1-fast-text',
    name: 'VEO 3.1 Fast',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'Text → Video',
  },
  {
    id: 'veo-3.1-text',
    name: 'VEO 3.1',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → Video',
  },
  {
    id: 'veo-3.1-fast-image',
    name: 'VEO 3.1 Fast',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'Image → Video',
  },
  {
    id: 'veo-3.1-image',
    name: 'VEO 3.1',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Image → Video',
  },
  {
    id: 'veo-3.1-frame',
    name: 'VEO 3.1',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'First/Last Frame → Video',
  },
  {
    id: 'veo-3.1-fast-frame',
    name: 'VEO 3.1 Fast',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'First/Last Frame → Video',
  },
  {
    id: 'veo-3.1-reference',
    name: 'VEO 3.1',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Reference → Video',
  },
  {
    id: 'kling-01-reference',
    name: 'Kling 01',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'Reference → Video',
  },
  {
    id: 'sora-2-image',
    name: 'Sora 2',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Image → Video',
  },
  {
    id: 'hailuo-2.3-standard-image',
    name: 'Hailuo 2.3 Standard',
    type: 'video',
    provider: 'GenPresso',
    enabled: false,
    description: 'Image → Video',
  },
  {
    id: 'hailuo-2.3-pro-image',
    name: 'Hailuo 2.3 Pro',
    type: 'video',
    provider: 'GenPresso',
    enabled: true,
    description: 'Image → Video',
  },

  // 3D Models
  {
    id: 'meshy',
    name: 'Meshy',
    type: '3d',
    provider: 'GenPresso',
    enabled: true,
    description: 'Text → 3D',
  },
];

export function ModelSelectionDialog({ isOpen, onClose }: ModelSelectionDialogProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'image' | 'video' | '3d'>('image');
  const [models, setModels] = useState<Model[]>(MOCK_MODELS);

  const filteredModels = models.filter(m => m.type === activeTab);
  const imageCount = models.filter(m => m.type === 'image').length;
  const videoCount = models.filter(m => m.type === 'video').length;
  const threeDCount = models.filter(m => m.type === '3d').length;

  const handleToggleModel = (modelId: string) => {
    setModels(models.map(m => 
      m.id === modelId ? { ...m, enabled: !m.enabled } : m
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl mx-auto max-h-[85vh] flex flex-col p-0 gap-0 border-[0.5px] overflow-hidden [&>button]:hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {t('canvas.modelSelection.title')}
          </DialogTitle>
          <DialogDescription>
            {t('canvas.modelSelection.description')}
          </DialogDescription>
        </VisuallyHidden>

        {/* X 닫기 버튼 */}
        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 shrink-0">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="12" cy="6" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="18" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
          <h2 className="text-lg font-semibold text-foreground">{t('canvas.modelSelection.title')}</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <button
            onClick={() => setActiveTab('image')}
            className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
            style={activeTab === 'image' ? {
              background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
            } : {}}
          >
            <span className={`text-xs flex items-center gap-2 ${activeTab === 'image' ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('canvas.modelSelection.imageTab')}
              <span className="opacity-70">({imageCount})</span>
            </span>
            {activeTab === 'image' && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('video')}
            className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
            style={activeTab === 'video' ? {
              background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
            } : {}}
          >
            <span className={`text-xs flex items-center gap-2 ${activeTab === 'video' ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('canvas.modelSelection.videoTab')}
              <span className="opacity-70">({videoCount})</span>
            </span>
            {activeTab === 'video' && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('3d')}
            className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
            style={activeTab === '3d' ? {
              background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
            } : {}}
          >
            <span className={`text-xs flex items-center gap-2 ${activeTab === '3d' ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('canvas.modelSelection.3dTab')}
              <span className="opacity-70">({threeDCount})</span>
            </span>
            {activeTab === '3d' && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="h-[500px] overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            {filteredModels.map((model) => (
              <label
                key={model.id}
                className="flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all"
                style={{
                  backgroundColor: model.enabled ? 'var(--agent-user-message-bg)' : 'var(--color-glass-bg)',
                  borderColor: model.enabled ? 'var(--color-primary)' : 'var(--color-glass-border)',
                  borderWidth: model.enabled ? '2px' : '0.5px',
                }}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={model.enabled}
                  onChange={() => handleToggleModel(model.id)}
                  className="w-5 h-5 rounded border-2 cursor-pointer accent-primary"
                  style={{
                    borderColor: 'var(--color-glass-border)',
                  }}
                />
                
                {/* Model Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">
                    {model.name}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {model.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}