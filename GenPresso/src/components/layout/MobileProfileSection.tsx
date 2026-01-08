import React from 'react';
import { User } from 'lucide-react';
import { MobileQuickAction } from './MobileQuickAction';
import { IconNotification, IconChat, IconSettings } from '../icons';

interface MobileProfileSectionProps {
  onNotificationClick: () => void;
  onMessageClick: () => void;
  onSettingsClick: () => void;
}

export const MobileProfileSection = ({
  onNotificationClick,
  onMessageClick,
  onSettingsClick
}: MobileProfileSectionProps) => {
  return (
    <div 
      className="relative rounded-[24px] shrink-0 w-full overflow-hidden mb-4" 
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'var(--color-glass-bg)',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      <div aria-hidden="true" className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[24px]" style={{ borderColor: 'var(--color-glass-border)' }} />
      <div className="flex flex-col p-6 gap-6 relative z-10">
        {/* 유저 정보 */}
        <div className="flex items-center gap-4">
          <div className="relative rounded-full shrink-0 size-14 bg-primary/20 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl tracking-[-0.02em] font-bold text-neutral-100">홍길동</span>
            <span className="text-sm font-medium text-muted-foreground">Designer</span>
          </div>
        </div>
        
        {/* 빠른 액션 - 간격 조정 */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <MobileQuickAction
            Icon={IconNotification}
            label="알림"
            badge={2}
            onClick={onNotificationClick}
          />
          <MobileQuickAction
            Icon={IconChat}
            label="메세지"
            badge={1}
            onClick={onMessageClick}
          />
          <MobileQuickAction
            Icon={IconSettings}
            label="설정"
            onClick={onSettingsClick}
          />
        </div>
      </div>
    </div>
  );
};
