import React, { useState, useMemo, memo } from "react";
import { Upload, Image, Video, X, Download, Info } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getGlassmorphismStyle } from "../layout/style-utils";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import { cn } from "../ui/utils";

type TabType = "all" | "image" | "video";

interface FileItem {
  id: number;
  name: string;
  type: "image" | "video";
  url: string;
  size: string;
  uploadedAt: string;
  thumbnail?: string;
  resolution?: string;
  created?: string;
}

const MOCK_FILES: FileItem[] = [
  { id: 1, name: "product-hero.jpg", type: "image", url: "", size: "2.4MB", uploadedAt: "2025-10-16 14:30", thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400", resolution: "1920x1080", created: "2025-10-16 14:30:22" },
  { id: 2, name: "team-photo.png", type: "image", url: "", size: "1.8MB", uploadedAt: "2025-10-16 14:25", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400", resolution: "1600x900", created: "2025-10-16 14:25:15" },
  { id: 3, name: "demo-video.mp4", type: "video", url: "", size: "15.2MB", uploadedAt: "2025-10-16 14:20", thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400", resolution: "1920x1080", created: "2025-10-16 14:20:45" },
  { id: 4, name: "background.jpg", type: "image", url: "", size: "3.1MB", uploadedAt: "2025-10-16 14:15", thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400", resolution: "2560x1440", created: "2025-10-16 14:15:30" },
  { id: 5, name: "tutorial.mp4", type: "video", url: "", size: "22.5MB", uploadedAt: "2025-10-16 14:10", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400", resolution: "1920x1080", created: "2025-10-16 14:10:12" },
  { id: 6, name: "logo-variations.png", type: "image", url: "", size: "0.9MB", uploadedAt: "2025-10-16 14:05", thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400", resolution: "1024x1024", created: "2025-10-16 14:05:50" },
  { id: 7, name: "mockup-screens.jpg", type: "image", url: "", size: "4.2MB", uploadedAt: "2025-10-16 14:00", thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400", resolution: "3840x2160", created: "2025-10-16 14:00:33" },
  { id: 8, name: "product-demo.mp4", type: "video", url: "", size: "18.7MB", uploadedAt: "2025-10-16 13:55", thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400", resolution: "1920x1080", created: "2025-10-16 13:55:18" },
];

const GLASS_CARD_STYLE = getGlassmorphismStyle();

interface FileDetailDialogProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

function FileDetailDialog({ file, isOpen, onClose }: FileDetailDialogProps) {
  const { t } = useLanguage();
  const [selectedScale, setSelectedScale] = useState<string>("x1");
  const [showInfo, setShowInfo] = useState(true);
  
  if (!file) return null;

  const handleDownload = () => {
    toast.success(`${file.name} ${t('common.download')} 시작`);
  };

  const handleImport = () => {
    toast.success(`${file.name} ${t('upload.importToCanvas')}`);
    onClose();
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
          <DialogTitle>File Details</DialogTitle>
          <DialogDescription>
            View and manage file details including size, resolution, and import options.
          </DialogDescription>
        </VisuallyHidden>

        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: "var(--color-glass-border)" }}
        >
          <h2 className="text-base font-semibold text-foreground">
            {file.type === 'video' ? `${t('node.videoViewer')} (에셋)` : `${t('node.imageViewer')} (에셋)`}
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
          <div className="flex-1 flex items-center justify-center p-4 min-w-0 transition-all duration-300 ease-in-out">
            {file.type === 'video' ? (
              file.thumbnail && (
                <video
                  src={file.thumbnail}
                  controls
                  className="w-full h-full object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                >
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              file.thumbnail && (
                <ImageWithFallback
                  src={file.thumbnail}
                  alt={file.name}
                  className="max-w-full max-h-full object-contain shadow-sm"
                />
              )
            )}
          </div>

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
                <div className="p-6 border-b" style={{ borderColor: "var(--color-glass-border)" }}>
                  <h3 className="text-sm font-semibold text-foreground mb-4">{t('upload.basicInfo')}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">파일명</p>
                      <p className="text-sm text-foreground break-all">{file.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.date')}</p>
                      <p className="text-sm text-foreground">{file.uploadedAt}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.size')}</p>
                        <p className="text-sm text-foreground">{file.size}</p>
                      </div>
                      
                      {file.resolution && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.resolution')}</p>
                          <p className="text-sm text-foreground">{file.resolution}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">{t('upload.creator')}</p>
                      <p className="text-sm text-foreground">jin@reconlabs.ai</p>
                    </div>
                  </div>
                </div>

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
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FileUploadCard() {
  const { t } = useLanguage();
  
  return (
    <div 
      className="rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-200 hover:border-primary"
      style={{ ...GLASS_CARD_STYLE, boxShadow: 'var(--glass-shadow)' }}
      onClick={() => toast.success(t('upload.uploadReady'))}
    >
      <div className="h-full flex flex-col items-center justify-center gap-2 px-4 py-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-xs text-foreground mb-1">{t('common.upload')}</p>
          <p className="text-xs text-muted-foreground">{t('upload.imageOrVideo')}</p>
        </div>
      </div>
    </div>
  );
}

interface FileCardProps {
  file: FileItem;
  onSelect: (file: FileItem) => void;
}

function FileCard({ file, onSelect }: FileCardProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${file.name} ${t('common.delete')}`);
  };

  return (
    <div 
      className="rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-200 hover:border-primary relative"
      style={{ ...GLASS_CARD_STYLE, boxShadow: 'var(--glass-shadow)' }}
      onClick={() => onSelect(file)}
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

        <div 
          className="absolute top-2 left-2 px-2 py-1 rounded-lg backdrop-blur-sm"
          style={{ backgroundColor: 'var(--popover-bg)' }}
        >
          {file.type === "video" ? (
            <Video className="w-3 h-3 text-foreground" />
          ) : (
            <Image className="w-3 h-3 text-foreground" />
          )}
        </div>

        {isHovered && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 w-6 h-6 rounded-full backdrop-blur-sm hover:bg-red-500 flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'var(--popover-bg)' }}
          >
            <X className="w-3.5 h-3.5 text-foreground" />
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
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredFiles = useMemo(() => {
    return activeTab === "all" 
      ? MOCK_FILES 
      : MOCK_FILES.filter(file => file.type === activeTab);
  }, [activeTab]);

  const stats = useMemo(() => ({
    images: MOCK_FILES.filter(f => f.type === "image").length,
    videos: MOCK_FILES.filter(f => f.type === "video").length,
  }), []);

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedFile(null);
  };

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
                <FileCard key={file.id} file={file} onSelect={handleFileSelect} />
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

      <FileDetailDialog file={selectedFile} isOpen={isDetailOpen} onClose={handleDetailClose} />
    </>
  );
};

FileUploadPanelComponent.displayName = "FileUploadPanel";

export const FileUploadPanel = memo(FileUploadPanelComponent);