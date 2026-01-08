import React, { useState, useEffect, memo, useMemo } from "react";
import { CloseButton } from "../ui/close-button";
import { FolderOpen, Bookmark, LayoutDashboard, Menu, Search, Plus, Grid3x3, List } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getGlassmorphismStyle } from "../layout/style-utils";
import { useLanguage } from "../../contexts/LanguageContext";
import { CanvasThumbnail } from "../canvas/CanvasThumbnail";
import { continueProjects } from "../../data/mock-projects";
import { ProjectDetailDialog } from "./ProjectDetailDialog";

// --- Types ---
interface ProjectMenuPanelProps {
  onClose: () => void;
  defaultTab?: TabType;
  onNavigateToCanvas?: (scenarioId: string) => void;
}

type TabType = "projects" | "viewAll" | "favorites" | "dashboard";

// --- Constants & Mock Data Enrichment ---
const ENRICHED_PROJECTS = continueProjects.map((p, index) => ({
  ...p,
  status: index % 4 === 1 ? "archived" : "active",
  isBookmarked: false,
  participants: index % 3 === 0 ? [] : [
    { name: "User 1", avatar: "" },
    { name: "User 2", avatar: "" }
  ],
  images: []
}));

const GLASS_CARD_STYLE = getGlassmorphismStyle();

const SELECT_TRIGGER_STYLE = {
  backgroundColor: 'var(--glass-bg)',
  backdropFilter: 'blur(var(--glass-backdrop))',
  WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
  borderColor: 'var(--glass-border)',
};

// --- Shared Components ---

function GlassCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`rounded-2xl border p-2 ${className}`}
      style={GLASS_CARD_STYLE}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguage();
  const statusText = status === "active" ? t('project.active') : t('project.archived');
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .status-active-custom {
          background-color: #22c55e !important;
          color: white !important;
        }
        :is(.dark) .status-active-custom {
          background-color: rgba(34, 197, 94, 0.3) !important;
          color: #4ade80 !important;
          backdrop-filter: blur(4px);
        }
        .status-archived-custom {
          background-color: #71717a !important; /* zinc-500 */
          color: white !important;
        }
        :is(.dark) .status-archived-custom {
          background-color: rgba(113, 113, 122, 0.3) !important;
          color: #a1a1aa !important; /* zinc-400 */
          backdrop-filter: blur(4px);
        }
      `}} />
      <span 
        className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit whitespace-nowrap shrink-0 ${
          status === "active" 
            ? "status-active-custom" 
            : "status-archived-custom"
        }`}
      >
        {statusText}
      </span>
    </>
  );
}

function ParticipantAvatars({ participants }: { participants: { name: string; avatar: string }[] }) {
  const displayCount = 5;
  const additionalCount = participants.length > displayCount ? participants.length - displayCount : 0;
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center -space-x-2.5">
        {(participants.length > 0 ? participants : [{ name: "Me", avatar: "" }])
          .slice(0, displayCount)
          .map((participant, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs shadow-sm"
              style={{
                backgroundColor: 'var(--color-avatar-bg, #f0f0f0)',
                borderColor: 'var(--color-avatar-border, #fff)',
                color: 'var(--foreground)',
              }}
              title={participant.name}
            >
              {participant.name[0]}
            </div>
          ))}
      </div>
      {additionalCount > 0 && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          +{additionalCount}명
        </span>
      )}
    </div>
  );
}

// ID 기반 컬러 인덱스 계산 헬퍼
const getColorIndex = (id: string | number) => {
  const num = typeof id === 'number' ? id : (parseInt(id.replace(/\D/g, '')) || 0);
  return num % 3;
};

// Project Card Component (Reusable)
interface ProjectCardProps {
  project: typeof ENRICHED_PROJECTS[0];
  viewMode: "grid" | "gallery" | "list";
  onClick: () => void;
  onToggleBookmark: (e: React.MouseEvent) => void;
}

const ProjectCard = memo(({ project, viewMode, onClick, onToggleBookmark }: ProjectCardProps) => {
  const { t } = useLanguage();

  if (viewMode === "grid") {
    return (
      <GlassCard
        className="cursor-pointer transition-all hover:border-primary hover:scale-105"
        onClick={onClick}
      >
        <div className="grid grid-cols-2 gap-1 mb-3 rounded-lg overflow-hidden">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className={`relative aspect-square overflow-hidden ${
                idx < getColorIndex(project.id) + 2 
                  ? "bg-primary/10" 
                  : "bg-muted/10"
              }`}
            />
          ))}
        </div>

        <div className="space-y-2 -mt-1">
          <div className="flex items-center justify-between gap-1">
            <button onClick={onToggleBookmark} className="flex-shrink-0">
              <Bookmark 
                className={`w-4 h-4 transition-all ${
                  project.isBookmarked 
                    ? "fill-primary text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              />
            </button>
            <h4 className="text-sm flex-1 truncate">{project.name}</h4>
          </div>

          <p className="text-xs text-muted-foreground truncate">
            {project.lastModified}
          </p>

          <div className="flex items-center justify-between gap-2">
            <ParticipantAvatars participants={project.participants} />
            <StatusBadge status={project.status} />
          </div>
        </div>
      </GlassCard>
    );
  }

  // Gallery View (Full image with overlay)
  if (viewMode === "gallery") {
    return (
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer aspect-square transition-all duration-300 hover:scale-105 border group"
        style={{
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          backgroundColor: 'var(--color-glass-bg)',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
        onClick={onClick}
      >
        <CanvasThumbnail scenarioId={project.scenarioId} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-xl pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
          <div className="text-white space-y-0.5">
            <h4 className="text-sm font-medium leading-tight text-white truncate" title={project.name}>
              {project.name}
            </h4>
            <p className="text-xs text-white/80 leading-tight truncate">
              {project.lastModified}
            </p>
          </div>
        </div>

        <button 
          className={`absolute top-2 right-2 p-1 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 ${
            project.isBookmarked 
              ? "text-primary" 
              : "text-white/70 hover:text-primary"
          }`}
          onClick={onToggleBookmark}
        >
          <Bookmark className={`w-5 h-5 transition-colors ${project.isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>
    );
  }

  // List View
  return (
    <GlassCard
      className="cursor-pointer transition-all hover:border-primary hover:scale-[1.01]"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex-shrink-0 grid grid-cols-2 gap-0.5 rounded-lg overflow-hidden">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className={`relative ${
                idx < getColorIndex(project.id) + 2 
                  ? "bg-primary/10" 
                  : "bg-muted/10"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm truncate">{project.name}</h4>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            {t('project.lastModified')}: {project.lastModified}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <ParticipantAvatars participants={project.participants} />
          <button onClick={onToggleBookmark}>
            <Bookmark 
              className={`w-5 h-5 transition-all ${
                project.isBookmarked 
                  ? "fill-primary text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            />
          </button>
        </div>
      </div>
    </GlassCard>
  );
});

ProjectCard.displayName = "ProjectCard";


// --- Sub-Panels ---

function ProjectsContent({ onNavigateToCanvas }: { onNavigateToCanvas?: (scenarioId: string) => void }) {
  const { t } = useLanguage();
  const [selectedWorkspace, setSelectedWorkspace] = useState("workspace-1");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState(ENRICHED_PROJECTS);

  const workspaces = [
    { id: "workspace-1", name: t('project.myWorkspace', { name: '홍길동' }) },
    { id: "workspace-2", name: "Design Team Workspace" },
    { id: "workspace-3", name: "Dev Team Workspace" },
  ];

  const teams = [
    { id: "all", name: t('project.allTeams') },
    { id: "design", name: "Design Team" },
    { id: "dev", name: "Dev Team" },
    { id: "marketing", name: "Marketing Team" },
  ];

  const toggleBookmark = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, isBookmarked: !project.isBookmarked }
          : project
      )
    );
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (statusFilter === "progress") {
      result = result.filter(p => p.status === "active");
    } else if (statusFilter === "completed") {
      result = result.filter(p => p.status === "archived");
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.participants.some(participant => participant.name.toLowerCase().includes(query))
      );
    }

    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "date") {
      result.sort((a, b) => new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime());
    }

    return result;
  }, [projects, statusFilter, searchQuery, sortBy]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-semibold mb-1">{t('nav.projects')}</h3>
        <p className="text-xs text-muted-foreground">{t('project.manageDescription')}</p>
      </div>

      <div className="space-y-4">
        {/* Filters Row 1 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">{t('project.workspace')}</label>
            <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
              <SelectTrigger className="w-full h-10 rounded-2xl text-xs border" style={SELECT_TRIGGER_STYLE}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((ws) => (
                  <SelectItem key={ws.id} value={ws.id}>{ws.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-muted-foreground mb-1 block">{t('project.team')}</label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-full h-10 rounded-2xl text-xs border" style={SELECT_TRIGGER_STYLE}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teams.map((tm) => (
                  <SelectItem key={tm.id} value={tm.id}>{tm.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[100px]">
            <label className="text-xs text-muted-foreground mb-1 block">{t('project.status')}</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full h-10 rounded-2xl text-xs border" style={SELECT_TRIGGER_STYLE}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('project.allStatus')}</SelectItem>
                <SelectItem value="progress">{t('project.active')}</SelectItem>
                <SelectItem value="completed">{t('project.archived')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-muted-foreground mb-1 block">{t('project.sortBy')}</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full h-10 rounded-2xl text-xs border" style={SELECT_TRIGGER_STYLE}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">{t('project.recentModified')}</SelectItem>
                <SelectItem value="name">{t('gallery.sortName')}</SelectItem>
                <SelectItem value="date">{t('gallery.sortDate')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters Row 2 */}
        <div className="flex items-center gap-2">
          <div className="flex-[2] min-w-[200px] relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('project.searchNameCollaborators')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 py-2 rounded-full text-xs border"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-backdrop))',
                WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
                borderColor: 'var(--glass-border)',
              }}
            />
          </div>

          <div className="flex-1" />

          <Button
            onClick={() => toast.success(t('toast.created'))}
            className="shrink-0 h-10 w-10 sm:w-auto sm:px-4 rounded-full text-xs bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 sm:mr-0.5" />
            <span className="hidden sm:inline">{t('project.newProject')}</span>
          </Button>

          <div 
            className="shrink-0 flex items-center rounded-full border overflow-hidden h-10"
            style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
          >
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 h-full transition-colors ${
                viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <div className="w-px h-5" style={{ backgroundColor: 'var(--glass-border)' }} />
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 h-full transition-colors ${
                viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredAndSortedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-2">{t('project.noProjects')}</p>
            <p className="text-xs text-muted-foreground">{t('project.createFirst')}</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 [@media(min-width:1173px)]:grid-cols-5 [@media(min-width:1330px)]:grid-cols-6 gap-3" 
            : "space-y-2"
          }>
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                onClick={() => setSelectedProject(project)}
                onToggleBookmark={(e) => toggleBookmark(e, project.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectDetailDialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onNavigateToCanvas={onNavigateToCanvas}
      />
    </div>
  );
}

function ViewAllProjects({ onNavigateToCanvas }: { onNavigateToCanvas?: (scenarioId: string) => void }) {
  const { t } = useLanguage();
  const [selectedSort, setSelectedSort] = useState("recent");
  const [projects, setProjects] = useState(ENRICHED_PROJECTS);

  const toggleBookmark = (e: React.MouseEvent, projectId: string | number) => {
    e.stopPropagation();
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newStatus = !p.isBookmarked;
        toast.success(newStatus ? t('project.bookmarked') || "북마크됨" : t('project.unbookmarked') || "북마크 해제됨");
        return { ...p, isBookmarked: newStatus };
      }
      return p;
    }));
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (selectedSort === 'name') return a.name.localeCompare(b.name);
      if (selectedSort === 'bookmark') {
        if (a.isBookmarked === b.isBookmarked) return 0;
        return a.isBookmarked ? -1 : 1;
      }
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    });
  }, [projects, selectedSort]);

  const handleProjectClick = (project: typeof ENRICHED_PROJECTS[0]) => {
     if (onNavigateToCanvas) {
        onNavigateToCanvas(project.scenarioId);
      } else {
        toast.success(`"${project.name}" ${t('project.opened')}`);
      }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-secondary/20 rounded-lg p-1 border">
          {["recent", "name", "bookmark"].map(sortType => (
            <React.Fragment key={sortType}>
              <button
                onClick={() => setSelectedSort(sortType)}
                className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${
                  selectedSort === sortType
                    ? "bg-primary text-primary-foreground shadow font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sortType === "recent" ? "최근 수정" : sortType === "name" ? "이름순" : "북마크"}
              </button>
              {sortType !== "bookmark" && <div className="w-px h-3 bg-border mx-1" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {/* Create New Project Card */}
        <div 
          onClick={() => toast.success(t('toast.created'))}
          className="group relative aspect-square rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 bg-muted/5 cursor-pointer flex flex-col items-center justify-center gap-3 transition-all hover:bg-muted/10"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">새로운 프로젝트</p>
            <p className="text-xs text-muted-foreground mt-0.5">시작하기</p>
          </div>
        </div>

        {/* Project Gallery Cards */}
        {sortedProjects.map((project) => (
          <ProjectCard
             key={project.id}
             project={project}
             viewMode="gallery"
             onClick={() => handleProjectClick(project)}
             onToggleBookmark={(e) => toggleBookmark(e, project.id)}
          />
        ))}
      </div>
    </div>
  );
}

function FavoritesContent() {
  const { t } = useLanguage();
  
  const favorites = [
    { id: 1, name: "GenPresso Main Design", type: "Project", date: "2025-10-15" },
    { id: 2, name: "Brand Identity", type: "Project", date: "2025-10-14" },
    { id: 3, name: "UI Components", type: "File", date: "2025-10-13" },
    { id: 4, name: "User Interview", type: "File", date: "2025-10-12" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-1">{t('nav.favorites')}</h3>
        <p className="text-xs text-muted-foreground">{t('project.favoritesDescription')}</p>
      </div>

      <div className="space-y-2">
        {favorites.map((item) => (
          <GlassCard
            key={item.id}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Bookmark className="w-4 h-4 fill-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function DashboardContent() {
  const { t } = useLanguage();

  const stats = [
    { label: t('project.totalProjects'), value: 24, color: "text-blue-500" },
    { label: t('project.inProgress'), value: 8, color: "text-green-500" },
    { label: t('project.completed'), value: 16, color: "text-zinc-300" },
    { label: t('project.teamMembers'), value: 12, color: "text-purple-500" },
  ];

  const activities = [
    { 
      action: t('project.projectCreated'), 
      target: "GenPresso Main Design", 
      time: t('project.timeAgo.hoursAgo', { count: 2 }) 
    },
    { 
      action: t('project.fileUploaded'), 
      target: "Prototype.fig", 
      time: t('project.timeAgo.hoursAgo', { count: 5 }) 
    },
    { 
      action: t('project.commentAdded'), 
      target: "UI Component Library", 
      time: t('project.timeAgo.daysAgo', { count: 1 }) 
    },
    { 
      action: t('project.projectModified'), 
      target: "Brand Identity", 
      time: t('project.timeAgo.daysAgo', { count: 2 }) 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-1">{t('nav.dashboard')}</h3>
        <p className="text-xs text-muted-foreground">{t('project.dashboardDescription')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">{t('project.recentActivity')}</h4>
        <div className="space-y-2">
          {activities.map((activity, idx) => (
            <GlassCard key={idx} className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.target}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
const ProjectMenuPanelComponent = ({ onClose, defaultTab = "projects", onNavigateToCanvas }: ProjectMenuPanelProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const tabs = [
    { id: "projects" as TabType, label: t('nav.projects'), icon: FolderOpen },
    { id: "viewAll" as TabType, label: t('project.viewAll'), icon: Grid3x3 },
    { id: "favorites" as TabType, label: t('nav.favorites'), icon: Bookmark },
    { id: "dashboard" as TabType, label: t('nav.dashboard'), icon: LayoutDashboard },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute left-2.5 top-2.5 z-50">
        <CloseButton onClick={onClose} size="sm" />
      </div>

      <div className="flex items-center gap-2 px-12 py-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <Menu className="w-5 h-5 text-primary" />
        <h2 className="font-semibold">{t('nav.menu')}</h2>
      </div>

      <div className="relative px-6 pt-1">
        <div className="flex gap-0 overflow-x-auto relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-1.5 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-sm">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeProjectTab"
                  className="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <div 
          className="h-1 -mt-1 mx-4 rounded-lg" 
          style={{ backgroundColor: 'var(--glass-border)' }} 
        />
      </div>

      <div className="flex-1 overflow-y-auto px-12 py-4">
        {activeTab === "projects" && <ProjectsContent onNavigateToCanvas={onNavigateToCanvas} />}
        {activeTab === "viewAll" && <ViewAllProjects onNavigateToCanvas={onNavigateToCanvas} />}
        {activeTab === "favorites" && <FavoritesContent />}
        {activeTab === "dashboard" && <DashboardContent />}
      </div>
    </div>
  );
};

ProjectMenuPanelComponent.displayName = "ProjectMenuPanel";

export const ProjectMenuPanel = memo(ProjectMenuPanelComponent);
export default ProjectMenuPanel;
