/**
 * 갤러리 필터 섹션 컴포넌트
 * 검색, 정렬, 필터링 UI를 제공합니다
 */

import React, { memo } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";

type ContentType = "image" | "video";
type ModelType = "nano-banana" | "flux-1.1" | "gpt-4o" | "veo3";
type MemberType = "장진혁" | "김진혁" | "박진혁" | "임진혁" | "황진혁";
type TimeType = "all" | "today" | "week" | "month" | "year";
type SortType = "recent" | "popular" | "liked";

interface CheckboxFilterProps {
  title: string;
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

const CheckboxFilter = memo(function CheckboxFilter({ 
  title, 
  options, 
  selected, 
  onToggle 
}: CheckboxFilterProps) {
  return (
    <fieldset className="mb-4">
      <legend className="text-xs text-foreground mb-2">{title}</legend>
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <Checkbox
              id={`${title}-${option.value}`}
              checked={selected.includes(option.value)}
              onCheckedChange={() => onToggle(option.value)}
              aria-label={option.label}
            />
            <label
              htmlFor={`${title}-${option.value}`}
              className="text-xs text-foreground cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
});

interface SingleCheckboxFilterProps {
  title: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const SingleCheckboxFilter = memo(function SingleCheckboxFilter({ 
  title, 
  label, 
  checked, 
  onToggle 
}: SingleCheckboxFilterProps) {
  return (
    <div className="mb-4">
      <h3 className="text-xs text-foreground mb-2">{title}</h3>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${title}-${label}`}
          checked={checked}
          onCheckedChange={onToggle}
          aria-label={label}
        />
        <label
          htmlFor={`${title}-${label}`}
          className="text-xs text-foreground cursor-pointer"
        >
          {label}
        </label>
      </div>
    </div>
  );
});

interface GalleryFilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortType;
  onSortChange: (value: SortType) => void;
  showLiked: boolean;
  onShowLikedToggle: () => void;
  showBookmarked: boolean;
  onShowBookmarkedToggle: () => void;
  contentTypes: ContentType[];
  onContentTypeToggle: (value: ContentType) => void;
  models: ModelType[];
  onModelToggle: (value: ModelType) => void;
  members: MemberType[];
  onMemberToggle: (value: MemberType) => void;
  time: TimeType;
  onTimeChange: (value: TimeType) => void;
}

export const GalleryFilterSection = memo(function GalleryFilterSection({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showLiked,
  onShowLikedToggle,
  showBookmarked,
  onShowBookmarkedToggle,
  contentTypes,
  onContentTypeToggle,
  models,
  onModelToggle,
  members,
  onMemberToggle,
  time,
  onTimeChange,
}: GalleryFilterSectionProps) {
  return (
    <div className="flex flex-col h-full">
      {/* 검색 및 정렬 */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-glass-border)' }}>
        <div className="relative mb-3">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" 
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
            aria-label="갤러리 검색"
          />
        </div>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortType)}>
          <SelectTrigger className="h-9" aria-label="정렬 기준">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">최신순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
            <SelectItem value="liked">좋아요순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 필터 옵션 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto p-4">
        <SingleCheckboxFilter
          title="좋아요"
          label="좋아요한 항목만"
          checked={showLiked}
          onToggle={onShowLikedToggle}
        />

        <SingleCheckboxFilter
          title="북마크"
          label="북마크한 항목만"
          checked={showBookmarked}
          onToggle={onShowBookmarkedToggle}
        />

        <CheckboxFilter
          title="콘텐츠 유형"
          options={[
            { label: "이미지", value: "image" },
            { label: "비디오", value: "video" },
          ]}
          selected={contentTypes}
          onToggle={(value) => onContentTypeToggle(value as ContentType)}
        />

        <CheckboxFilter
          title="모델"
          options={[
            { label: "Nano Banana", value: "nano-banana" },
            { label: "Flux 1.1", value: "flux-1.1" },
            { label: "GPT-4o", value: "gpt-4o" },
            { label: "Veo3", value: "veo3" },
          ]}
          selected={models}
          onToggle={(value) => onModelToggle(value as ModelType)}
        />

        <CheckboxFilter
          title="멤버"
          options={[
            { label: "장진혁", value: "장진혁" },
            { label: "김진혁", value: "김진혁" },
            { label: "박진혁", value: "박진혁" },
            { label: "임진혁", value: "임진혁" },
            { label: "황진혁", value: "황진혁" },
          ]}
          selected={members}
          onToggle={(value) => onMemberToggle(value as MemberType)}
        />

        <div className="mb-4">
          <h3 className="text-xs text-foreground mb-2">시간</h3>
          <Select value={time} onValueChange={(value) => onTimeChange(value as TimeType)}>
            <SelectTrigger className="h-9" aria-label="시간 필터">
              <SelectValue placeholder="시간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="today">오늘</SelectItem>
              <SelectItem value="week">이번 주</SelectItem>
              <SelectItem value="month">이번 달</SelectItem>
              <SelectItem value="year">올해</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
});
