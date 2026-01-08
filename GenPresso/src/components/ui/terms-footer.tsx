import React, { memo } from "react";
import { Z_INDEX } from "../layout/layout-constants";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * TermsFooter - 이용약관 푸터 컴포넌트
 * 
 * 홈화면과 캔버스 화면에서 공유하는 이용약관 안내 텍스트
 * 
 * @features
 * - 데스크톱: 하단 고정 (fixed)
 * - 모바일: 스크롤 가능 콘텐츠 내부
 * - 라이트/다크모드 자동 대응
 * - 다국어 지원
 * - 기본 여백: px-0 py-1 mb-4 (위로 올린 상태)
 */
export const TermsFooter = memo(function TermsFooter({ className = "px-0 py-1 mb-4" }: { className?: string }) {
  const { t } = useLanguage();
  
  return (
    <footer 
      className={`md:fixed md:bottom-0 left-0 right-0 px-4 pb-8 md:pb-3 md:px-12 md:py-3 text-center shrink-0 ${className}`}
      style={{ zIndex: Z_INDEX.SIDEBAR }}
    >
      <div className="text-center max-w-[280px] mx-auto md:max-w-none">
        <p className="text-xs text-muted-foreground/50 leading-normal">
          {t('footer.terms')}
        </p>
      </div>
    </footer>
  );
});