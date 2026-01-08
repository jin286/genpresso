import React, { useState, useMemo, useCallback, memo } from "react";
import { Heart, Eye, Bookmark, Search, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getGlassmorphismStyle } from "../layout/style-utils";
import type { DateRange } from "react-day-picker@8.10.1";
import { useLanguage } from "../../contexts/LanguageContext";

type TabType = "all" | "personal";
type ContentType = "image" | "video" | "segment";
type ModelType = "nano-banana" | "flux-1.1" | "gpt-4o" | "veo3";
type MemberType = "홍길동";

interface GalleryItem {
  id: number;
  title: string;
  contentType: ContentType;
  model: ModelType;
  author: MemberType;
  thumbnail: string;
  likes: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}

const MOCK_GALLERY: GalleryItem[] = [
  { id: 1, title: "Portrait Photography", contentType: "image", model: "nano-banana", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1653691040409-793d2c22ed69?w=400", likes: 24, views: 156, isLiked: true, isBookmarked: false, createdAt: "2025-10-16 14:30" },
  { id: 2, title: "City Landscape", contentType: "segment", model: "flux-1.1", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=400", likes: 18, views: 102, isLiked: false, isBookmarked: true, createdAt: "2025-10-16 14:20" },
  { id: 3, title: "Wildlife Animal", contentType: "video", model: "veo3", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1653265509289-936e611b2bb7?w=400", likes: 32, views: 201, isLiked: true, isBookmarked: true, createdAt: "2025-10-15 10:15" },
  { id: 4, title: "Forest Nature", contentType: "segment", model: "nano-banana", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400", likes: 45, views: 289, isLiked: false, isBookmarked: false, createdAt: "2025-10-14 16:40" },
  { id: 5, title: "Food Restaurant", contentType: "image", model: "gpt-4o", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", likes: 28, views: 178, isLiked: true, isBookmarked: false, createdAt: "2025-10-10 12:20" },
  { id: 6, title: "Architecture Building", contentType: "segment", model: "flux-1.1", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1663940019982-c14294717dbd?w=400", likes: 36, views: 245, isLiked: false, isBookmarked: true, createdAt: "2025-10-08 09:30" },
  { id: 7, title: "Abstract Art", contentType: "video", model: "veo3", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?w=400", likes: 52, views: 321, isLiked: true, isBookmarked: true, createdAt: "2025-09-20 15:10" },
  { id: 8, title: "Technology Computer", contentType: "image", model: "nano-banana", author: "홍길동", thumbnail: "https://images.unsplash.com/photo-1653132491302-fbee23efb785?w=400", likes: 41, views: 267, isLiked: false, isBookmarked: false, createdAt: "2025-08-15 11:45" },
];

// 스타일 유틸리티 함수 사용으로 중복 제거 및 표준 CSS 변수 사용
const GLASS_CARD_STYLE = getGlassmorphismStyle();

interface GalleryCardProps {
  item: GalleryItem;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

function GalleryCardComponent({ item, isSelected, onSelect }: GalleryCardProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onSelect(item.id), [item.id, onSelect]);

  return (
    <div 
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 relative"
      style={{ 
        ...GLASS_CARD_STYLE, 
        boxShadow: 'var(--glass-shadow)',
        borderWidth: isSelected ? '2px' : '0.5px',
        borderStyle: 'solid',
        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-glass-border)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="article"
      aria-label={`${item.title} - ${item.contentType === 'image' ? t('gallery.imageType') : item.contentType === 'video' ? t('gallery.videoType') : t('gallery.segmentType')}${isSelected ? ' - ' + t('gallery.selected') : ''}`}
      aria-selected={isSelected}
    >


      <div className="aspect-square relative overflow-hidden bg-muted/20">
        <ImageWithFallback 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-white">
              <Heart className="w-5 h-5" />
              <span className="text-xs">{item.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <Eye className="w-5 h-5" />
              <span className="text-xs">{item.views}</span>
            </div>
          </div>
        )}

        {isSelected && (
          <div className="absolute inset-0 bg-primary/20" />
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-foreground truncate mb-1">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.createdAt}</p>
      </div>
    </div>
  );
}

const GalleryCard = React.memo(GalleryCardComponent);

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = React.memo(function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button 
      className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
      style={isActive ? {
        background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
      } : {}}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-label={label}
    >
      <span className={`text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" aria-hidden="true" />
      )}
    </button>
  );
});

interface CheckboxFilterProps {
  title: string;
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

const CheckboxFilter = React.memo(function CheckboxFilter({ title, options, selected, onToggle }: CheckboxFilterProps) {
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



interface GalleryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const GalleryPanelComponent = ({ isOpen, onClose }: GalleryPanelProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [filters, setFilters] = useState<string[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [models, setModels] = useState<ModelType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "liked">("recent");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleFilter = useCallback((filter: string) => {
    setFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  }, []);

  const toggleContentType = useCallback((type: ContentType) => {
    setContentTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  }, []);

  const toggleModel = useCallback((model: ModelType) => {
    setModels(prev => 
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  }, []);

  const toggleMember = useCallback((member: MemberType) => {
    setMembers(prev => 
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  }, []);

  const toggleSelection = useCallback((id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const filteredGallery = useMemo(() => {
    let filtered = MOCK_GALLERY.filter(item => {
      // 개인 갤러리 필터
      if (activeTab === "personal" && item.author !== "홍길동") return false;
      
      // 좋아요 필터
      if (filters.includes("liked") && !item.isLiked) return false;
      
      // 북마크 필터
      if (filters.includes("bookmarked") && !item.isBookmarked) return false;
      
      // 콘텐츠 타입 필터
      if (contentTypes.length > 0 && !contentTypes.includes(item.contentType)) return false;
      
      // 모델 필터
      if (models.length > 0 && !models.includes(item.model)) return false;
      
      // 멤버 필터
      if (members.length > 0 && !members.includes(item.author)) return false;
      
      // 날짜 범위 필터
      if (dateRange?.from) {
        const itemDate = new Date(item.createdAt);
        const fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        
        if (itemDate < fromDate) return false;
        
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          if (itemDate > toDate) return false;
        }
      }
      
      // 검색 필터
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });

    // 정렬
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === "liked") {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    return filtered;
  }, [activeTab, filters, contentTypes, models, members, dateRange, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    total: MOCK_GALLERY.length,
    personal: MOCK_GALLERY.filter(i => i.author === "홍길동").length,
  }), []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[calc(100vw-2rem)] sm:max-w-5xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
        style={{
          backgroundColor: "var(--color-glass-bg)",
          backdropFilter: "blur(var(--blur-glass))",
          WebkitBackdropFilter: "blur(var(--blur-glass))",
          borderColor: "var(--color-glass-border)",
          boxShadow: "var(--glass-shadow)",
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle>{t('gallery.title')}</DialogTitle>
          <DialogDescription>
            {t('gallery.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-b shrink-0" style={{ borderColor: 'var(--color-glass-border)' }}>
          <TabButton 
            label={t('gallery.allGallery')}
            isActive={activeTab === "all"} 
            onClick={() => setActiveTab("all")} 
          />
          <TabButton 
            label={t('gallery.personalGallery')}
            isActive={activeTab === "personal"} 
            onClick={() => setActiveTab("personal")} 
          />
        </div>

        <div className="flex-1 overflow-hidden flex min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            {/* 검색 및 정렬 바 */}
            <div className="mb-6 flex items-center gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder={t('gallery.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="liked">좋아요순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 결과 카운트 및 선택 관리 */}
            <div className="mb-4 flex items-center justify-between shrink-0">
              <p className="text-xs text-muted-foreground">
                총 {filteredGallery.length}개의 결과
              </p>
              {selectedItems.size > 0 && (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-primary">
                    {selectedItems.size}개 선택됨
                  </p>
                  <button
                    onClick={clearSelection}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    선택 해제
                  </button>
                </div>
              )}
            </div>

            {/* 갤러리 그리드 */}
            {filteredGallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {filteredGallery.map(item => (
                  <GalleryCard 
                    key={item.id} 
                    item={item} 
                    isSelected={selectedItems.has(item.id)}
                    onSelect={toggleSelection}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[300px]">
                <p className="text-sm text-muted-foreground mb-2">{t('gallery.noResults')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('gallery.tryDifferentFilters')}
                </p>
              </div>
            )}
          </div>

          <div 
            className="w-48 border-l overflow-y-auto px-4 py-4 shrink-0"
            style={{ borderColor: 'var(--color-glass-border)' }}
          >
            <CheckboxFilter
              title={t('gallery.filter')}
              options={[
                { label: t('gallery.liked'), value: "liked" },
                { label: t('gallery.bookmarked'), value: "bookmarked" },
              ]}
              selected={filters}
              onToggle={toggleFilter}
            />

            <CheckboxFilter
              title={t('gallery.contentType')}
              options={[
                { label: t('gallery.imageLabel'), value: "image" },
                { label: t('gallery.videoLabel'), value: "video" },
                { label: t('node.segment'), value: "segment" },
              ]}
              selected={contentTypes}
              onToggle={toggleContentType}
            />

            <CheckboxFilter
              title={t('gallery.generationModel')}
              options={[
                { label: "Nano-Banana", value: "nano-banana" },
                { label: "Flux 1.1", value: "flux-1.1" },
                { label: "GPT 4o", value: "gpt-4o" },
                { label: "VEO3", value: "veo3" },
              ]}
              selected={models}
              onToggle={toggleModel}
            />

            <CheckboxFilter
              title={t('gallery.generatedBy')}
              options={[
                { label: "홍길동", value: "홍길동" },
              ]}
              selected={members}
              onToggle={toggleMember}
            />

            <div className="mb-4">
              <h3 className="text-xs text-foreground mb-2">{t('gallery.creationDate')}</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="w-full h-9 px-2.5 flex items-center justify-between gap-2 rounded-lg border transition-colors text-xs"
                    style={{
                      backgroundColor: 'var(--color-glass-bg)',
                      borderColor: 'var(--color-glass-border)',
                    }}
                  >
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1 text-left text-foreground truncate">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          `${dateRange.from.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~ ${dateRange.to.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}`
                        ) : (
                          dateRange.from.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
                        )
                      ) : (
                        "날짜 선택"
                      )}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0" 
                  align="start"
                  style={{
                    backgroundColor: 'var(--color-glass-bg)',
                    backdropFilter: 'blur(var(--blur-glass))',
                    WebkitBackdropFilter: 'blur(var(--blur-glass))',
                    borderColor: 'var(--color-glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                  }}
                >
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    initialFocus
                  />
                  {dateRange?.from && (
                    <div className="p-2.5 border-t" style={{ borderColor: 'var(--color-glass-border)' }}>
                      <button
                        className="w-full h-8 px-2.5 rounded-lg text-xs transition-colors"
                        style={{
                          backgroundColor: 'var(--color-glass-hover-bg)',
                          color: 'var(--foreground)',
                        }}
                        onClick={() => setDateRange(undefined)}
                      >
                        초기화
                      </button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

GalleryPanelComponent.displayName = "GalleryPanel";

export const GalleryPanel = memo(GalleryPanelComponent);
