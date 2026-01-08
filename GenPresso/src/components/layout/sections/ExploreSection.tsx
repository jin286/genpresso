/**
 * 둘러보기 섹션 컴포넌트
 * 추천 프로젝트 갤러리를 표시합니다
 */

import React, { memo } from "react";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { NavButton } from "../../ui/nav-button";
import { GalleryItem } from "../GalleryItem";
import IconStrokeExplore1 from "../../../imports/IconStrokeExplore-188-1802";
import IconFilledExplore1 from "../../../imports/IconFilledExplore-188-1811";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../../contexts/LanguageContext";

interface GalleryItem {
  category: string;
  aspectRatio: string;
  scenarioId: string;
  date: string;
}

interface ExploreSectionProps {
  items: GalleryItem[];
  onScenarioClick: (scenarioId: string) => void;
}

export const ExploreSection = memo(function ExploreSection({
  items,
  onScenarioClick,
}: ExploreSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground">{t('nav.explore')}</h2>
        <NavButton
          label={t('nav.explore')}
          icon={<IconStrokeExplore1 />}
          iconHover={<IconFilledExplore1 />}
          onClick={() => toast.success(t('layout.exploreSection.viewAll'))}
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