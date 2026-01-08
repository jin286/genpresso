import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useLanguage } from "../../contexts/LanguageContext";

interface ShortcutGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  key: string;
  description: string;
}

interface ShortcutCategory {
  category: string;
  items: ShortcutItem[];
}

/**
 * ShortcutGuide - 캔버스 단축키 가이드 Dialog
 * 
 * 모든 단축키를 카테고리별로 정리하여 표시
 */
export const ShortcutGuide = React.memo(function ShortcutGuide({ isOpen, onClose }: ShortcutGuideProps) {
  const { t } = useLanguage();
  
  const shortcuts = [
    {
      category: t('canvas.shortcutGuide.toolSwitch'),
      items: [
        { key: "V", description: t('canvas.shortcutGuide.selectTool') },
        { key: "H", description: t('canvas.shortcutGuide.handTool') },
        { key: "N", description: t('canvas.shortcutGuide.nodeAddMode') },
        { key: "Space", description: t('canvas.shortcutGuide.handToolTemp') },
        { key: "Esc", description: t('canvas.shortcutGuide.deselectAll') },
      ],
    },
    {
      category: t('canvas.shortcutGuide.canvasControl'),
      items: [
        { key: "Ctrl/Cmd + Wheel", description: t('canvas.shortcutGuide.zoomInOut') },
        { key: "Shift + Drag", description: t('canvas.shortcutGuide.canvasPan') },
        { key: "Space + Drag", description: t('canvas.shortcutGuide.canvasPan') },
      ],
    },
    {
      category: t('canvas.shortcutGuide.nodeSelection'),
      items: [
        { key: "Click", description: t('canvas.shortcutGuide.selectSingle') },
        { key: "Ctrl/Cmd + Click", description: t('canvas.shortcutGuide.selectMulti') },
        { key: "(+) " + t('common.add'), description: t('canvas.shortcutGuide.connectAll') },
      ],
    },
    {
      category: t('canvas.shortcutGuide.nodeManipulation'),
      items: [
        { key: "Delete / Backspace", description: t('canvas.shortcutGuide.deleteNodes') },
        { key: "Ctrl/Cmd + D", description: t('canvas.shortcutGuide.duplicateNodes') },
        { key: "Ctrl/Cmd + Z", description: t('canvas.shortcutGuide.undo') },
        { key: "Ctrl/Cmd + Shift + Z", description: t('canvas.shortcutGuide.redo') },
      ],
    },
  ];
  
  const glassStyle = useMemo(() => ({
    backgroundColor: 'var(--color-glass-bg)',
    borderColor: 'var(--color-glass-border)',
  }), []);

  const kbdStyle = useMemo(() => ({
    backgroundColor: 'var(--color-glass-hover-bg)',
    borderColor: 'var(--color-glass-border)',
  }), []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh] flex flex-col border-[0.5px]"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <DialogHeader>
          <DialogTitle>{t('canvas.shortcutGuide.title')}</DialogTitle>
          <DialogDescription>
            {t('canvas.shortcutGuide.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 space-y-6 py-4 pr-2">
          {shortcuts.map((category) => (
            <section key={category.category}>
              <h3 className="text-sm mb-3">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-2 px-3 rounded-lg"
                    style={glassStyle}
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                    <kbd 
                      className="px-2 py-1 rounded text-xs border shrink-0"
                      style={kbdStyle}
                      aria-label={`단축키: ${item.key}`}
                    >
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-4 border-t shrink-0"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <p>{t('canvas.shortcutGuide.macNote')}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
});