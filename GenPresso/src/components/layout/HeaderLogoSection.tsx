import React, { memo } from "react";
import { GenPressoLogo } from "./GenPressoLogo";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * HeaderLogoSection - 헤더 로고 섹션 (언어 버튼 + 로고)
 * 
 * GenPressoLayout과 LoginScreen 헤더에서 공유하는 좌측 섹션
 * 
 * @features
 * - 언어 변경 버튼 (ko → en → ja 순환)
 * - GenPressoLogo
 * - 라이트/다크모드 자동 대응
 * 
 * @props
 * - logoSize: 로고 크기 ("small" | "large", 기본값: "small")
 * - onLogoClick: 로고 클릭 핸들러 (선택)
 * - className: 추가 스타일 (선택)
 */

interface HeaderLogoSectionProps {
  logoSize?: "small" | "large";
  onLogoClick?: () => void;
  className?: string;
}

export const HeaderLogoSection = memo(function HeaderLogoSection({ 
  logoSize = "small",
  onLogoClick,
  className = ""
}: HeaderLogoSectionProps) {
  const { language, setLanguage, t } = useLanguage();
  
  // 언어 순환 토글 (ko → en → ja → ko)
  const toggleLanguage = () => {
    const languageOrder: Array<'ko' | 'en' | 'ja'> = ['ko', 'en', 'ja'];
    const currentIndex = languageOrder.indexOf(language as 'ko' | 'en' | 'ja');
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  return (
    <div className="flex items-center gap-3">
      <GenPressoLogo size={logoSize} onClick={onLogoClick} />
    </div>
  );
});