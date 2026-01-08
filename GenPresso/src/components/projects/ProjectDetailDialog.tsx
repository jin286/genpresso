import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Share2, Heart, Eye, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner@2.0.3";
import { CloseButton } from "../ui/close-button";

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onNavigateToCanvas?: (scenarioId: string) => void;
}

interface CanvasData {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
  views: number;
  likes: number;
  isBookmarked: boolean;
  scenarioId: string;
}

const ITEMS_PER_PAGE = 10;

// ----------------------------------------------------------------------
// Mock Data Generator
// ----------------------------------------------------------------------

const generateMockCanvases = (project: any): CanvasData[] => {
  if (!project) return [];
  const projectId = project.id;
  
  // 특정 프로젝트(p12)의 경우 더 많은 캔버스 생성
  const isNatureProject = projectId === 'p12' || project.name === '자연 풍경 디자인';
  const count = isNatureProject ? 18 : 8; // 페이지네이션 테스트를 위해 18개로 증가

  return Array.from({ length: count }).map((_, i) => ({
    id: `${projectId}-canvas-${i}`,
    name: i === 0 ? `New Canvas 2025.12.17` : 
          isNatureProject ? `Nature Scene ${i}` : `Canvas ${i + 1}`,
    thumbnail: "", 
    lastModified: "2025.12.17",
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 200) + 10,
    isBookmarked: Math.random() > 0.7,
    scenarioId: "text-to-image"
  }));
};

// ----------------------------------------------------------------------
// Sub Components
// ----------------------------------------------------------------------

// 1. 캔버스 생성 카드 (메인 화면 스타일 통일)
const CreateCanvasCard = ({ onClick, t }: { onClick: () => void, t: any }) => (
  <button 
    onClick={onClick}
    className="group relative aspect-square flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-all hover:border-primary/50 hover:bg-muted/10"
  >
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 transition-transform group-hover:scale-110">
      <Plus className="w-6 h-6 text-primary" />
    </div>
    <div className="text-center space-y-0.5">
      <div className="text-sm font-medium leading-tight text-foreground">
        {t('project.createCanvas') || "캔버스 생성하기"}
      </div>
      <div className="text-xs text-muted-foreground leading-tight">
        {t('project.start') || "시작하기"}
      </div>
    </div>
  </button>
);

// 2. 캔버스 아이템 카드
const CanvasCard = ({ 
  canvas, 
  onNavigate, 
  onDelete, 
  onShare, 
  onBookmark, 
  t 
}: { 
  canvas: CanvasData;
  onNavigate?: (id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onShare: (e: React.MouseEvent, id: string) => void;
  onBookmark: (e: React.MouseEvent, id: string) => void;
  t: any;
}) => (
  <div
    className="group relative aspect-square rounded-xl border overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:ring-2 hover:ring-primary/50"
    style={{
      backgroundColor: 'var(--glass-bg)',
      borderColor: 'var(--glass-border)',
      boxShadow: 'var(--glass-shadow)',
    }}
    onClick={() => onNavigate?.(canvas.scenarioId)}
  >
    {/* 썸네일 플레이스홀더 */}
    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
      <div className="w-full h-full opacity-30 bg-gradient-to-br from-muted to-background" />
    </div>

    {/* 호버 오버레이 */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4">
      {/* 상단: 제목 및 액션 (절대 위치) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <h3 className="text-white text-sm font-medium truncate flex-1 pr-2">
          {canvas.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={(e) => onDelete(e, canvas.id)}
            className="text-white/70 hover:text-red-400 transition-all duration-200 hover:scale-110"
            aria-label="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={(e) => onShare(e, canvas.id)}
            className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 중앙: 열기 배지 (완전 중앙 정렬) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
          {t('project.opened') || '열기'}
        </div>
      </div>

      {/* 하단: 북마크 및 통계 (위치 변경됨: 북마크 좌측, 통계 우측) */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <button 
          onClick={(e) => onBookmark(e, canvas.id)}
          className={`transition-all duration-200 hover:scale-110 hover:brightness-125 ${
            canvas.isBookmarked ? 'text-blue-500' : 'text-white/70 hover:text-white'
          }`}
          aria-label="Bookmark"
        >
          <Bookmark className={`w-3.5 h-3.5 ${canvas.isBookmarked ? 'fill-current' : ''}`} />
        </button>

        <div className="flex items-center gap-3 text-white/70">
          <div className="flex items-center gap-1.5 text-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>{canvas.views}</span>
          </div>
          <button 
            className="flex items-center gap-1.5 text-xs hover:text-red-400 transition-all duration-200 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              toast.success("좋아요를 눌렀습니다");
            }}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{canvas.likes}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// 3. 페이지네이션
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center gap-2">
    <button 
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="w-9 h-9 flex items-center justify-center rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;
        return (
          <button 
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 flex items-center justify-center rounded-2xl text-sm font-medium transition-colors ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>

    <button 
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="w-9 h-9 flex items-center justify-center rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export function ProjectDetailDialog({ isOpen, onClose, project, onNavigateToCanvas }: ProjectDetailDialogProps) {
  const { t } = useLanguage();
  const [canvases, setCanvases] = useState<CanvasData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize data
  useEffect(() => {
    if (isOpen && project) {
      setCanvases(generateMockCanvases(project));
      setCurrentPage(1);
    }
  }, [isOpen, project]);

  // Handlers
  const handleToggleBookmark = (e: React.MouseEvent, canvasId: string) => {
    e.stopPropagation();
    setCanvases(prev => prev.map(c => 
      c.id === canvasId ? { ...c, isBookmarked: !c.isBookmarked } : c
    ));
    toast.success(t('project.bookmarked') || "북마크가 변경되었습니다.");
  };

  const handleDeleteCanvas = (e: React.MouseEvent, canvasId: string) => {
    e.stopPropagation();
    toast.error("캔버스를 삭제하시겠습니까? (기능 미구현)");
  };

  const handleShareCanvas = (e: React.MouseEvent, canvasId: string) => {
    e.stopPropagation();
    toast.success("공유 링크가 복사되었습니다.");
  };

  const handleCreateCanvas = () => {
    toast.success(t('toast.created') || "새 캔버스가 생성되었습니다.");
  };

  // Pagination Logic
  const totalItems = canvases.length;
  // 첫 페이지는 생성 버튼(1개) + 캔버스(9개) = 10개 아이템
  // 이후 페이지는 캔버스(10개)
  const firstPageCanvasCount = ITEMS_PER_PAGE - 1;
  const remainingItems = Math.max(0, totalItems - firstPageCanvasCount);
  const additionalPages = Math.ceil(remainingItems / ITEMS_PER_PAGE);
  const totalPages = 1 + additionalPages;

  const currentCanvases = useMemo(() => {
    const reversed = [...canvases].reverse(); // 최신순 정렬
    
    if (currentPage === 1) {
      return reversed.slice(0, firstPageCanvasCount);
    } else {
      const start = firstPageCanvasCount + (currentPage - 2) * ITEMS_PER_PAGE;
      return reversed.slice(start, start + ITEMS_PER_PAGE);
    }
  }, [canvases, currentPage, firstPageCanvasCount]);

  if (!isOpen || !project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10 pointer-events-none"
          >
            <div 
              className="w-full max-w-5xl h-auto max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative border"
              style={{
                backgroundColor: 'var(--glass-bg)', // 글래스모피즘 배경
                borderColor: 'var(--glass-border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* 1. Header */}
              <div 
                className="flex items-center justify-between px-6 py-4 border-b relative"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    {project.name}
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {canvases.length}
                    </span>
                  </h2>
                </div>
                {/* 닫기 버튼 (가이드라인 준수: 우측 상단 10px 여백) */}
                <div className="absolute right-2.5 top-2.5 z-50">
                  <CloseButton onClick={onClose} size="sm" />
                </div>
              </div>

              {/* 2. Status Banner */}
              <div 
                className="px-6 py-3 border-b flex items-center justify-between"
                style={{ 
                  backgroundColor: 'var(--glass-active-bg)', // 테마에 맞춰 배경색 조정 (다크모드에선 밝게, 라이트모드에선 어둡게)
                  borderColor: 'var(--glass-border)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-zinc-500'}`} />
                  <span className="text-sm text-foreground font-medium">
                    {project.status === 'active' ? (t('project.active') || '사용중인 프로젝트') : (t('project.archived') || '보관된 프로젝트')}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t('common.lastModified') || '마지막 수정'}: {project.lastModified}
                </span>
              </div>

              {/* 3. Content Body (Grid) */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Create Button (Only on Page 1) */}
                  {currentPage === 1 && (
                    <CreateCanvasCard onClick={handleCreateCanvas} t={t} />
                  )}

                  {/* Canvas Items */}
                  {currentCanvases.map((canvas) => (
                    <CanvasCard
                      key={canvas.id}
                      canvas={canvas}
                      onNavigate={onNavigateToCanvas}
                      onDelete={handleDeleteCanvas}
                      onShare={handleShareCanvas}
                      onBookmark={handleToggleBookmark}
                      t={t}
                    />
                  ))}
                </div>
              </div>

              {/* 4. Footer */}
              <div 
                className="flex items-center justify-between px-6 py-4 border-t"
                style={{ 
                  borderColor: 'var(--glass-border)',
                  backgroundColor: 'rgba(0,0,0,0.2)' 
                }}
              >
                <div className="text-xs text-muted-foreground">
                  {t('project.totalCanvases', { count: totalItems }) || `총 ${totalItems}개의 캔버스`}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
