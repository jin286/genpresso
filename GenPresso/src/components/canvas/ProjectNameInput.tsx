import React, { memo, useCallback, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getGlassmorphismStyle } from "../layout/layout-constants";

interface ProjectNameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  workspaceType?: 'main' | 'detail';
  workspaceName?: string;
}

/**
 * 프로젝트 이름 입력 컴포넌트
 * - 북마크 아이콘과 편집 가능한 텍스트 입력창
 * - 호버 시 테두리 파란색으로 변경
 * - 포커스 시 배경에 은은한 파란색 영역 표시
 */
function ProjectNameInputComponent({ 
  value, 
  onChange, 
  placeholder = "Untitled",
  workspaceType = 'main',
  workspaceName
}: ProjectNameInputProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = useCallback(() => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "북마크에서 제거되었습니다" : "북마크에 추가되었습니다");
  }, [isBookmarked]);

  const displayValue = workspaceType === 'detail' && workspaceName 
    ? `${value} > ${workspaceName}`
    : value;

  return (
    <div 
      className="flex items-center gap-2 rounded-xl border border-transparent px-3 h-11 group hover:border-glass-border hover:bg-glass-hover-bg hover:backdrop-blur-[12px] focus-within:border-primary focus-within:bg-primary/5 focus-within:backdrop-blur-[12px] transition-all duration-200 min-w-[180px] max-w-[320px]"
    >
      {/* 북마크 아이콘 - Lucide 아이콘 사용 */}
      <button 
        onClick={handleBookmarkClick}
        className="flex-shrink-0 p-0.5 text-muted-foreground hover:text-primary transition-colors rounded"
        aria-label={isBookmarked ? "북마크 제거" : "북마크 추가"}
      >
        <Bookmark 
          className="w-4 h-4" 
          fill={isBookmarked ? "currentColor" : "none"}
        />
      </button>
      
      {/* 프로젝트 이름 입력 */}
      {workspaceType === 'detail' ? (
        <div className="flex-1 text-sm text-muted-foreground truncate">
          {displayValue}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none focus:outline-none text-sm text-muted-foreground truncate"
          placeholder={placeholder}
          aria-label="프로젝트 이름"
        />
      )}
    </div>
  );
}

ProjectNameInputComponent.displayName = "ProjectNameInput";

export const ProjectNameInput = memo(ProjectNameInputComponent);
