import React, { memo, useState } from "react";
import { GenPressoLogo } from "./GenPressoLogo";
import { useLanguage } from "../../contexts/LanguageContext";
import { Languages } from "lucide-react";
import { IconUnifiedCoins } from "../icons";
import { CreditHistoryDialog } from "../forms/CreditHistoryDialog";
import { CreditChargeDialog } from "../forms/CreditChargeDialog";

// --- Credit Components ---

function CreditText({ amount = 100 }: { amount?: number }) {
  return (
    <div className="content-stretch flex gap-1 items-center relative shrink-0" data-name="text">
      <span 
        className="text-sm leading-[1] flex items-center justify-center h-full text-glass-text font-medium" 
      >
        {amount.toLocaleString()}
      </span>
    </div>
  );
}

interface CreditButtonProps {
  useChargeDialog?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CreditButton({ useChargeDialog = false, onClick, className = "" }: CreditButtonProps) {
  const [currentCredit, setCurrentCredit] = useState(1250);
  const { t } = useLanguage();
  
  const content = (
    <button 
      type="button"
      className={`flex items-center gap-3 relative h-11 cursor-pointer rounded-xl transition-all duration-200 px-4 group hover:bg-glass-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-transparent hover:border-glass-border ${className}`}
      data-name="Credit"
      aria-label={`Credit: ${currentCredit}`}
      onClick={onClick}
    >
      <div className="relative shrink-0 size-5 flex items-center justify-center text-glass-icon group-hover:text-primary transition-colors">
        <IconUnifiedCoins size={18} />
      </div>
      <CreditText amount={currentCredit} />
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        {t('subscription.upgrade')}
      </span>
    </button>
  );

  if (onClick) {
    return content;
  }

  if (useChargeDialog) {
    return (
      <CreditChargeDialog 
        currentCredit={currentCredit}
        onCreditUpdate={setCurrentCredit}
      >
        {content}
      </CreditChargeDialog>
    );
  }

  return (
    <CreditHistoryDialog currentCredit={currentCredit}>
      {content}
    </CreditHistoryDialog>
  );
}

/**
 * AppHeader - 공통 헤더 컴포넌트
 * 
 * 로그인 화면과 메인 화면에서 공유하는 헤더
 * 
 * @features
 * - GenPressoLogo + 언어 변경 버튼
 * - 라이트/다크모드 자동 대응
 * - 다국어 지원 (ko → en → ja 순환)
 * - 기본 스타일: 절대 위치, z-60, 높이 64px
 * - 모바일 최적화: GenPressoLayout과 동일한 레이아웃
 * 
 * @props
 * - className: 추가 스타일 (선택)
 * - logoSize: 로고 크기 ("small" | "large", 기본값: "small")
 * - showMobileStyle: 모바일 최적화 스타일 활성화 (기본값: false)
 */

interface AppHeaderProps {
  className?: string;
  logoSize?: "small" | "large";
  onLogoClick?: () => void;
  showMobileStyle?: boolean;
}

export const AppHeader = memo(function AppHeader({ 
  className = "", 
  logoSize = "small",
  onLogoClick,
  showMobileStyle = false
}: AppHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  
  // 언어 순환 토글 (ko → en → ja → ko)
  const toggleLanguage = () => {
    const languageOrder: Array<'ko' | 'en' | 'ja'> = ['ko', 'en', 'ja'];
    const currentIndex = languageOrder.indexOf(language as 'ko' | 'en' | 'ja');
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  if (showMobileStyle) {
    // 모바일 스타일 (GenPressoLayout의 MobileHeader와 동일)
    return (
      <>
        {/* 데스크톱 헤더 */}
        <header className="hidden md:flex absolute top-0 left-0 w-full h-16 px-2.5 z-[60] items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <GenPressoLogo size={logoSize} onClick={onLogoClick} />
          </div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <CreditButton />
          </div>
        </header>

        {/* 모바일 헤더 */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 mobile-header pt-14 pb-2 pointer-events-none">
          <div className="flex items-center justify-between px-4 h-full pointer-events-auto">
            {/* 왼쪽 여백 (로고 중앙 정렬용) */}
            <div className="w-11" />

            {/* 로고 - 중앙 */}
            <div className="flex-1 flex justify-center">
              <GenPressoLogo size="small" onClick={onLogoClick} />
            </div>

            {/* 왼쪽 여백 (로고 중앙 정렬용) */}
            <div className="w-11" />
          </div>
        </div>
      </>
    );
  }

  // 기본 스타일 (기존)
  return (
    <header 
      className={`absolute top-0 left-0 w-full h-16 px-2.5 z-[60] flex items-center justify-between pointer-events-none ${className}`}
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        <GenPressoLogo size={logoSize} onClick={onLogoClick} />
      </div>
      <div className="flex items-center gap-3 pointer-events-auto">
        <CreditButton />
      </div>
    </header>
  );
});