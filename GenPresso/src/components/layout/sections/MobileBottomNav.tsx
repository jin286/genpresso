/**
 * 모바일 하단 네비게이션 컴포넌트
 * 모바일에서 하단에 표시되는 탭 바입니다
 */

import React, { memo } from "react";
import { MobileMenuItem } from "../MobileMenuItem";
import IconStrokeFolder from "../../../imports/IconStrokeFolder-188-2266";
import IconFilledFolder from "../../../imports/IconFilledFolder-188-2279";
import IconStrokeBrookmark from "../../../imports/IconStrokeBrookmark-191-22";
import IconFilledBrookmark from "../../../imports/IconFilledBrookmark-191-36";
import IconStrokeChart from "../../../imports/IconStrokeChart";
import IconFilledChart from "../../../imports/IconFilledChart";
import IconStrokeArchive from "../../../imports/IconStrokeArchive";
import IconFilledArchive from "../../../imports/IconFilledArchive";
import { getGlassmorphismStyle } from "../layout-constants";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav = memo(function MobileBottomNav({
  activeTab,
  onTabChange,
}: MobileBottomNavProps) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t-[0.5px] border-solid z-40"
      style={{
        ...getGlassmorphismStyle(),
        borderColor: "var(--color-glass-border)",
        boxShadow: "0px -2px 12px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-around h-full px-2">
        <MobileMenuItem
          icon={<IconStrokeFolder />}
          iconHover={<IconFilledFolder />}
          label="프로젝트"
          isActive={activeTab === "projects"}
          onClick={() => onTabChange("projects")}
        />
        <MobileMenuItem
          icon={<IconStrokeBrookmark />}
          iconHover={<IconFilledBrookmark />}
          label="즐겨찾기"
          isActive={activeTab === "favorites"}
          onClick={() => onTabChange("favorites")}
        />
        <MobileMenuItem
          icon={<IconStrokeChart />}
          iconHover={<IconFilledChart />}
          label="대시보드"
          isActive={activeTab === "dashboard"}
          onClick={() => onTabChange("dashboard")}
        />
        <MobileMenuItem
          icon={<IconStrokeArchive />}
          iconHover={<IconFilledArchive />}
          label="보관함"
          isActive={activeTab === "archive"}
          onClick={() => onTabChange("archive")}
        />
      </div>
    </div>
  );
});
