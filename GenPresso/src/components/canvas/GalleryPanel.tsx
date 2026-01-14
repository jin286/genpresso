import React, { useState, useMemo, useCallback, memo } from "react";
import { Heart, Eye, Bookmark, Search, Calendar as CalendarIcon, Download, Info, Maximize2, Minimize2 } from "lucide-react";
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
import { VisuallyHidden } from "../ui/visually-hidden";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

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

interface GalleryDetailDialogProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

function GalleryDetailDialog({ item, isOpen, onClose }: GalleryDetailDialogProps) {
  const { t } = useLanguage();
  const [showInfo, setShowInfo] = useState(true);
  const [selectedScale, setSelectedScale] = useState("x1");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // 전체화면 상태 감지
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  // early return은 모든 hooks 다음에
  if (!item) return null;

  const handleDownload = () => {
    toast.success(`${item.title} ${t('common.download')} 시작`);
  };

  const handleImport = () => {
    toast.success(`${item.title} ${t('upload.importToCanvas')}`);
    onClose();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[calc(100vw-2rem)] sm:max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col border-[0.5px]"
        style={{
          backgroundColor: "var(--color-glass-bg)",
          backdropFilter: "blur(var(--blur-glass))",
          WebkitBackdropFilter: "blur(var(--blur-glass))",
          borderColor: "var(--color-glass-border)",
          boxShadow: "var(--glass-shadow)",
        }}
      >
        <VisuallyHidden>
          <DialogTitle>Gallery Item Details</DialogTitle>
          <DialogDescription>
            View and manage gallery item details including likes, views, and import options.
          </DialogDescription>
        </VisuallyHidden>

        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: "var(--color-glass-border)" }}
        >
          <h2 className="text-base font-semibold text-foreground">
            {item.contentType === 'video' ? `${t('node.videoViewer')} (갤러리)` : `${t('node.imageViewer')} (갤러리)`}
          </h2>
          
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-lg transition-colors",
                showInfo 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
              )}
              title="정보 패널"
            >
              <Info className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownload}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors"
              title={t('common.download')}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          className="flex-1 relative overflow-hidden flex min-h-0" 
          style={{ backgroundColor: 'var(--history-item-bg)' }}
        >
          <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out overflow-y-auto">
            {/* 미디어 영역 */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden relative">
              {item.contentType === 'video' ? (
                <>
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    controls
                    className="w-full h-full object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* 전체보기 버튼 */}
                  <button
                    onClick={toggleFullscreen}
                    className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg transition-all z-10"
                    style={{
                      backgroundColor: 'var(--color-glass-bg)',
                      backdropFilter: 'blur(var(--blur-glass))',
                      WebkitBackdropFilter: 'blur(var(--blur-glass))',
                      borderColor: 'var(--color-glass-border)',
                      border: '0.5px solid',
                    }}
                    title={isFullscreen ? "축소" : "전체보기"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-5 h-5 text-foreground" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-foreground" />
                    )}
                  </button>
                </>
              ) : (
                <ImageWithFallback
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Prompt 섹션 (이미지 하단) - 전체화면일 때 숨김 */}
            {!isFullscreen && (
              <div 
                className="px-6 py-4 border-t shrink-0" 
                style={{ 
                  borderColor: "var(--color-glass-border)",
                  backgroundColor: 'rgba(20, 20, 21, 0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">{t('gallery.prompt')}</h3>
                  <button className="text-xs text-primary hover:underline">{t('common.copy')}</button>
                </div>
                <div 
                  className="p-3 rounded-lg text-xs text-foreground leading-relaxed mb-4"
                  style={{ backgroundColor: 'var(--agent-message-bg)' }}
                >
                  A serene landscape with mountains and a lake at sunset, photorealistic style
                </div>

                {/* 4개 정보 그리드 */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.aiProvider')}</p>
                    <p className="text-sm text-foreground">Gemini</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.usedAiModel')}</p>
                    <p className="text-sm text-foreground">{item.model}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.processingTime')}</p>
                    <p className="text-sm text-foreground">49.69s</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.creditUsage')}</p>
                    <p className="text-sm text-foreground">-24</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 우측 정보 패널 - 전체화면일 때 숨김 */}
          {!isFullscreen && (
            <div 
              className={cn(
                "flex-shrink-0 border-l flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                showInfo ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-20 border-l-0"
              )}
              style={{ 
                borderColor: "var(--color-glass-border)",
                backgroundColor: 'rgba(20, 20, 21, 0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-64 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {/* 기본 정보 섹션 */}
                  <div className="p-6 border-b" style={{ borderColor: "var(--color-glass-border)" }}>
                    <h3 className="text-sm font-semibold text-foreground mb-4">{t('upload.basicInfo')}</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.filename')}</p>
                        <p className="text-sm text-foreground break-all">{item.title}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.date')}</p>
                          <p className="text-sm text-foreground">{item.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.generatedBy')}</p>
                          <p className="text-sm text-foreground">{item.author || "jin@reconlabs.ai"}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.size')}</p>
                          <p className="text-sm text-foreground">1.6 MB</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.resolution')}</p>
                          <p className="text-sm text-foreground">1200 × 896</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.likes')}</p>
                          <p className="text-sm text-foreground">{item.likes}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('gallery.views')}</p>
                          <p className="text-sm text-foreground">{item.views}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 스케일 옵션 섹션 */}
                  <div className="p-6 border-b" style={{ borderColor: "var(--color-glass-border)" }}>
                    <h3 className="text-sm font-semibold text-foreground mb-4">{t('upload.scaleOptions')}</h3>
                    <div className="flex gap-2">
                      {["x3", "x2", "x1", "x0.5"].map((scale) => (
                        <button
                          key={scale}
                          onClick={() => setSelectedScale(scale)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium transition-all border"
                          style={{
                            backgroundColor: selectedScale === scale ? 'var(--agent-user-message-bg)' : 'var(--color-glass-bg)',
                            borderColor: selectedScale === scale ? 'var(--color-primary)' : 'var(--color-glass-border)',
                            color: selectedScale === scale ? 'var(--color-primary)' : 'var(--foreground)',
                            borderWidth: selectedScale === scale ? '2px' : '0.5px',
                          }}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 다운로드 버튼 섹션 */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <button
                        onClick={handleDownload}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl text-white border text-base font-medium transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--secondary)',
                          borderColor: 'var(--color-glass-border)',
                        }}
                      >
                        <Download className="w-5 h-5" />
                        {t('common.download')}
                      </button>

                      <button
                        onClick={handleImport}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl text-white text-base font-medium transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--primary)',
                        }}
                      >
                        {t('upload.importToCanvas')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
}

function GalleryCardComponent({ item, onClick }: GalleryCardProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onClick(item), [item, onClick]);

  return (
    <div 
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 relative border-[0.5px] hover:border-primary"
      style={{ 
        ...GLASS_CARD_STYLE, 
        boxShadow: 'var(--glass-shadow)',
        borderColor: 'var(--color-glass-border)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="article"
      aria-label={`${item.title} - ${item.contentType === 'image' ? t('gallery.imageType') : item.contentType === 'video' ? t('gallery.videoType') : t('gallery.segmentType')}`}
    >
      <div className="aspect-square relative overflow-hidden bg-muted/20">
        <ImageWithFallback 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {isHovered && (
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
  const { t, language } = useLanguage();
  
  // 언어별 로케일 매핑
  const locale = language === 'ko' ? 'ko-KR' : language === 'ja' ? 'ja-JP' : 'en-US';
  
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [filters, setFilters] = useState<string[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [models, setModels] = useState<ModelType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "liked">("recent");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    <>
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
                  <SelectContent className="z-[100]">
                    <SelectItem value="recent">{t('gallery.sortRecent')}</SelectItem>
                    <SelectItem value="popular">{t('gallery.sortPopular')}</SelectItem>
                    <SelectItem value="liked">{t('gallery.sortLiked')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 결과 카운트 */}
              <div className="mb-4 flex items-center justify-between shrink-0">
                <p className="text-xs text-muted-foreground">
                  {t('gallery.totalResults', { count: filteredGallery.length })}
                </p>
              </div>

              {/* 갤러리 그리드 */}
              {filteredGallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {filteredGallery.map(item => (
                    <GalleryCard 
                      key={item.id} 
                      item={item} 
                      onClick={(item) => {
                        setSelectedItem(item);
                        setIsDetailOpen(true);
                      }}
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
                            `${dateRange.from.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} ~ ${dateRange.to.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`
                          ) : (
                            dateRange.from.toLocaleDateString(locale, { month: 'short', day: 'numeric' })
                          )
                        ) : (
                          t('gallery.selectDate')
                        )}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-auto p-0 z-[9999]" 
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

      <GalleryDetailDialog
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
};

GalleryPanelComponent.displayName = "GalleryPanel";

export const GalleryPanel = memo(GalleryPanelComponent);