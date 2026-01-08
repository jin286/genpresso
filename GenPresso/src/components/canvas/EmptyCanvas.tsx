import { memo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const EmptyCanvasComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4 pointer-events-none select-none">
        <div 
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center border"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-muted-foreground"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium mb-2">{t('canvas.emptyTitle')}</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            {t('canvas.emptyInstructions')}<br />
            {t('canvas.emptyShortcut')} <kbd className="px-2 py-1 bg-muted rounded text-xs">N</kbd>{t('canvas.emptyShortcutAction')}
          </p>
        </div>
      </div>
    </div>
  );
};

EmptyCanvasComponent.displayName = "EmptyCanvas";

export const EmptyCanvas = memo(EmptyCanvasComponent);
