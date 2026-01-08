import React from 'react';
import { VisuallyHidden } from '../ui/visually-hidden';
import { DrawerContent, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { CreditChargeDialog } from '../forms/CreditChargeDialog';
import { MobileMenuButton } from './MobileMenuButton';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../../contexts/LanguageContext';
import { MobileProfileSection } from './MobileProfileSection';
import { CreditCard } from './CreditCard';

// Import Icons
import IconStrokeFolder from '../../imports/IconStrokeFolder-188-2266';
import IconFilledFolder from '../../imports/IconFilledFolder-188-2279';
import IconStrokeBrookmark from '../../imports/IconStrokeBrookmark-191-22';
import IconFilledBrookmark from '../../imports/IconFilledBrookmark-191-36';
import IconStrokeChart from '../../imports/IconStrokeChart';
import IconFilledChart from '../../imports/IconFilledChart';

interface MobileDrawerContentProps {
  onNavigate: (page: 'main' | 'canvas' | 'settings' | 'projects' | 'favorites' | 'dashboard') => void;
  setIsNotificationOpen: (open: boolean) => void;
  setIsMessageOpen: (open: boolean) => void;
  setIsDrawerOpen: (open: boolean) => void;
  currentCredit: number;
  setCurrentCredit: (credit: number) => void;
}

export const MobileDrawerContent = ({
  onNavigate,
  setIsNotificationOpen,
  setIsMessageOpen,
  setIsDrawerOpen,
  currentCredit,
  setCurrentCredit,
}: MobileDrawerContentProps) => {
  const { t } = useLanguage();

  return (
    <DrawerContent 
      className="h-full w-[85vw] max-w-[400px] border-r border-[var(--color-glass-border)]"
      style={{
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        backgroundColor: 'var(--color-glass-bg)',
      }}
    >
      <VisuallyHidden>
        <DrawerTitle>네비게이션 메뉴</DrawerTitle>
        <DrawerDescription>프로필 정보, 네비게이션 메뉴 및 설정</DrawerDescription>
      </VisuallyHidden>
      <div className="relative overflow-y-auto px-4 pt-6 pb-8 flex flex-col h-full">
        {/* 프로필 섹션 - 모바일 최적화 (Compact & Big) */}
        <MobileProfileSection 
          onNotificationClick={() => setIsNotificationOpen(true)}
          onMessageClick={() => setIsMessageOpen(true)}
          onSettingsClick={() => {
            onNavigate('settings');
            setIsDrawerOpen(false);
          }}
        />
        
        {/* 크레딧 섹션 - 카드 스타일 변경 (Compact & Big) */}
        <CreditChargeDialog 
          currentCredit={currentCredit}
          onCreditUpdate={setCurrentCredit}
        >
          <CreditCard currentCredit={currentCredit} className="mb-6" />
        </CreditChargeDialog>
        


        {/* 메뉴 리스트 (폰트 확대) */}
        <div className="flex flex-col gap-1 mb-8">
          <div className="px-4 mb-4">
            <span className="text-lg font-bold" style={{ color: 'var(--color-glass-text)' }}>메뉴</span>
          </div>

          <MobileMenuButton
            label="프로젝트"
            icon={IconStrokeFolder}
            iconFilled={IconFilledFolder}
            onClick={() => {
              toast.success("프로젝트 페이지로 이동합니다.");
              setIsDrawerOpen(false);
            }}
          />

          <MobileMenuButton
            label="즐겨찾기"
            icon={IconStrokeBrookmark}
            iconFilled={IconFilledBrookmark}
            onClick={() => {
              toast.success("즐겨찾기 페이지로 이동합니다.");
              setIsDrawerOpen(false);
            }}
          />

          <MobileMenuButton
            label="대시보드"
            icon={IconStrokeChart}
            iconFilled={IconFilledChart}
            onClick={() => {
              toast.success("대시보드 페이지로 이동합니다.");
              setIsDrawerOpen(false);
            }}
          />
        </div>

        {/* Logout button (확대) */}
        <button
          className="w-full h-14 rounded-[20px] flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-sm mb-4"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
          onClick={() => {
            toast.success(t('toast.logoutSuccess'));
            setIsDrawerOpen(false);
          }}
        >
          <span className="text-lg font-bold leading-[1.5] text-neutral-200">{t('nav.logout')}</span>
        </button>
        
        {/* 약관 Footer */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
            <button className="hover:text-muted-foreground transition-colors">이용약관</button>
            <div className="w-[1px] h-3 bg-border/40" />
            <button className="hover:text-muted-foreground transition-colors">개인정보처리방침</button>
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-2">
            © 2025 GenPresso. All rights reserved.
          </p>
        </div>
      </div>
    </DrawerContent>
  );
};
