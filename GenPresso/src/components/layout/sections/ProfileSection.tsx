/**
 * 프로필 섹션 컴포넌트
 * 사이드바/모바일 드로어에 표시되는 프로필 영역입니다
 */

import React, { memo } from "react";
import { MobileQuickAction } from "../MobileQuickAction";
import { IconNotification, IconChat, IconSettings } from "../../icons";
import imgUserProfileImage from "figma:asset/f99beb83d5aa5153730131c6ce9d54f26edc0105.png";

interface ProfileSectionProps {
  userName?: string;
  userRole?: string;
  userBadge?: string;
  notificationCount?: number;
  messageCount?: number;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onSettingsClick?: () => void;
}

export const ProfileSection = memo(function ProfileSection({
  userName = "홍길동",
  userRole = "Product Designer",
  userBadge = "Member",
  notificationCount = 2,
  messageCount = 1,
  onNotificationClick,
  onMessageClick,
  onSettingsClick,
}: ProfileSectionProps) {
  return (
    <div 
      className="bg-[var(--color-glass-bg)] min-h-[140px] relative rounded-2xl mb-2"
      style={{
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
      }}
    >
      <div 
        aria-hidden="true" 
        className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-2xl" 
        style={{ 
          borderColor: 'var(--color-glass-border)', 
          boxShadow: 'var(--glass-shadow)' 
        }} 
      />
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center p-3 relative w-full">
          {/* 프로필 필드 */}
          <div className="relative rounded-lg shrink-0 w-full">
            <div className="flex flex-row items-center relative w-full">
              <div className="box-border content-stretch flex gap-2.5 items-center relative w-full px-3 py-1">
                <div className="pointer-events-none relative rounded-full shrink-0 size-13">
                  <img 
                    alt={userName} 
                    className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-full size-full" 
                    src={imgUserProfileImage} 
                  />
                  <div 
                    aria-hidden="true" 
                    className="absolute border-[0.5px] border-solid inset-0 rounded-full" 
                    style={{ borderColor: 'var(--color-glass-border)' }} 
                  />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 gap-1.5">
                  <div className="content-stretch flex gap-2 items-center relative rounded-2xl shrink-0 w-full">
                    <span className="text-neutral-100 tracking-[-0.02em] leading-[1.2] font-semibold whitespace-nowrap">
                      {userName}
                    </span>
                    <div 
                      className="box-border content-stretch flex gap-2 h-[18px] items-center px-2 py-0.5 relative rounded-lg shrink-0" 
                      style={{ backgroundColor: 'var(--member-badge-bg)' }}
                    >
                      <div 
                        aria-hidden="true" 
                        className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg" 
                        style={{ borderColor: 'var(--member-badge-border)' }} 
                      />
                      <span 
                        className="text-xs tracking-[-0.02em] leading-[1] font-medium whitespace-nowrap" 
                        style={{ color: 'var(--member-badge-text)' }}
                      >
                        {userBadge}
                      </span>
                    </div>
                  </div>
                  <span className="text-zinc-200 tracking-[-0.02em] leading-[1.2] font-normal whitespace-nowrap">
                    {userRole}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 빠른 액션 */}
          <div className="flex gap-2 items-stretch w-full min-h-[60px]">
            <MobileQuickAction
              Icon={IconNotification}
              label="알림"
              badge={notificationCount}
              onClick={onNotificationClick}
            />
            <MobileQuickAction
              Icon={IconChat}
              label="메세지"
              badge={messageCount}
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
    </div>
  );
});
