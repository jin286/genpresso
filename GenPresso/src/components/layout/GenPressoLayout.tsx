import React, { useState, memo, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Languages,
  ArrowUp,
} from "lucide-react";
import { SystemButton } from "../ui/system-button";
import { RoundButton } from "../ui/round-button";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"; // 프로젝트 상세 Drawer에서 사용됨
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription } from "../ui/drawer";
import { VisuallyHidden } from "../ui/visually-hidden";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ExpandableSidebar } from "./ExpandableSidebar";
import CanvasWorkspace from "../canvas/CanvasWorkspace";
import { SettingsPanel, TabType } from "../settings/SettingsPanel";
import { ProjectMenuPanel } from "../projects/ProjectMenuPanel";
import { MobileDrawerContent } from "./MobileDrawerContent";
import { 
  SIDEBAR_WIDTH, 
  SPACING, 
  HEADER, 
  AGENT_PANEL, 
  ANIMATION, 
  Z_INDEX, 
  calculateMarginLeft,
  calculateMarginRight,
} from "./layout-constants";
import { MobileGlassLayout } from "./MobileGlassLayout";
import { DesktopGlassLayout } from "./DesktopGlassLayout";
import { MemberSection } from "../canvas/MemberSection";
import { ShareButton } from "../canvas/ShareButton";
import { ProjectNameInput } from "../canvas/ProjectNameInput";
import Click from "../../imports/Click";
import { useIsMobile } from "../ui/use-mobile";
import { IconHeart, IconBookmark, IconShare, IconEye, IconSparkles, IconFolder } from "../icons";
import { GenPressoLogo } from "./GenPressoLogo";
import { getGlassmorphismStyle } from "./style-utils";
import { useClipboard } from "./hooks/useClipboard";
import { LoginScreen } from "../auth/LoginScreen";
import { HeaderLogoSection } from "./HeaderLogoSection";

import { toast } from "sonner@2.0.3";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NotificationDialog } from "../forms/NotificationDialog";
import IconStrokeContinue1 from "../../imports/IconStrokeContinue";
import IconFilledContinue1 from "../../imports/IconFilledContinue";
import IconStrokeExplore1 from "../../imports/IconStrokeExplore-188-1802";
import IconFilledExplore1 from "../../imports/IconFilledExplore-188-1811";
import { AgentButton } from "../ui/agent-button";
import { useLanguage } from "../../contexts/LanguageContext";
import { HelpButton } from "../ui/help-button";
import AgentDrawerContent from "../agent/AgentDrawerContent";
import AgentChatPanel from "../agent/AgentChatPanel";
import HelpPanel from "../help/HelpPanel";
import HelpDrawerContent from "../help/HelpDrawerContent";
import { CloseButton } from "../ui/close-button";
import { NavButton } from "../ui/nav-button";
import { TermsFooter } from "../ui/terms-footer";
import { CreditButton } from "./AppHeader";
import { MessageDialog } from "../forms/MessageDialog";
import { FileAttachPopover } from "../ui/file-attach-popover";
import { CanvasThumbnail } from "../canvas/CanvasThumbnail";
import { GalleryDetailDialog } from "./GalleryDetailDialog";
import { continueProjects, exploreItems } from "../../data/mock-projects";
import { ProfileOnboardingDialog } from "../onboarding/ProfileOnboardingDialog";
import { AgentSettingsDialog } from "../agent/AgentSettingsDialog";
import { ModelSelectionDialog } from "../forms/ModelSelectionDialog";

// 모바일 헤더 컴포넌트
const MobileHeader = memo(function MobileHeader({ 
  onLogoClick,
  isNotificationOpen,
  setIsNotificationOpen,
  onNavigate,
  isAgentSettingsOpen,
  setIsAgentSettingsOpen
}: { 
  onLogoClick?: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  onNavigate: (page: 'main' | 'canvas' | 'settings' | 'projects' | 'favorites' | 'dashboard') => void;
  isAgentSettingsOpen: boolean;
  setIsAgentSettingsOpen: (open: boolean) => void;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [currentCredit, setCurrentCredit] = useState(100);
  const { language, setLanguage } = useLanguage();

  // 언어 순환 토글 (ko → en → ja → ko)
  const toggleLanguage = () => {
    const languageOrder: Array<'ko' | 'en' | 'ja'> = ['ko', 'en', 'ja'];
    const currentIndex = languageOrder.indexOf(language as 'ko' | 'en' | 'ja');
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 mobile-header pt-14 pb-2 pointer-events-none">
      <div className="flex items-center justify-between px-4 h-full pointer-events-auto">
        {/* 햄버거 메뉴 - 왼쪽 */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
          <DrawerTrigger asChild>
            <div className="p-2">
              <SystemButton isActive={isDrawerOpen} ariaLabel="메뉴 열기" />
            </div>
          </DrawerTrigger>
          <MobileDrawerContent 
            onNavigate={onNavigate}
            setIsNotificationOpen={setIsNotificationOpen}
            setIsMessageOpen={setIsMessageOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            currentCredit={currentCredit}
            setCurrentCredit={setCurrentCredit}
          />
        </Drawer>

        {/* 로고 - 중앙 */}
        <div className="flex-1 flex justify-center">
          <GenPressoLogo size="small" onClick={onLogoClick} />
        </div>

        {/* 에이전�� 버튼 - 우측 (햄버거와 대칭) */}
        <Drawer open={isAgentDrawerOpen} onOpenChange={setIsAgentDrawerOpen} direction="right">
          <DrawerTrigger asChild>
            <div className="p-2">
              <AgentButton isActive={isAgentDrawerOpen} ariaLabel="AI 에이전트 열기" />
            </div>
          </DrawerTrigger>
          <DrawerContent 
            className="h-full w-[90vw] max-w-[450px] bg-[var(--color-glass-bg)] border-l border-[var(--color-glass-border)]"
            style={getGlassmorphismStyle()}
          >
            <VisuallyHidden>
              <DrawerTitle>에이전트</DrawerTitle>
              <DrawerDescription>AI 에이전트와 프로필 보기</DrawerDescription>
            </VisuallyHidden>
            <div className="relative h-full">
              <AgentDrawerContent 
                currentCredit={currentCredit}
                onCreditUpdate={setCurrentCredit}
              />
              
              {/* X 버튼 - 닫기 */}
              <div className="absolute left-2.5 top-2.5 z-10">
                <CloseButton 
                  onClick={() => setIsAgentDrawerOpen(false)}
                  ariaLabel="에이전트 창 닫기"
                  size="sm"
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* 알림 Dialog */}
      <NotificationDialog 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 메시지 Dialog */}
      <MessageDialog 
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
      />
    </div>
  );
});

// 최적화된 갤러리 아이템 컴포넌트
const GalleryItem = memo(function GalleryItem({ 
  item, 
  index, 
  onClick,
  isBookmarked = false,
  onBookmarkToggle,
  isLiked = false,
  onLikeToggle
}: { 
  item: any; 
  index: number; 
  onClick?: () => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: (e: React.MouseEvent) => void;
  isLiked?: boolean;
  onLikeToggle?: (e: React.MouseEvent) => void;
}) {
  const { copyToClipboard } = useClipboard();
  const { t } = useLanguage();
  // 캐시된 값들 계산
  const viewCount = `${((index * 0.3 + 1) % 5 + 1).toFixed(1)}k`;
  const likeCount = Math.floor((index * 1.7 + 1) % 20 + 1) + (isLiked ? 1 : 0);

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border w-full"
      style={{ 
        aspectRatio: item.aspectRatio,
        ...getGlassmorphismStyle(),
      }}
      onClick={onClick}
    >
      {/* 실제 이미지 표시 */}
      <ImageWithFallback
        src={item.finalResultImage}
        alt={item.category}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 호버 오버레이 - Figma 디자인 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(9,9,11,0.5)] to-[rgba(9,9,11,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="flex flex-col items-center relative size-full">
          <div className="box-border flex flex-col justify-between overflow-clip p-2.5 relative size-full">
            
            {/* 상단 - 타이틀과 공유하기 버튼 */}
            <div className="flex items-center justify-between relative w-full">
              <div className="flex gap-1.5 items-center relative shrink-0">
                <div className="leading-[1.4] not-italic relative shrink-0 text-xs text-nowrap text-white">
                  <p className="leading-[1.4] whitespace-pre">{item.category}</p>
                </div>
              </div>
              <div 
                className="relative shrink-0 size-[15px] cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(window.location.href);
                }}
              >
                <IconShare size={15} style={{ color: 'var(--color-glass-text)' }} />
              </div>
            </div>
            
            {/* 중앙 - 열기 버튼 (다국어 처리) */}
            <div className="flex items-center justify-center absolute inset-0 pointer-events-none">
              <div 
                className="pointer-events-auto px-6 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(79, 168, 216, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {t('gallery.clickToOpen')}
              </div>
            </div>
            
            {/* 하단 - 뷰, 좋아요, 북마크 */}
            <div className="flex items-center justify-between relative w-full">
              {/* 북마크 아이콘 - 왼쪽 배치 */}
              <IconBookmark 
                variant={isBookmarked ? 'filled' : 'outline'} 
                size={15} 
                style={{ color: 'var(--color-glass-text)' }}
                className="shrink-0 cursor-pointer hover:scale-110 hover:brightness-125 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkToggle?.(e);
                }}
              />
              {/* 뷰수, 좋아요 - 오른쪽 배치 */}
              <div className="flex gap-1.5 items-center relative shrink-0">
                <div className="relative shrink-0 size-[15px]">
                  <IconEye size={15} style={{ color: 'var(--color-glass-text)' }} />
                </div>
                <div className="text-xs font-normal leading-[1.4] relative shrink-0 text-nowrap text-white">
                  <p className="leading-[1.4] whitespace-pre">{viewCount}</p>
                </div>
                <IconHeart 
                  variant={isLiked ? 'filled' : 'outline'} 
                  size={15} 
                  style={{ color: 'var(--color-glass-text)' }}
                  className="shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeToggle?.(e);
                  }}
                />
                <div className="text-xs font-normal leading-[1.4] relative shrink-0 text-nowrap text-white">
                  <p className="leading-[1.4] whitespace-pre">{likeCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// 메인 콘텐츠 영역
const MainContent = memo(function MainContent({ onNavigateToCanvas, onLogoClick, onViewAllClick }: { onNavigateToCanvas: (scenarioId?: string | null) => void; onLogoClick?: () => void; onViewAllClick?: () => void }) {
  const { t } = useLanguage();
  
  // 화면 크기에 따른 갤러리 아이템 개수 결정 (새 프로젝트 카드 포함)
  const getDisplayItemCount = () => {
    if (typeof window === 'undefined') return 6; // SSR 대응
    
    const width = window.innerWidth;
    if (width < 480) return 4;      // 모바일: 4개 (새 프로젝트 1 + 기존 3)
    if (width < 768) return 5;      // 작은 태블릿: 5개 (새 프로젝트 1 + 기존 4)  
    if (width < 1024) return 5;     // 태블릿: 5개 (새 프로젝트 1 + 기존 4)
    if (width < 1280) return 6;     // 데스크톱 소: 6개 (새 프로젝트 1 + 기존 5)
    return 6;                       // 대형 화면: 6개 (새 프로젝트 1 + 기존 5)
  };

  const [displayCount, setDisplayCount] = useState(getDisplayItemCount());
  const [inputValue, setInputValue] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [isModelSelectionOpen, setIsModelSelectionOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set(['p1', 'p3', 'p6', 'p8'])); // 초기 북마크 (8개 시나리오)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<{id?: string, category: string, date: string, scenarioId?: string} | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof exploreItems[0] | null>(null);
  const [viewMode, setViewMode] = useState<'main' | 'continue' | 'explore'>('main');
  const [sortMode, setSortMode] = useState<'recent' | 'name' | 'bookmarked'>('recent'); // 정렬 모드
  
  // 스크롤 참조
  const continueRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  // 입력창 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // lineHeight 1.6 기준으로 줄 수 계산 (더 정확한 감지)
      // text-sm(14px) * 1.6 = 22.4px, text-base(16px) * 1.6 = 25.6px
      // 한 줄: ~25px, 두 줄: ~50px → 기준을 35px로 낮춤
      setIsMultiLine(scrollHeight > 35);

      // Limit max height to roughly 5 lines (approx 24px * 5 = 120px)
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // 입력창에서 생성하기 실행
  const handleCreateNew = () => {
    if (inputValue.trim()) {
      toast.success(t('project.createNewMessage'));
      setInputValue("");
    } else {
      toast.error(t('project.inputRequired'));
    }
  };

  // 엔터키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateNew();
    }
  };

  // 북마크 토글 함수
  const toggleBookmark = (itemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation(); // 부모 onClick 방지
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        toast.success(t('project.bookmarkRemoved'));
      } else {
        newSet.add(itemId);
        toast.success(t('project.bookmarkAdded'));
      }
      return newSet;
    });
  };

  // 프로젝트 정렬 함수
  const getSortedProjects = () => {
    let sorted = [...continueProjects];
    
    if (sortMode === 'recent') {
      sorted.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    } else if (sortMode === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'bookmarked') {
      sorted = sorted.filter(p => bookmarkedItems.has(p.id));
    }
    
    return sorted;
  };

  // 좋아요 토글 함수
  const toggleLike = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 onClick 방지
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // 갤러리 아이템 복제 핸들러
  const handleDuplicateGalleryItem = () => {
    if (selectedGalleryItem) {
      onNavigateToCanvas(selectedGalleryItem.scenarioId);
      setSelectedGalleryItem(null);
    }
  };

  // 이어하기 섹션으로 스크롤
  const scrollToContinue = () => {
    continueRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // 둘러보기 섹션으로 스크롤
  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setDisplayCount(getDisplayItemCount());
    };

    // 초기 설정
    setDisplayCount(getDisplayItemCount());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 이어하기 전체보기 페이지 렌더링
  if (viewMode === 'continue') {
    const sortedProjects = getSortedProjects();
    const hasProjects = sortedProjects.length > 0;
    
    return (
      <div className="flex flex-col h-full relative">
          {/* 전체 스크롤 가능한 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-6 pb-20">
            {/* 헤더 - 뒤로가기 + 타이틀 + 정렬 */}
            <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="group interactive rounded-full !h-10 !w-10 flex items-center justify-center !p-0 text-foreground hover:text-primary transition-colors duration-200 !bg-transparent hover:!bg-transparent"
                  onClick={() => setViewMode('main')}
                >
                  <ChevronLeft className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
                </Button>
                <NavButton 
                  label="이어하기"
                  icon={<IconStrokeContinue1 />}
                  iconHover={<IconFilledContinue1 />}
                />
              </div>
              
              {/* 정렬 옵션 */}
              <div className="flex items-center p-1 gap-1 bg-muted/30 rounded-lg border border-border/5">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 text-xs rounded-md transition-all ${
                    sortMode === 'recent' 
                      ? 'bg-background text-foreground shadow-sm hover:bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                  }`}
                  onClick={() => setSortMode('recent')}
                >
                  {t('project.sortRecent')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 text-xs rounded-md transition-all ${
                    sortMode === 'name' 
                      ? 'bg-background text-foreground shadow-sm hover:bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                  }`}
                  onClick={() => setSortMode('name')}
                >
                  {t('project.sortName')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 text-xs rounded-md transition-all ${
                    sortMode === 'bookmarked' 
                      ? 'bg-background text-foreground shadow-sm hover:bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                  }`}
                  onClick={() => setSortMode('bookmarked')}
                >
                  <IconBookmark className="w-3.5 h-3.5 mr-1" />
                  {t('project.filterBookmarked')}
                </Button>
              </div>
            </div>

            {/* 빈 상태 또는 프로젝트 그리드 */}
            {!hasProjects ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="text-center space-y-4 max-w-md">
                  <div 
                    className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
                    style={{
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <IconFolder className="w-10 h-10 text-primary/50" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    {t('project.noBookmarked')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('project.noBookmarkedDescription')}
                  </p>
                  <div className="flex gap-2 justify-center pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortMode('recent')}
                    >
                      전체 보기
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onNavigateToCanvas('blank')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      새 프로젝트
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
              >
                {/* 새로운 프로젝트 시작하기 카드 */}
                <div
                  className="relative overflow-hidden rounded-xl cursor-pointer aspect-square transition-all duration-300 hover:scale-105 border group"
                  style={{
                    backdropFilter: 'blur(var(--blur-glass))',
                    WebkitBackdropFilter: 'blur(var(--blur-glass))',
                    backgroundColor: 'var(--color-glass-bg)',
                    borderColor: 'var(--color-glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                  }}
                  onClick={() => onNavigateToCanvas('blank')}
                >
                  {/* 중앙 정렬 콘텐츠 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-2">
                    {/* 원형 파란색 배경 + 아이콘 */}
                    <div 
                      className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center border border-primary/50 group-hover:bg-primary/50 transition-colors duration-300"
                      style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                      }}
                    >
                      <Plus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {/* 텍스트 */}
                    <div className="text-center space-y-0.5">
                      <div className="text-sm font-medium leading-tight text-foreground">
                        {t('project.newProject')}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {t('project.startNew')}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 기존 프로젝트들 - 캔버스 미리보기 (역순: 8→7→6→5→4→3→2→1) */}
                {[...sortedProjects].reverse().map((project) => (
                  <div
                    key={project.id}
                    className="relative overflow-hidden rounded-xl cursor-pointer aspect-square transition-all duration-300 hover:scale-105 border group"
                    style={{
                      backdropFilter: 'blur(var(--blur-glass))',
                      WebkitBackdropFilter: 'blur(var(--blur-glass))',
                      backgroundColor: 'var(--color-glass-bg)',
                      borderColor: 'var(--color-glass-border)',
                      boxShadow: 'var(--glass-shadow)',
                    }}
                    onClick={() => onNavigateToCanvas(project.scenarioId)}
                  >
                    <CanvasThumbnail scenarioId={project.scenarioId} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-xl pointer-events-none" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 pointer-events-none">
                      <div className="text-white space-y-0.5">
                        <div className="text-sm font-medium leading-tight text-white truncate">
                          {project.name}
                        </div>
                        <div className="text-xs text-white/80 leading-tight truncate">
                          {project.lastModified}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    );
  }

  // 둘러보기 전체보기 페이지 렌더링
  if (viewMode === 'explore') {
    return (
      <div className="flex flex-col h-full relative">
          {/* 전체 스크롤 가능한 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-6 pb-20">
            {/* 헤더 - 뒤로가기 + 타이틀 */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="group interactive rounded-full !h-10 !w-10 flex items-center justify-center !p-0 text-foreground hover:text-primary transition-colors duration-200 !bg-transparent hover:!bg-transparent"
                onClick={() => setViewMode('main')}
              >
                <ChevronLeft className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
              </Button>
              <NavButton 
                label={t('nav.explore')}
                icon={<IconStrokeExplore1 />}
                iconHover={<IconFilledExplore1 />}
              />
            </div>

            {/* 둘러보기 갤러리 그리드 - 모든 아이템 표시 */}
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                320: 2,   // 모바일: 2열
                480: 2,   // 큰 모바일: 2열  
                768: 3,   // 태블릿: 3열
                1024: 4,  // 데스크톱: 4열
                1280: 5   // 큰 데스크톱: 5열
              }}
            >
              <Masonry gutter="12px">
                {exploreItems.map((item, i) => (
                  <GalleryItem 
                    key={`explore-all-${i}`}
                    item={item}
                    index={i}
                    onClick={() => onNavigateToCanvas(item.category)}
                    isBookmarked={bookmarkedItems.has(`explore-all-${i}`)}
                    onBookmarkToggle={(e) => toggleBookmark(`explore-all-${i}`, e)}
                    isLiked={likedItems.has(`explore-all-${i}`)}
                    onLikeToggle={(e) => toggleLike(`explore-all-${i}`, e)}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
      </div>
    );
  }

  // 메인 페이지 렌더링
  return (
    <div className="flex flex-col h-full relative">
        {/* X 버튼 - 좌측 상단 모서리에 절대 위치 */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <CloseButton 
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToCanvas();
            }}
            ariaLabel="캔버스로 이동"
            size="sm"
          />
        </div>
        
        {/* 전체 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-4 md:pt-6 pb-24 md:pb-32">
          {/* 로고 */}
          <div className="flex flex-col justify-center items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 2xl:pt-24 mb-6 sm:mb-10 md:mb-12">
            <GenPressoLogo onClick={onLogoClick} />
            <p className="text-sm md:text-base 2xl:text-xl text-muted-foreground mt-3 text-center">
              {t('common.tagline')}
            </p>
          </div>

          {/* 생성 입창 */}
          <div className="md:mb-8 mx-[0px] my-[15px]">
            <div className="w-full max-w-2xl 2xl:max-w-4xl mx-auto my-[42px] px-4 flex items-end gap-2">
              <div 
                className={`flex-1 relative border-[0.5px] border-solid ${isMultiLine ? 'rounded-[28px]' : 'rounded-full'} px-1.5 py-1.5 transition-all duration-200 flex items-center gap-1.5`}
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  backdropFilter: 'blur(var(--blur-glass))',
                  WebkitBackdropFilter: 'blur(var(--blur-glass))',
                  borderColor: 'var(--color-glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                {/* 입력창 내부 좌측: 파일첨부, 설정, 모델 선택 버튼 */}
                <div className="shrink-0 flex items-center gap-0 self-end">
                  {/* 파일 첨부 버튼 */}
                  <div className="relative group/attach">
                    <FileAttachPopover 
                      buttonClassName="!bg-transparent hover:!bg-[var(--glass-hover-bg)] !border-0 !shadow-none"
                      showLabel={false}
                    />
                    {/* 툴팁 */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/attach:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('upload.attachFile')}
                      </div>
                    </div>
                  </div>
                  
                  {/* 설정 버튼 */}
                  <div className="relative group/settings">
                    <button
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--glass-icon)',
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget;
                        btn.style.backgroundColor = 'var(--glass-hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget;
                        btn.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setIsAgentSettingsOpen(true)}
                      aria-label={t('agent.settings')}
                    >
                      <svg className="w-5 h-5 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    {/* 툴팁 */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/settings:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('agent.settings')}
                      </div>
                    </div>
                  </div>
                  
                  {/* 모델 선택 버튼 */}
                  <div className="relative group/model">
                    <button
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--glass-icon)',
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget;
                        btn.style.backgroundColor = 'var(--glass-hover-bg)';
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget;
                        btn.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setIsModelSelectionOpen(true)}
                      aria-label={t('agent.modelSelection')}
                    >
                      <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="2" />
                        <circle cx="6" cy="12" r="2" />
                        <circle cx="6" cy="18" r="2" />
                        <circle cx="12" cy="6" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="18" r="2" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="18" cy="12" r="2" />
                        <circle cx="18" cy="18" r="2" />
                      </svg>
                    </button>
                    {/* 툴팁 */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/model:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{
                        backgroundColor: 'var(--tooltip-bg)',
                        border: '0.5px solid var(--tooltip-border)',
                        backdropFilter: 'blur(var(--tooltip-backdrop))',
                        WebkitBackdropFilter: 'blur(var(--tooltip-backdrop))',
                        boxShadow: 'var(--tooltip-shadow)'
                      }}>
                        {t('agent.modelSelection')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 텍스트 입력 */}
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t('common.workWithAgent')}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm md:text-base min-w-0 resize-none overflow-y-auto py-0"
                  rows={1}
                  style={{ lineHeight: '1.6', maxHeight: '120px' }}
                />

                {/* Generate button (Circular Black Button) */}
                <Button 
                  size="icon"
                  className="shrink-0 rounded-full !h-8 !w-8 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center p-0 transition-all duration-200 shadow-sm self-end"
                  onClick={handleCreateNew}
                  aria-label={t('common.generate')}
                  type="submit"
                >
                  <ArrowUp 
                    strokeWidth={2.5}
                    className="w-5 h-5 text-primary-foreground"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* 스크롤 인디케이터 - 데스크톱에서만 표시 */}
          <div className="text-center mb-6 md:mb-8 hidden md:block">
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground mx-auto animate-bounce" />
          </div>

          {/* 이어하기 섹션 */}
          <div ref={continueRef} className="flex justify-between items-center md:mb-6 mt-0 mr-0 mb-3.5 ml-0">
            <NavButton 
              label={t('nav.continue')}
              icon={<IconStrokeContinue1 />}
              iconHover={<IconFilledContinue1 />}
              onClick={scrollToContinue}
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="group interactive rounded-full !h-10 !w-10 sm:!w-auto sm:!px-3 sm:gap-2 flex items-center justify-center !p-0 sm:!py-2 text-foreground hover:text-primary transition-colors duration-200 !bg-transparent hover:!bg-transparent"
              onClick={onViewAllClick}
            >
              <span className="hidden sm:inline group-hover:text-primary transition-colors duration-200">{t('project.viewAll')}</span>
              <ChevronRight className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
            </Button>
          </div>

          {/* 이어하기 갤러리 그리드 - 동적 개수 조정 */}
          {/* 모바일: 스택 레이아웃 */}
          <div className="mb-4 md:mb-16 px-2 py-1 md:hidden">
            <div className="space-y-3">
              {/* 새로운 프로젝트 시작하기 카드 */}
              <div
                className="border rounded-xl p-3 transition-all duration-200 cursor-pointer flex items-center space-x-3"
                style={getGlassmorphismStyle()}
                onClick={() => onNavigateToCanvas('blank')}
              >
                {/* 왼쪽 + 아이콘 */}
                <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                
                {/* 오른쪽 텍스트 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">새로운 프로젝트 시작하기</h4>
                  <p className="text-xs text-muted-foreground">새 작업 생성</p>
                </div>
              </div>
              
              {/* 기존 프로젝트들 - 모바일: 상위 3개만 표시 (역순: 8→7→6) */}
              {[...continueProjects].reverse().slice(0, 3).map((project) => (
                <div
                  key={`continue-mobile-${project.id}`}
                  className="border rounded-xl p-3 transition-all duration-200 cursor-pointer flex items-center space-x-3 group"
                  style={getGlassmorphismStyle()}
                  onClick={() => onNavigateToCanvas(project.scenarioId)}
                >
                  {/* 왼쪽 썸네일 */}
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-muted relative">
                    <CanvasThumbnail scenarioId={project.scenarioId} />
                  </div>
                  
                  {/* 오른쪽 텍스트 콘텐츠 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm truncate">{project.name}</h4>
                      {bookmarkedItems.has(project.id) && (
                        <IconBookmark className="w-3.5 h-3.5 text-primary fill-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{project.lastModified}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 데스크톱: 기존 그리드 레이아웃 */}
          <div 
            className="mb-4 md:mb-16 px-2 py-1 hidden md:grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${displayCount}, 1fr)`,
            }}
          >
            {/* 새로운 프로젝트 시작하기 카드 */}
            <div
              className="relative overflow-hidden rounded-xl cursor-pointer aspect-square transition-all duration-300 hover:scale-105 border group"
              style={getGlassmorphismStyle()}
              onClick={() => onNavigateToCanvas('blank')}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-2 new-project-content">
                <style dangerouslySetInnerHTML={{ __html: `
                  /* 부모 카드 스타일 재정의 */
                  .group:has(.new-project-content) {
                    border-style: dashed !important;
                    border-width: 2px !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    
                    /* Light Mode Defaults */
                    border-color: rgba(90, 90, 90, 0.2) !important; /* muted-foreground/20 */
                    background-color: rgba(216, 216, 216, 0.05) !important; /* muted/5 */
                  }
                  
                  /* Dark Mode Overrides */
                  :is(.dark) .group:has(.new-project-content) {
                    border-color: rgba(161, 161, 170, 0.2) !important; /* muted-foreground/20 */
                    background-color: rgba(82, 82, 91, 0.05) !important; /* muted/5 */
                  }

                  /* Hover Effects (Light) */
                  .group:has(.new-project-content):hover {
                    border-color: rgba(79, 168, 216, 0.5) !important; /* primary/50 */
                    background-color: rgba(216, 216, 216, 0.1) !important; /* muted/10 */
                  }

                  /* Hover Effects (Dark) */
                  :is(.dark) .group:has(.new-project-content):hover {
                    border-color: rgba(79, 168, 216, 0.5) !important; /* primary/50 */
                    background-color: rgba(82, 82, 91, 0.1) !important; /* muted/10 */
                  }

                  /* Icon Background */
                  .new-project-icon {
                    background-color: rgba(79, 168, 216, 0.1); /* primary/10 */
                  }
                  
                  /* Icon Scale on Hover */
                  .group:has(.new-project-content):hover .new-project-icon {
                    transform: scale(1.1);
                  }
                `}} />
                
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 new-project-icon"
                >
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                
                <div className="text-center space-y-0.5">
                  <div className="text-sm font-medium leading-tight text-foreground">
                    {t('project.startNew')}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                    {t('project.getStarted')}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 프로젝트 목록 (최신 수정순 정렬) */}
            {[...continueProjects]
              .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
              .slice(0, displayCount - 1)
              .map((project) => (
                <div
                  key={`continue-${project.id}`}
                  className="relative overflow-hidden rounded-xl cursor-pointer aspect-square transition-all duration-300 hover:scale-105 border group"
                  style={getGlassmorphismStyle()}
                  onClick={() => onNavigateToCanvas(project.scenarioId)}
                >
                  <CanvasThumbnail scenarioId={project.scenarioId} />
                  
                  {/* 그라데이션 오버레이 및 정보 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 pointer-events-none">
                    <div className="text-white space-y-0.5">
                      <div className="text-sm font-medium leading-tight truncate">
                        {project.name}
                      </div>
                      <div className="text-xs text-white/80 leading-tight truncate">
                        {project.lastModified}
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* 둘러보기 섹션 */}
          <div ref={exploreRef} className="flex justify-between items-center md:mb-6 mt-0 mr-0 mb-3.5 ml-0">
            <NavButton 
              label={t('nav.explore')}
              icon={<IconStrokeExplore1 />}
              iconHover={<IconFilledExplore1 />}
              onClick={scrollToExplore}
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="group interactive rounded-full !h-10 !w-10 sm:!w-auto sm:!px-3 sm:gap-2 flex items-center justify-center !p-0 sm:!py-2 text-foreground hover:text-primary transition-colors duration-200 !bg-transparent hover:!bg-transparent"
              onClick={() => setViewMode('explore')}
            >
              <span className="hidden sm:inline group-hover:text-primary transition-colors duration-200">{t('project.viewAll')}</span>
              <ChevronRight className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
            </Button>
          </div>

          {/* 둘러보기 갤러리 그리드 - Pinterest 스타일 Masonry 레이아웃 */}
          <div className="mb-6 md:mb-8">
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                320: 2,   // 모바일: 2열
                480: 2,   // 큰 모일: 2열  
                768: 3,   // 블릿: 3열
                1024: 4,  // 데스크톱: 4열
                1280: 5   // 큰 데스크톱: 5열
              }}
            >
              <Masonry gutter="12px">
                {exploreItems.map((item, i) => (
                  <GalleryItem 
                    key={`browse-${i}`}
                    item={item}
                    index={i}
                    onClick={() => setSelectedGalleryItem(item)}
                    isBookmarked={bookmarkedItems.has(`browse-${i}`)}
                    onBookmarkToggle={(e) => toggleBookmark(`browse-${i}`, e)}
                    isLiked={likedItems.has(`browse-${i}`)}
                    onLikeToggle={(e) => toggleLike(`browse-${i}`, e)}
                    showFinalResult={true}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>



          {/* 추가 카테고리 섹션 - 제거 */}
          
        </div>
      
      {/* 푸터 - 모바일 전용 (메인 캔버스 밖으로 이동) */}
      <div className="md:hidden">
        {/* 푸터 제거됨 */}
      </div>



      {/* 프로젝트 상세 Drawer - 모바일에서 아래에서 올라옴 */}
      <Drawer open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DrawerContent 
          className="h-auto max-h-[80vh] flex flex-col bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)]"
          style={getGlassmorphismStyle()}
        >
          <VisuallyHidden>
            <DrawerTitle>{t('project.detailTitle')}</DrawerTitle>
            <DrawerDescription>{t('project.detailDescription')}</DrawerDescription>
          </VisuallyHidden>
          <div className="relative flex-1 overflow-y-auto px-5 py-6 min-h-0">
            {selectedProject && (
              <>
                {/* 헤더 */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-100 mb-2">{selectedProject.category}</h2>
                  <p className="text-sm text-muted-foreground">{selectedProject.date}</p>
                </div>

                {/* 썸네일 */}
                <div className="w-full h-48 rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* 설명 섹션 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-100 mb-3">프로젝트 설명</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    이 프로젝트는 {selectedProject.category} 카테고리에 속 작업입니다. 
                    최신 디자인 트렌드를 반영하여 만들어졌으며, 사용자 경험을 최우선으로 고려했습니다.
                  </p>
                </div>

                {/* 상세 정보 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-100 mb-3">상세 정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">상태</span>
                      <span className="text-sm text-neutral-100 font-medium">진행중</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">진��률</span>
                      <span className="text-sm text-neutral-100 font-medium">75%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">마지막 수</span>
                      <span className="text-sm text-neutral-100 font-medium">{selectedProject.date}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground">태그</span>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">{selectedProject.category}</Badge>
                        <Badge variant="secondary" className="text-xs">디자인</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      onNavigateToCanvas(selectedProject.scenarioId || selectedProject.category);
                      setSelectedProject(null);
                    }}
                  >
                    이어하기
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedProject(null)}
                  >
                    닫기
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* 갤러리 상세보기 Dialog */}
      <GalleryDetailDialog
        open={selectedGalleryItem !== null}
        onOpenChange={(open) => !open && setSelectedGalleryItem(null)}
        item={selectedGalleryItem}
        onDuplicate={handleDuplicateGalleryItem}
      />

      {/* 에이전트 설정 Dialog */}
      <AgentSettingsDialog
        isOpen={isAgentSettingsOpen}
        onClose={() => setIsAgentSettingsOpen(false)}
      />

      {/* 모델 선택 Dialog */}
      <ModelSelectionDialog
        isOpen={isModelSelectionOpen}
        onClose={() => setIsModelSelectionOpen(false)}
      />
    </div>
  );
});

// 메인 레이아웃 컴포넌트
export default function GenPressoLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [sidebarExpansionLevel, setSidebarExpansionLevel] = useState<0 | 1 | 2>(0); // 0: 아이콘만, 1: 1차 확장, 2: 2차 확장
  const [settingsDefaultTab, setSettingsDefaultTab] = useState<TabType>('profile');
  const [projectMenuDefaultTab, setProjectMenuDefaultTab] = useState<"projects" | "viewAll" | "favorites" | "dashboard">('projects'); // 프로젝트 메뉴 기본 탭
  const [currentPage, setCurrentPage] = useState<'main' | 'canvas' | 'settings' | 'projects' | 'favorites' | 'dashboard'>('main'); // 페이지 상태 관리
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false); // 데스크톱 에이전트 대화창
  const [isHelpOpen, setIsHelpOpen] = useState(false); // 도움말 메뉴 상태
  const [helpView, setHelpView] = useState<'menu' | 'feedback'>('menu'); // 도움말 패널 뷰 상태
  const [isTransitioning, setIsTransitioning] = useState(false); // 페이지 전환 애니메이션 상태
  const [projectName, setProjectName] = useState("Untitled"); // 프로젝트��� 상태
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // 알림 Dialog 상태
  const [currentScenario, setCurrentScenario] = useState<string | null>(null); // 현재 시나리오 ID
  const isMobile = useIsMobile(); // 모바일 여부 확인
  const [showOnboarding, setShowOnboarding] = useState(false); // 온보딩 팝업 상태
  const [selectedNodeCount, setSelectedNodeCount] = useState(0); // 선택된 노드 개수
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false); // 에이전트 설정 Dialog 상태
  const [isModelSelectionOpen, setIsModelSelectionOpen] = useState(false); // 모델 선택 Dialog 상태

  // 로그인 후 온보딩 체크
  useEffect(() => {
    if (isLoggedIn && typeof window !== 'undefined') {
      const status = localStorage.getItem('user_profile_setup_status');
      if (!status || status === 'pending') {
        setShowOnboarding(true);
      }
    }
  }, [isLoggedIn]);

  // 유연한 네비게이션 함수
  const navigateToLevel = (targetLevel: 0 | 1 | 2) => {
    setSidebarExpansionLevel(targetLevel);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSidebarExpansionLevel(0);
    setCurrentPage('main');
    setIsAgentDrawerOpen(false);
    setIsHelpOpen(false);
  };

  // 캔버스로 이동 (시나리오 지정 가능)
  const navigateToCanvas = (scenarioId?: string | null) => {
    setIsTransitioning(true);
    setCurrentScenario(scenarioId || null);
    
    // 시나리오 ID에 해당하는 프로젝트명 설정
    if (scenarioId && scenarioId !== 'blank') {
      const project = continueProjects.find(p => p.scenarioId === scenarioId);
      if (project) {
        setProjectName(project.name);
      } else {
        setProjectName("Untitled");
      }
    } else {
      setProjectName("Untitled");
    }
    
    setTimeout(() => {
      setCurrentPage('canvas');
      setIsTransitioning(false);
      if (scenarioId) {
        toast.success("프로젝트 캔버스로 이동합니다!");
      } else {
        toast.success("새로운 프로젝트를 시작합니다!");
      }
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 메인 페이지로 돌아가기
  const navigateToMain = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('main');
      setIsTransitioning(false);
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 설정 페이지로 이동
  const navigateToSettings = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('settings');
      setIsTransitioning(false);
      // 사이드바 상태 지 (확장형 그대로)
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 외부 설정 이동 이벤트 리스너
  useEffect(() => {
    const handleNavigation = (e: CustomEvent<{ tab: TabType }>) => {
      const { tab } = e.detail;
      setSettingsDefaultTab(tab);
      navigateToSettings();
    };
    // @ts-ignore
    window.addEventListener('navigate-to-settings', handleNavigation);
    // @ts-ignore
    return () => window.removeEventListener('navigate-to-settings', handleNavigation);
  }, []);

  // 프로젝트 메뉴 페이지로 이동
  const navigateToProjects = () => {
    setProjectMenuDefaultTab('projects'); // 프로젝트 탭으로 설정
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('projects');
      setIsTransitioning(false);
      // 사이드바 상태 유지 (확장형 그대로)
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 즐겨찾기 메뉴 페이지로 이동
  const navigateToFavorites = () => {
    setProjectMenuDefaultTab('favorites'); // 즐겨찾기 탭으로 설정
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('favorites');
      setIsTransitioning(false);
      // 사이드바 상태 유지 (확장 그대로)
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 대시보드 메뉴 페이지로 이동
  const navigateToDashboard = () => {
    setProjectMenuDefaultTab('dashboard'); // 대시보드 탭으로 설정
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('dashboard');
      setIsTransitioning(false);
      // 사이드바 상태 유지 (확장형 그대로)
    }, ANIMATION.PAGE_TRANSITION);
  };

  // 전체보기 탭으로 이동
  const navigateToViewAll = () => {
    setProjectMenuDefaultTab('viewAll'); // 전체보기 탭으로 설정
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('projects'); // projects 페이지로 이동
      setIsTransitioning(false);
      // 사이드바 상태 유지 (확장형 그대로)
    }, ANIMATION.PAGE_TRANSITION);
  };

  // ���재 페이지 상태
  const showCanvas = currentPage === 'canvas';
  const showSettings = currentPage === 'settings';
  const showProjects = currentPage === 'projects';
  const showFavorites = currentPage === 'favorites';
  const showDashboard = currentPage === 'dashboard';

  // 사이드바 너비 계산
  const getSidebarWidth = () => {
    return sidebarExpansionLevel === 0 ? SIDEBAR_WIDTH.ICON_ONLY : SIDEBAR_WIDTH.EXPANDED;
  };

  // 통합 렌더링 - 공통 UI는 항상 유지 (깜빡임 방지)
  return (
    <div className="min-h-screen bg-background gradient-mesh relative">
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
      {/* 데스크톱 헤더 - 항상 표시 */}
      <header 
        className="hidden md:flex fixed top-0 left-0 right-0 px-2.5 py-1.5"
        style={{ 
          zIndex: Z_INDEX.HEADER,
          height: `${HEADER.HEIGHT}px`
        }}
      >
        <div className="flex justify-between items-center w-full">
          {/* 왼쪽: 언어 토글 + 로고 + 프로젝트명 (캔버스 모드에서만) */}
          <div className="flex items-center gap-3">
            <HeaderLogoSection 
              logoSize="small" 
              onLogoClick={navigateToMain}
              showCanvas={showCanvas}
            />
            {showCanvas && (
              <ProjectNameInput 
                value={projectName}
                onChange={setProjectName}
                placeholder="Untitled"
              />
            )}
          </div>
          {/* 오른쪽: 멤버 섹션 (캔버스 모드) + 공유 버튼 + 크레딧 버튼 - 3개 독립 div */}
          <div className="flex items-center gap-1.5">
            {/* 1. 멤버 섹션 */}
            {showCanvas && (
              <div>
                <MemberSection />
              </div>
            )}
            
            {/* 2. 공유 버튼 */}
            {showCanvas && (
              <div>
                <ShareButton />
              </div>
            )}
            
            {/* 3. 크레딧 버튼 */}
            <div>
              <CreditButton />
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 헤더 - 항상 표시 */}
      <MobileHeader 
        onLogoClick={navigateToMain}
        isNotificationOpen={isNotificationOpen}
        setIsNotificationOpen={setIsNotificationOpen}
        onNavigate={setCurrentPage}
        isAgentSettingsOpen={isAgentSettingsOpen}
        setIsAgentSettingsOpen={setIsAgentSettingsOpen}
      />

      {/* 사이드바 - 데스크톱에서만 표시, 항상 렌더링 */}
      <div className="hidden md:block">
        <ExpandableSidebar 
          expansionLevel={sidebarExpansionLevel}
          onNavigate={navigateToLevel}
          width={getSidebarWidth()}
          onSettingsClick={navigateToSettings}
          onProjectsClick={navigateToProjects}
          onFavoritesClick={navigateToFavorites}
          onDashboardClick={navigateToDashboard}
          onViewAllClick={navigateToViewAll}
          onLogout={handleLogout}
        />
      </div>

      {/* 에이전트 버튼 - 데스크톱 우측에 고정 (사이드바와 대칭, 헤더 아래) */}
      <div className="hidden md:block">
        {/* 투명한 오버레이 - 외부 클릭으로 닫기 */}
        {isAgentDrawerOpen && (
          <div 
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: Z_INDEX.OVERLAY }}
            onClick={() => setIsAgentDrawerOpen(false)}
          />
        )}
        
        {/* 에이전트 버 & 확장 패널 */}
        <div 
          className="fixed right-6"
          style={{
            top: `${HEADER.HEIGHT}px`,
            zIndex: Z_INDEX.PANEL,
            width: isAgentDrawerOpen ? `${AGENT_PANEL.WIDTH}px` : `${SPACING.BUTTON_SIZE}px`,
            height: isAgentDrawerOpen ? `calc(100vh - ${AGENT_PANEL.HEIGHT_OFFSET}px)` : `${SPACING.BUTTON_SIZE}px`,
          }}
          onClick={(e) => isAgentDrawerOpen && e.stopPropagation()}
        >
          {!isAgentDrawerOpen ? (
            // 버튼 상태
            <motion.div
              whileHover={{ scale: ANIMATION.HOVER_SCALE }}
              whileTap={{ scale: ANIMATION.TAP_SCALE }}
              transition={{ duration: 0.2 }}
            >
              <AgentButton 
                isActive={isAgentDrawerOpen} 
                onClick={() => setIsAgentDrawerOpen(true)}
                ariaLabel="AI 에이전트 열기"
              />
            </motion.div>
          ) : (
            // 확장된 채팅 패널 - 버튼 위치에서 확장
            <motion.div 
              className="relative w-full h-full"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{ transformOrigin: 'top right' }}
            >
              <AgentChatPanel onClose={() => setIsAgentDrawerOpen(false)} scenarioId={currentPage === 'canvas' ? (currentScenario as any) : null} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Help 버튼 - 데스크톱 우측 하단에 고정 */}
      <div className="hidden md:block">
        {/* 투명한 오버레이 - 외부 클릭으로 닫기 */}
        {isHelpOpen && (
          <div 
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsHelpOpen(false)}
          />
        )}
        
        {/* Help 버튼 & 확장 패널 - Agent 패널보다 위에 표시 */}
        <div 
          className="fixed right-6 z-[60]"
          style={{
            width: isHelpOpen ? (helpView === 'feedback' ? '310px' : '186px') : '44px',
            height: isHelpOpen ? 'auto' : '44px',
            bottom: isHelpOpen ? '4rem' : '4rem', // bottom-16 = 4rem
            maxHeight: isHelpOpen ? 'calc(100vh - 8rem)' : '44px', // 화면 높이에서 상하 여백(8rem) 빼기
          }}
          onClick={(e) => isHelpOpen && e.stopPropagation()}
        >
          {!isHelpOpen ? (
            // 버튼 상태
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <HelpButton 
                isActive={isHelpOpen} 
                onClick={() => setIsHelpOpen(true)}
                ariaLabel="도움말 열기"
              />
            </motion.div>
          ) : (
            // 확장된 Help 패널 - 버튼 위치에서 확장
            <motion.div 
              className="relative w-full h-full"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{ transformOrigin: 'bottom right' }}
            >
              <HelpPanel 
                onClose={() => {
                  setIsHelpOpen(false);
                  setHelpView('menu'); // 닫을 때 메뉴로 리셋
                }} 
                onViewChange={setHelpView}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* 모바일 Help Drawer - 아래에서 나타남, 우측 하단에 ? 버튼만 표시 */}
      {isMobile && (
        <Drawer open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DrawerTrigger asChild>
            <motion.div
              className="fixed bottom-6 right-4 z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <HelpButton isActive={isHelpOpen} ariaLabel="도움말 열기" />
            </motion.div>
          </DrawerTrigger>
          <DrawerContent 
            side="bottom" 
            className="h-auto max-h-[60vh] p-0 bg-[var(--color-glass-bg)] border-t border-solid border-[var(--color-glass-border)] rounded-t-2xl"
            style={getGlassmorphismStyle()}
            hideHandle={false}
          >
            <VisuallyHidden>
              <DrawerTitle>도움말</DrawerTitle>
              <DrawerDescription>도움말 메뉴</DrawerDescription>
            </VisuallyHidden>
            <HelpDrawerContent onClose={() => setIsHelpOpen(false)} />
          </DrawerContent>
        </Drawer>
      )}

      {/* 메인 콘텐츠 영역 - 조건부 렌더링 */}
      {showSettings ? (
        <>
          {/* 설정 화면 - 데스크톱 */}
          <DesktopGlassLayout sidebarExpansionLevel={sidebarExpansionLevel}>
            <SettingsPanel 
              onClose={navigateToMain} 
              onLogout={() => setIsLoggedIn(false)}
              defaultTab={settingsDefaultTab}
            />
          </DesktopGlassLayout>

          {/* 설정 화면 - 모바일 */}
          <MobileGlassLayout>
            <SettingsPanel 
              onClose={navigateToMain} 
              onLogout={() => setIsLoggedIn(false)}
              defaultTab={settingsDefaultTab}
            />
          </MobileGlassLayout>
        </>
      ) : showProjects || showFavorites || showDashboard ? (
        <>
          {/* 프로젝트/즐겨찾기/대시보드 메뉴 화면 - 데스크톱 */}
          <DesktopGlassLayout sidebarExpansionLevel={sidebarExpansionLevel}>
            <ProjectMenuPanel 
              onClose={navigateToMain} 
              defaultTab={projectMenuDefaultTab}
            />
          </DesktopGlassLayout>

          {/* 프로젝트/즐겨찾기/대시보드 메뉴 화면 - 모바일 */}
          <MobileGlassLayout>
            <ProjectMenuPanel 
              onClose={navigateToMain} 
              defaultTab={projectMenuDefaultTab}
            />
          </MobileGlassLayout>
        </>
      ) : !showCanvas ? (
        <>
          {/* 홈화면 - 데스크톱 */}
          <DesktopGlassLayout sidebarExpansionLevel={sidebarExpansionLevel}>
            <MainContent onNavigateToCanvas={navigateToCanvas} onLogoClick={navigateToMain} onViewAllClick={navigateToViewAll} />
          </DesktopGlassLayout>

          {/* 홈화면 - 모바일 */}
          <MobileGlassLayout>
            <MainContent onNavigateToCanvas={navigateToCanvas} onLogoClick={navigateToMain} onViewAllClick={navigateToViewAll} />
          </MobileGlassLayout>
        </>
      ) : (
        <>
          {/* 캔버스 - 데스크톱 (스크롤 없이 고정, 이드바 오버레이) */}
          <main 
            className="h-screen overflow-hidden hidden md:block relative"
          >
            <CanvasWorkspace onBack={navigateToMain} scenarioId={currentScenario} onSelectedNodeCountChange={setSelectedNodeCount} />
          </main>

          {/* 캔버스 - 모바일 (스크롤 없이 고정) */}
          <main className="md:hidden block h-screen overflow-hidden relative">
            <CanvasWorkspace onBack={navigateToMain} scenarioId={currentScenario} onSelectedNodeCountChange={setSelectedNodeCount} />
          </main>
        </>
      )}

      {/* 푸터 - 데스크톱 홈화면에서만 표시 (모바일은 MainContent 내부에 포함됨) */}
      <div className="hidden md:block">
        {!showCanvas && <TermsFooter />}
      </div>

      {/* 알림 Dialog */}
      <NotificationDialog 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 온보딩 팝업 */}
      <ProfileOnboardingDialog 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      {/* 에이전트 설정 Dialog */}
      <AgentSettingsDialog
        isOpen={isAgentSettingsOpen}
        onClose={() => setIsAgentSettingsOpen(false)}
      />

      {/* 모델 선택 Dialog */}
      <ModelSelectionDialog
        isOpen={isModelSelectionOpen}
        onClose={() => setIsModelSelectionOpen(false)}
      />
        </>
      )}
    </div>
  );
}