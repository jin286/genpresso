import React, { useState, useMemo, memo } from "react";
import { Upload, Image, Video, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getGlassmorphismStyle } from "../layout/style-utils";
import { useLanguage } from "../../contexts/LanguageContext";

type TabType = "all" | "image" | "video";

interface FileItem {
  id: number;
  name: string;
  type: "image" | "video";
  url: string;
  size: string;
  uploadedAt: string;
  thumbnail?: string;
}

const MOCK_FILES: FileItem[] = [
  { id: 1, name: "product-hero.jpg", type: "image", url: "", size: "2.4MB", uploadedAt: "2025-10-16 14:30", thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400" },
  { id: 2, name: "team-photo.png", type: "image", url: "", size: "1.8MB", uploadedAt: "2025-10-16 14:25", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" },
  { id: 3, name: "demo-video.mp4", type: "video", url: "", size: "15.2MB", uploadedAt: "2025-10-16 14:20", thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400" },
  { id: 4, name: "background.jpg", type: "image", url: "", size: "3.1MB", uploadedAt: "2025-10-16 14:15", thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400" },
  { id: 5, name: "tutorial.mp4", type: "video", url: "", size: "22.5MB", uploadedAt: "2025-10-16 14:10", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400" },
  { id: 6, name: "logo-variations.png", type: "image", url: "", size: "0.9MB", uploadedAt: "2025-10-16 14:05", thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400" },
  { id: 7, name: "mockup-screens.jpg", type: "image", url: "", size: "4.2MB", uploadedAt: "2025-10-16 14:00", thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400" },
  { id: 8, name: "product-demo.mp4", type: "video", url: "", size: "18.7MB", uploadedAt: "2025-10-16 13:55", thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400" },
];

// 스타일 유틸리티 함수 사용으로 중복 제거 및 표준 CSS 변수 사용
const GLASS_CARD_STYLE = getGlassmorphismStyle();

function FileUploadCard() {
  return (
    <div 
      className="rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-200 hover:border-primary"
      style={{ ...GLASS_CARD_STYLE, boxShadow: 'var(--glass-shadow)' }}
      onClick={() => toast.success("파일 업로드 기능 (준비중)")}
    >
      <div className="h-full flex flex-col items-center justify-center gap-2 px-4 py-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-xs text-foreground mb-1">파일 업로드</p>
          <p className="text-xs text-muted-foreground">이미지 또는 동영상</p>
        </div>
      </div>
    </div>
  );
}

interface FileCardProps {
  file: FileItem;
}

function FileCard({ file }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${file.name} 삭제됨`);
  };

  return (
    <div 
      className="rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-200 hover:border-primary relative"
      style={{ ...GLASS_CARD_STYLE, boxShadow: 'var(--glass-shadow)' }}
      onClick={() => toast.success(`${file.name} 선택됨`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden bg-muted/20">
        {file.thumbnail ? (
          <ImageWithFallback 
            src={file.thumbnail} 
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {file.type === "image" ? (
              <Image className="w-12 h-12 text-muted-foreground" />
            ) : (
              <Video className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
        )}

        <div className="absolute top-2 left-2 px-2 py-1 rounded-lg backdrop-blur-sm bg-black/60">
          {file.type === "video" ? (
            <Video className="w-3 h-3 text-white" />
          ) : (
            <Image className="w-3 h-3 text-white" />
          )}
        </div>

        {isHovered && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 w-6 h-6 rounded-full backdrop-blur-sm bg-black/60 hover:bg-red-500 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-foreground truncate mb-1">{file.name}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{file.size}</span>
          <span>{file.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button 
      className="flex-1 h-11 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all relative"
      style={isActive ? {
        background: 'linear-gradient(to bottom, var(--tab-active-gradient-start), var(--tab-active-gradient-end))'
      } : {}}
      onClick={onClick}
    >
      <span className={`text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
      )}
    </button>
  );
}

interface FileUploadPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileUploadPanelComponent = ({ isOpen, onClose }: FileUploadPanelProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredFiles = useMemo(() => {
    return activeTab === "all" 
      ? MOCK_FILES 
      : MOCK_FILES.filter(file => file.type === activeTab);
  }, [activeTab]);

  const stats = useMemo(() => ({
    images: MOCK_FILES.filter(f => f.type === "image").length,
    videos: MOCK_FILES.filter(f => f.type === "video").length,
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
          <DialogTitle>{t('common.upload')}</DialogTitle>
          <DialogDescription>
            {t('upload.manageDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-b shrink-0" style={{ borderColor: 'var(--color-glass-border)' }}>
          <TabButton 
            label={t('common.viewAll')} 
            isActive={activeTab === "all"} 
            onClick={() => setActiveTab("all")} 
          />
          <TabButton 
            label={t('node.types.image')} 
            isActive={activeTab === "image"} 
            onClick={() => setActiveTab("image")} 
          />
          <TabButton 
            label={t('node.types.video')} 
            isActive={activeTab === "video"} 
            onClick={() => setActiveTab("video")} 
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FileUploadCard />
            {filteredFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>

        <div 
          className="px-6 py-4 border-t shrink-0"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t('upload.totalFiles', { count: filteredFiles.length })}</span>
            <span>{t('upload.stats', { images: stats.images, videos: stats.videos })}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

FileUploadPanelComponent.displayName = "FileUploadPanel";

export const FileUploadPanel = memo(FileUploadPanelComponent);
