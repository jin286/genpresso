import React, { memo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ShareButton } from "./ShareButton";
import { CANVAS_MEMBER, getGlassmorphismStyle } from "../layout/layout-constants";
import { useLanguage } from "../../contexts/LanguageContext";

interface MemberSectionProps {
  lastEdited?: string;
  
  /** 표시할 멤버 이름 배열 (기본값: ["김", "이", "박", "최", "정"]) */
  memberNames?: string[];
  
  /** 추가 멤버 수 (기본값: 9) */
  additionalMembers?: number;
  
  /** 공유 버튼 클릭 핸들러 */
  onShare?: () => void;
  
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * MemberSection - 캔버스 멤버 영역 컴포넌트
 * 캔버스 우측 상단에 표시되는 멤버 정보 및 공유 버튼
 */
function MemberSectionComponent({
  lastEdited,
  memberNames = CANVAS_MEMBER.MEMBER_NAMES,
  additionalMembers = CANVAS_MEMBER.ADDITIONAL_MEMBERS,
  onShare,
  className = "",
}: MemberSectionProps) {
  const { t, language } = useLanguage();
  
  // 기본 텍스트 처리
  const displayLastEdited = lastEdited || (language === 'ko' ? "23시간 전 편집" : "Edited 23 hours ago");

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 편집 시간 */}
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {displayLastEdited}
      </span>

      {/* 멤버 아바타 컨테이너 - 글래스모피즘 */}
      <div 
        className="flex items-center gap-1.5 pl-1.5 pr-1 rounded-xl border border-transparent h-11 hover:border-glass-border hover:bg-glass-hover-bg hover:backdrop-blur-[12px] transition-all duration-200"
      >
        {/* 멤버 아바타 - 4개만 표시, CSS 변수로 라이트/다크 자동 대응 */}
        <div className="flex items-center -space-x-2.5">
          {memberNames.slice(0, CANVAS_MEMBER.AVATAR_COUNT).map((name, index) => (
            <Avatar 
              key={`member-${index}`} 
              className={`${CANVAS_MEMBER.AVATAR_SIZE} shadow-sm border-2`}
              style={{
                borderColor: 'var(--color-avatar-border)',
                backgroundColor: 'var(--color-avatar-bg)',
              }}
            >
              <AvatarFallback 
                className="text-xs"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)',
                }}
              >
                {name}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* 추가 멤버 수 */}
        {additionalMembers > 0 && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            +{additionalMembers}명
          </span>
        )}

        {/* 공유 버튼 - 컨테이너 안으로 이동, 크기 축소 */}
        <div className="scale-75 origin-center">
          <ShareButton onShare={onShare} />
        </div>
      </div>
    </div>
  );
}

MemberSectionComponent.displayName = "MemberSection";

export const MemberSection = memo(MemberSectionComponent);