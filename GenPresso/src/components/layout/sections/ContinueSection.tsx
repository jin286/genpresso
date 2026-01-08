/**
 * 이어하기 섹션 컴포넌트
 * 최근 작업한 프로젝트를 표시합니다
 */

import React, { memo } from "react";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { NavButton } from "../../ui/nav-button";
import { GalleryItem } from "../GalleryItem";
import IconStrokeContinue1 from "../../../imports/IconStrokeContinue";
import IconFilledContinue1 from "../../../imports/IconFilledContinue";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../../contexts/LanguageContext";

interface GalleryItem {
  category: string;
  aspectRatio: string;
  scenarioId: string;
  date: string;
}

interface ContinueSectionProps {
  items: GalleryItem[];
  onScenarioClick: (scenarioId: string) => void;
}

export const ContinueSection = memo(function ContinueSection({
  items,
  onScenarioClick,
}: ContinueSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground">{t('nav.continue')}</h2>
        <NavButton
          label={t('nav.continue')}
          icon={<IconStrokeContinue1 />}
          iconHover={<IconFilledContinue1 />}
          onClick={() => toast.success(t('layout.continueSection.viewAll'))}
        />
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4, 1440: 6 }}>
        <Masonry gutter="12px">
          {items.map((item, index) => (
            <GalleryItem
              key={index}
              {...item}
              onClick={() => onScenarioClick(item.scenarioId)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
});