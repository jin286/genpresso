/**
 * 모바일 헤더 컴포넌트
 * 모바일에서 상단에 표시되는 헤더입니다
 */

import React, { memo } from "react";
import { Bell, MessageCircle, Search } from "lucide-react";
import { GenPressoLogo } from "../GenPressoLogo";
import { Badge } from "../../ui/badge";
import { getGlassmorphismStyle } from "../layout-constants";

interface MobileHeaderProps {
  onNotificationClick: () => void;
  onMessageClick: () => void;
}

export const MobileHeader = memo(function MobileHeader({
  onNotificationClick,
  onMessageClick,
}: MobileHeaderProps) {
  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 h-14 border-b-[0.5px] border-solid z-40"
      style={{
        ...getGlassmorphismStyle(),
        borderColor: "var(--color-glass-border)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        <GenPressoLogo width={120} />

        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors relative"
            aria-label="알림"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5" />
            <Badge
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              3
            </Badge>
          </button>

          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors relative"
            aria-label="메시지"
            onClick={onMessageClick}
          >
            <MessageCircle className="w-5 h-5" />
            <Badge
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              5
            </Badge>
          </button>

          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/10 transition-colors"
            aria-label="검색"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});
