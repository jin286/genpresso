import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { 
  User, ChevronLeft, ChevronDown, ChevronUp, 
  MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, 
  Search, Filter, Mail, UserPlus, UserMinus, Briefcase, ChevronRight 
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { useLanguage } from "../../../contexts/LanguageContext";
import { GLASS_CARD_STYLE, ROLE_BADGE_STYLES, MOCK_WORKSPACES, MOCK_MEMBERS, MOCK_TEAMS } from "../data";
import { 
  GlassTable, 
  GlassTableHeader, 
  GlassTableBody, 
  GlassTableRow, 
  GlassTableHead, 
  GlassTableCell,
  GlassBadge
} from "../../ui/glass-table";

export function WorkspaceTab() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"members" | "teams">("members");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'team' | 'role' | null>(null);
  const [teamSortBy, setTeamSortBy] = useState<'name' | 'members' | 'projects' | 'createdAt' | 'status' | 'credits' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedWorkspace, setSelectedWorkspace] = useState<typeof MOCK_WORKSPACES[0] | null>(null); // 워크스페이스 선택 안됨
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  React.useEffect(() => {
    const calculateItemsPerPage = () => {
      // 화면 높이에서 상단 UI 요소들(약 280px)을 제외한 높이를 행 높이(40px)로 나눔
      // 헤더, 탭, 필터바, 페이지네이션, 여백 등을 고려한 오프셋
      const UI_OFFSET = 280;
      const ROW_HEIGHT = 40;
      const availableHeight = window.innerHeight - UI_OFFSET;
      const count = Math.max(5, Math.floor(availableHeight / ROW_HEIGHT));
      setItemsPerPage(count);
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);
    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, []);
  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedRoleFilter, selectedStatusFilter, searchQuery, activeTab]);

  const getRoleBadgeStyle = useMemo(() => {
    return (role: string) => {
      const isDark = document.documentElement.classList.contains('dark');
      const config = ROLE_BADGE_STYLES[role as keyof typeof ROLE_BADGE_STYLES];
      if (!config) return {};
      return isDark ? config.dark : config.light;
    };
  }, []);

  const getMemberStats = useMemo(() => {
    return (members: typeof MOCK_MEMBERS) => ({
      total: members.length,
      administrators: members.filter(m => m.role === "Owner").length,
      managers: members.filter(m => m.role === "Manager").length,
      members: members.filter(m => m.role === "Member").length,
      invited: 0,
      withTeam: members.length,
      withoutTeam: 0,
    });
  }, []);

  const stats = getMemberStats(MOCK_MEMBERS);

  const roleFilters = [
    { label: t('workspace.all'), value: "all" },
    ...Object.keys(ROLE_BADGE_STYLES).map((role) => ({
      label: role,
      value: role,
    })),
  ];

  const statusFilters = [
    { label: t('workspace.all'), value: "all" },
    { label: t('workspace.active'), value: "active" },
    { label: t('workspace.archived'), value: "archived" },
  ];

  const actionButtons = activeTab === "members" 
    ? [
        { icon: Mail, label: t('workspace.resendInvite') },
        { icon: UserPlus, label: t('workspace.invite') },
        { icon: UserMinus, label: t('workspace.remove') },
      ]
    : [
        { icon: UserPlus, label: t('workspace.register') },
        { icon: Briefcase, label: t('workspace.createTeamWorkspace') },
      ];

  const memberTableHeaders = [
    { key: null, label: "", hint: "" },
    { key: "name" as const, label: t('workspace.member'), hint: t('workspace.sortByName') },
    { key: "email" as const, label: t('workspace.email'), hint: t('workspace.sortByEmail') },
    { key: "team" as const, label: t('workspace.team'), hint: t('workspace.sortByTeam') },
    { key: "role" as const, label: t('workspace.role'), hint: t('workspace.sortByRole') },
  ];

  const teamTableHeaders = [
    { key: null, label: "", hint: "" },
    { key: "name" as const, label: t('workspace.teamName'), hint: t('workspace.sortByName') },
    { key: "members" as const, label: t('workspace.memberCount'), hint: t('workspace.sortByNumber') },
    { key: "projects" as const, label: t('workspace.projectCount'), hint: t('workspace.sortByNumber') },
    { key: "createdAt" as const, label: t('workspace.createdAt'), hint: t('workspace.sortByDate') },
    { key: "status" as const, label: t('workspace.status'), hint: t('workspace.sortByActive') },
    { key: "credits" as const, label: t('workspace.credits'), hint: t('workspace.sortBySize') },
  ];

  const handleSort = (key: 'name' | 'email' | 'team' | 'role' | null) => {
    if (!key) return;
    
    if (sortBy === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortBy(null);
        setSortOrder('asc');
      }
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleTeamSort = (key: 'name' | 'members' | 'projects' | 'createdAt' | 'status' | 'credits' | null) => {
    if (!key) return;
    
    if (teamSortBy === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setTeamSortBy(null);
        setSortOrder('asc');
      }
    } else {
      setTeamSortBy(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: 'name' | 'email' | 'team' | 'role' | null) => {
    if (!key) return null;
    
    if (sortBy === key) {
      return sortOrder === 'asc' 
        ? <ArrowUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        : <ArrowDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />;
    }
    
    return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />;
  };
  
  const getTeamSortIcon = (key: 'name' | 'members' | 'projects' | 'createdAt' | 'status' | 'credits' | null) => {
    if (!key) return null;
    
    if (teamSortBy === key) {
      return sortOrder === 'asc' 
        ? <ArrowUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        : <ArrowDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />;
    }
    
    return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />;
  };
  
  let filteredMembers = MOCK_MEMBERS;
  
  if (selectedRoleFilter && selectedRoleFilter !== "all") {
    filteredMembers = filteredMembers.filter(m => m.role === selectedRoleFilter);
  }
  
  if (searchQuery && activeTab === "members") {
    filteredMembers = filteredMembers.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy) {
    filteredMembers = [...filteredMembers].sort((a, b) => {
      if (sortBy === 'role') {
        const roleWeight: Record<string, number> = {
          'Owner': 3,
          'Manager': 2,
          'Member': 1,
        };
        
        const aWeight = roleWeight[a.role] || 0;
        const bWeight = roleWeight[b.role] || 0;
        
        return sortOrder === 'asc' 
          ? aWeight - bWeight
          : bWeight - aWeight;
      }
      
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      const compareResult = aValue.localeCompare(bValue, 'ko-KR');
      
      return sortOrder === 'asc' ? compareResult : -compareResult;
    });
  }

  let filteredTeams = MOCK_TEAMS;

  if (selectedStatusFilter && selectedStatusFilter !== "all") {
    filteredTeams = filteredTeams.filter(t => t.status === selectedStatusFilter);
  }

  if (searchQuery && activeTab === "teams") {
    filteredTeams = filteredTeams.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (teamSortBy) {
    filteredTeams = [...filteredTeams].sort((a, b) => {
      const aValue = a[teamSortBy];
      const bValue = b[teamSortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const compareResult = String(aValue).localeCompare(String(bValue), 'ko-KR');
      return sortOrder === 'asc' ? compareResult : -compareResult;
    });
  }

  const totalPages = activeTab === "members" 
    ? Math.ceil(filteredMembers.length / itemsPerPage)
    : Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);
  const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigationClick = (direction: 'prev' | 'next') => {
    const isDisabled = direction === 'prev' ? currentPage === 1 : currentPage === totalPages;
    const message = direction === 'prev' ? '이전 페이지가 없습니다' : '다음 페이지가 없습니다';
    
    if (!isDisabled) {
      const newPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
      handlePageChange(newPage);
    } else {
      toast.info(message);
    }
  };

  if (!selectedWorkspace) {
    return (
      <div className="space-y-4">
        <div className="mb-6">
          <h3 className="font-semibold mb-1">{t('workspace.list')}</h3>
          <p className="text-xs text-muted-foreground">{t('workspace.selectDescription')}</p>
        </div>

        <div className="space-y-2">
          {MOCK_WORKSPACES.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => setSelectedWorkspace(workspace)}
              className="w-full h-14 rounded-2xl border transition-all duration-200 hover:bg-glass-hover-bg hover:border-primary/30 hover:scale-[1.01] active:scale-[0.99]"
              style={GLASS_CARD_STYLE}
            >
              <div className="flex items-center gap-2 h-full px-4">
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold truncate">{workspace.name}</p>
                </div>
                
                <GlassBadge 
                  className="w-20 px-3 h-7 flex items-center justify-center rounded-2xl border text-xs font-semibold flex-shrink-0"
                  style={getRoleBadgeStyle(workspace.role)}
                >
                  {workspace.role}
                </GlassBadge>
                
                <div 
                  className="w-16 px-3 h-7 flex items-center justify-center rounded-2xl border text-xs font-semibold flex-shrink-0"
                >
                  {workspace.projects}{t('workspace.projectsUnit')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedWorkspace(null)}
          className="w-8 h-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div 
          className="flex-1 h-10 px-3 rounded-xl border flex items-center justify-between transition-all duration-200"
        >
          <span className="text-sm">{selectedWorkspace?.name || ''}</span>
        </div>

        <GlassBadge
          className="h-10 w-32 px-3 rounded-xl border flex items-center justify-center transition-all duration-200"
          style={selectedWorkspace ? getRoleBadgeStyle(selectedWorkspace.role) : GLASS_CARD_STYLE}
        >
          <span className="text-sm">{selectedWorkspace?.role || ''}</span>
        </GlassBadge>

        <div 
          className="h-10 w-24 px-3 rounded-xl border flex items-center justify-center transition-all duration-200"
        >
          <span className="text-sm">{selectedWorkspace?.projects || 0}{t('workspace.projectsUnit')}</span>
        </div>

        <button
          onClick={() => setIsStatsExpanded(!isStatsExpanded)}
          className="h-10 px-3 rounded-xl border flex items-center gap-2 hover:bg-glass-hover-bg transition-all duration-200"
          style={{
            ...GLASS_CARD_STYLE,
            backgroundColor: isStatsExpanded ? 'var(--glass-hover-bg)' : GLASS_CARD_STYLE.backgroundColor,
          }}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{stats.total}{t('workspace.membersUnit')}</span>
          </div>
          {isStatsExpanded ? (
            <ChevronUp className="w-4 h-4 transition-all duration-200" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-all duration-200" />
          )}
        </button>
      </div>

      {isStatsExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border rounded-2xl overflow-hidden"
          style={GLASS_CARD_STYLE}
        >
          <div className="p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <GlassBadge
                className="px-3 h-6 flex items-center justify-center rounded-full border text-xs"
                style={getRoleBadgeStyle("Owner")}
              >
                {t('member.owner')} {stats.administrators}
              </GlassBadge>
              <GlassBadge
                className="px-3 h-6 flex items-center justify-center rounded-full border text-xs"
                style={getRoleBadgeStyle("Manager")}
              >
                {t('workspace.manager')} {stats.managers}
              </GlassBadge>
              <GlassBadge
                className="px-3 h-6 flex items-center justify-center rounded-full border text-xs"
                style={getRoleBadgeStyle("Member")}
              >
                {t('workspace.member')} {stats.members}
              </GlassBadge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div 
                className="px-4 py-3 rounded-xl border"
                style={getRoleBadgeStyle("Manager")}
              >
                <div className="text-xs opacity-80">{t('workspace.manager')}</div>
                <div className="text-2xl font-semibold mt-1">{stats.managers}</div>
              </div>
              <div 
                className="px-4 py-3 rounded-xl border"
                style={getRoleBadgeStyle("Member")}
              >
                <div className="text-xs opacity-80">{t('workspace.member')}</div>
                <div className="text-2xl font-semibold mt-1">{stats.members}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div 
                className="px-3 py-2 rounded-lg border text-center"
                style={(() => {
                  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
                  return isDark 
                    ? { backgroundColor: 'rgba(249, 115, 22, 0.3)', color: '#fb923c', borderColor: 'rgba(249, 115, 22, 0.3)' }
                    : { backgroundColor: '#f97316', color: '#ffffff', borderColor: '#f97316' };
                })()}
              >
                <div className="text-xs">{t('workspace.inviting')}</div>
                <div className="font-semibold">{stats.invited}</div>
              </div>
              <div 
                className="px-3 py-2 rounded-lg border text-center"
                style={(() => {
                  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
                  return isDark 
                    ? { backgroundColor: 'rgba(168, 85, 247, 0.3)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }
                    : { backgroundColor: '#a855f7', color: '#ffffff', borderColor: '#a855f7' };
                })()}
              >
                <div className="text-xs">{t('workspace.withTeam')}</div>
                <div className="font-semibold">{stats.withTeam}</div>
              </div>
              <div 
                className="px-3 py-2 rounded-lg border text-center"
                style={(() => {
                  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
                  return isDark 
                    ? { backgroundColor: 'rgba(107, 114, 128, 0.3)', color: '#9ca3af', borderColor: 'rgba(107, 114, 128, 0.3)' }
                    : { backgroundColor: '#6b7280', color: '#ffffff', borderColor: '#6b7280' };
                })()}
              >
                <div className="text-xs">{t('workspace.withoutTeam')}</div>
                <div className="font-semibold">{stats.withoutTeam}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-1.5 rounded-t-2xl transition-all duration-200 relative ${
              activeTab === "members"
                ? 'text-foreground font-medium z-20'
                : 'text-muted-foreground hover:text-foreground z-10'
            }`}
            style={{
              backgroundColor: activeTab === "members" ? 'var(--glass-bg)' : 'var(--tab-inactive-bg)',
              backdropFilter: activeTab === "members" ? 'blur(var(--glass-backdrop))' : 'none',
              WebkitBackdropFilter: activeTab === "members" ? 'blur(var(--glass-backdrop))' : 'none',
            }}
          >
            <span className="text-sm">{t('workspace.memberManagement')}</span>
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`px-4 py-1.5 rounded-t-2xl transition-all duration-200 relative ${
              activeTab === "teams"
                ? 'text-foreground font-medium z-20'
                : 'text-muted-foreground hover:text-foreground z-10'
            }`}
            style={{
              backgroundColor: activeTab === "teams" ? 'var(--glass-bg)' : 'var(--tab-inactive-bg)',
              backdropFilter: activeTab === "teams" ? 'blur(var(--glass-backdrop))' : 'none',
              WebkitBackdropFilter: activeTab === "teams" ? 'blur(var(--glass-backdrop))' : 'none',
            }}
          >
            <span className="text-sm">{t('workspace.teamManagement')}</span>
          </button>
        </div>

        <div 
          className="px-3 pb-4 pt-2 rounded-b-2xl rounded-tr-2xl"
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-backdrop))',
            WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          }}
        >
          <div className="text-xs text-muted-foreground leading-tight mb-3">
            {activeTab === "members" ? (
              <div className="space-y-0.5">
                <p>{t('workspace.memberManagementDescription1')}</p>
                <p>{t('workspace.memberManagementDescription2')}</p>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p>{t('workspace.teamManagementDescription1')}</p>
                <p>{t('workspace.teamManagementDescription2')}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={activeTab === "members" ? t('workspace.searchMembersPlaceholder') : t('workspace.searchTeamsPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8"
                />
              </div>
              {activeTab === "members" ? (
                <Select value={selectedRoleFilter || "all"} onValueChange={(value) => setSelectedRoleFilter(value === "all" ? null : value)}>
                  <SelectTrigger size="sm" className="w-[120px]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder={t('workspace.roleFilter')} className="text-muted-foreground" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {roleFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Select value={selectedStatusFilter || "all"} onValueChange={(value) => setSelectedStatusFilter(value === "all" ? null : value)}>
                  <SelectTrigger size="sm" className="w-[120px]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder={t('workspace.statusFilter')} className="text-muted-foreground" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {statusFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex flex-wrap gap-2 flex-shrink-0">
              {actionButtons.map((button) => (
                <Button
                  key={button.label}
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(`${button.label} ${t('workspace.clickedAction')}`)}
                >
                  <button.icon className="w-4 h-4 mr-1" />
                  {button.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <GlassTable className="table-fixed">
              {activeTab === "members" ? (
                <>
                  <GlassTableHeader>
                    <GlassTableRow className="hover:bg-transparent">
                      {memberTableHeaders.map((header, index) => (
                        <GlassTableHead
                          key={index}
                          className={`
                            ${header.key ? 'cursor-pointer select-none hover:text-primary transition-colors' : ''} 
                            ${
                              index === 0 ? 'w-12' : 
                              index === 1 ? 'w-[20%]' :
                              index === 2 ? 'w-[35%]' :
                              index === 3 ? 'w-[20%]' :
                              index === 4 ? 'w-[15%]' :
                              'w-12'
                            }
                          `}
                          onClick={() => handleSort(header.key)}
                        >
                          {header.key ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs whitespace-nowrap">{header.label}</span>
                              {getSortIcon(header.key)}
                            </div>
                          ) : (
                            <span className="text-xs whitespace-nowrap">{header.label}</span>
                          )}
                        </GlassTableHead>
                      ))}
                      <GlassTableHead className="w-12"></GlassTableHead>
                    </GlassTableRow>
                  </GlassTableHeader>
                  <GlassTableBody>
                    {paginatedMembers.map((member) => (
                      <GlassTableRow key={member.id}>
                        <GlassTableCell className="w-12">
                          <Checkbox />
                        </GlassTableCell>
                        <GlassTableCell className="w-[20%]">
                          <span className="text-sm truncate block">{member.name}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[35%]">
                          <span className="text-sm text-muted-foreground truncate block">{member.email}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[20%]">
                          <span className="text-sm truncate block">{member.team}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[15%]">
                          <GlassBadge 
                            className="w-20 px-3 h-6 rounded-xl border inline-flex items-center justify-center text-xs whitespace-nowrap text-center"
                            style={getRoleBadgeStyle(member.role)}
                          >
                            {member.role}
                          </GlassBadge>
                        </GlassTableCell>
                        <GlassTableCell className="w-12">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </GlassTableCell>
                      </GlassTableRow>
                    ))}
                    {Array.from({ length: itemsPerPage - paginatedMembers.length }).map((_, index) => (
                      <GlassTableRow key={`empty-${index}`} className="hover:bg-transparent">
                         <GlassTableCell className="w-12">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[20%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[35%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[20%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[15%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-12">&nbsp;</GlassTableCell>
                      </GlassTableRow>
                    ))}
                  </GlassTableBody>
                </>
              ) : (
                <>
                  <GlassTableHeader>
                    <GlassTableRow className="hover:bg-transparent">
                      {teamTableHeaders.map((header, index) => (
                        <GlassTableHead
                          key={index}
                          className={`
                            ${header.key ? 'cursor-pointer select-none hover:text-primary transition-colors' : ''}
                            ${
                              index === 0 ? 'w-12' :
                              index === 1 ? 'w-[20%]' :
                              index === 2 ? 'w-[10%]' :
                              index === 3 ? 'w-[10%]' :
                              index === 4 ? 'w-[20%]' :
                              index === 5 ? 'w-[15%]' :
                              index === 6 ? 'w-[15%]' :
                              'w-12'
                            }
                          `}
                          onClick={() => handleTeamSort(header.key)}
                        >
                          {header.key ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs whitespace-nowrap">{header.label}</span>
                              {getTeamSortIcon(header.key)}
                            </div>
                          ) : (
                            <span className="text-xs whitespace-nowrap">{header.label}</span>
                          )}
                        </GlassTableHead>
                      ))}
                      <GlassTableHead className="w-12"></GlassTableHead>
                    </GlassTableRow>
                  </GlassTableHeader>
                  <GlassTableBody>
                    {paginatedTeams.map((team) => (
                      <GlassTableRow key={team.id}>
                        <GlassTableCell className="w-12">
                          <Checkbox />
                        </GlassTableCell>
                        <GlassTableCell className="w-[20%]">
                          <span className="text-sm truncate block">{team.name}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[10%]">
                          <div className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-sm">{team.members}</span>
                          </div>
                        </GlassTableCell>
                        <GlassTableCell className="w-[10%]">
                          <span className="text-sm">{team.projects}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[20%]">
                          <span className="text-sm text-muted-foreground truncate block">{team.createdAt}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-[15%]">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                            team.status === 'active' 
                              ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                              : 'bg-muted text-muted-foreground border-border'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              team.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
                            }`} />
                            {team.status === 'active' ? t('workspace.active') : t('workspace.archived')}
                          </div>
                        </GlassTableCell>
                        <GlassTableCell className="w-[15%]">
                          <span className="text-sm font-mono">{team.credits.toLocaleString()}</span>
                        </GlassTableCell>
                        <GlassTableCell className="w-12">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </GlassTableCell>
                      </GlassTableRow>
                    ))}
                    {Array.from({ length: itemsPerPage - paginatedTeams.length }).map((_, index) => (
                      <GlassTableRow key={`empty-team-${index}`} className="hover:bg-transparent">
                         <GlassTableCell className="w-12">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[20%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[10%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[10%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[20%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[15%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-[15%]">&nbsp;</GlassTableCell>
                         <GlassTableCell className="w-12">&nbsp;</GlassTableCell>
                      </GlassTableRow>
                    ))}
                  </GlassTableBody>
                </>
              )}
            </GlassTable>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground">
                {t('workspace.pageInfo', { current: currentPage, total: totalPages })}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleNavigationClick('prev')}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-6 h-6 rounded-md text-xs font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleNavigationClick('next')}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}