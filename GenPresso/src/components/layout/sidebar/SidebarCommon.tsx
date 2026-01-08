import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { IconNotification, IconChat, IconSettings } from "../../icons";

// --- Separator Component ---
export function Separator() {
  return (
    <div 
      className="h-px w-full shrink-0 bg-gradient-to-r from-transparent via-glass-border to-transparent" 
      data-name="Line" 
    />
  );
}

// --- Quick Action Components ---
export function QuickActionButton({ 
  icon, 
  label, 
  badge, 
  dataAttribute,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  badge?: number; 
  dataAttribute?: string;
  onClick?: () => void;
}) {
  const { language } = useLanguage();
  
  // 영문일 때 폰트 크기 축소 (10px)
  const fontSize = language === 'en' ? '10px' : undefined;

  return (
    <div className="flex-1 relative rounded-2xl" data-name={label}>
      <button 
        className="group w-full h-full flex flex-col gap-0 items-center justify-center px-1 py-2 rounded-2xl min-h-10 min-w-10 border-2 border-transparent hover:border-transparent active:border-primary transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-glass-hover-bg"
        onClick={onClick}
        {...(dataAttribute && { [dataAttribute]: "true" })}
        aria-label={label}
      >
        <div className="quick-action-icon w-4 h-4 flex items-center justify-center relative transition-colors duration-200 text-glass-icon group-hover:text-primary">
          {icon}
          {badge !== undefined && badge > 0 && (
            <div 
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive z-10 shadow-[0_0_0_1px_var(--color-glass-bg)]"
              aria-hidden="true"
            />
          )}

        </div>
        <span 
          className="text-xs text-center whitespace-nowrap mt-0.5 transition-colors duration-200 text-glass-text group-hover:text-primary"
          style={{ fontSize }}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

export function QuickActions({ onNotificationClick, onMessageClick }: { onNotificationClick?: () => void; onMessageClick?: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="basis-0 content-stretch flex gap-px grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Quick Actions">
      <QuickActionButton 
        icon={<IconNotification size={16} color="currentColor" />} 
        label={t('nav.notification')} 
        badge={2} 
        onClick={onNotificationClick} 
      />
      <QuickActionButton 
        icon={<IconChat size={16} color="currentColor" />} 
        label={t('nav.message')} 
        badge={1} 
        onClick={onMessageClick} 
      />
      <QuickActionButton 
        icon={<IconSettings size={16} color="currentColor" />} 
        label={t('nav.settings')} 
        dataAttribute="data-settings-button" 
      />
    </div>
  );
}
