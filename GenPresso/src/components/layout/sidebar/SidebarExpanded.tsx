import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  IconUnifiedArrowUp, 
  IconUnifiedArrowDown, 
  IconStrokeFolder,
  IconFilledFolder,
  IconStrokeBookmark,
  IconFilledBookmark,
  IconStrokeChart,
  IconFilledChart,
  IconStrokeNote,
  IconFilledNote
} from "../../icons";
import { CloseButton } from "../../ui/close-button";
import { HoverableListItem } from "../../ui/hoverable-list-item";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ProfileField } from "../common/SideNavProfileComponents";
import { Separator, QuickActions } from "./SidebarCommon";

// --- Profile Component ---

function ProfileExpandedSmall({ onNotificationClick, onMessageClick }: { onNotificationClick?: () => void; onMessageClick?: () => void }) {
  return (
    <div 
      className="h-[120px] relative rounded-2xl shrink-0 w-full overflow-hidden bg-glass-bg shadow-glass-shadow backdrop-blur-glass" 
      data-name="Profile Expanded (Small)"
    >
      <div aria-hidden="true" className="absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-2xl border-glass-border" />
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-center p-2.5 relative size-full">
          <ProfileField />
          <QuickActions onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} />
        </div>
      </div>
    </div>
  );
}

// --- Navigation Items ---

function Search1() {
  const { t } = useLanguage();
  return (
    <div className="relative h-[33px] w-full" data-name="Search">
      <div className="relative flex items-center h-full">
        <div className="absolute left-3 z-10">
          <svg className="h-4 w-4 opacity-40 text-glass-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={t('common.searchPlaceholder')}
          className="w-full h-full pl-10 pr-4 bg-secondary/10 backdrop-blur-sm border border-border/10 rounded-full text-sm focus:outline-none focus:border-primary/20 focus:bg-secondary/20 hover:bg-secondary/20 transition-all duration-200 placeholder:opacity-40 text-glass-text"
          style={{ '--tw-placeholder-opacity': '0.4' } as React.CSSProperties}
          aria-label={t('common.searchPlaceholder')}
        />
      </div>
    </div>
  );
}

function Menu1() {
  const { t } = useLanguage();
  return (
    <div className="relative shrink-0 w-full" data-name="Menu">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start px-2.5 py-1 relative w-full">
          <div className="content-stretch flex gap-1 items-center relative shrink-0 w-[146px]" data-name="Menu">
            <div className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-xs font-semibold text-glass-text">
              <p className="leading-none font-bold">{t('nav.menu')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects1({ onViewAllClick }: { onViewAllClick?: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-1 w-full">
      <HoverableListItem
        icon={<IconStrokeFolder className="text-glass-icon" />}
        iconHover={<IconFilledFolder className="text-primary" />}
        label={t('nav.projects')}
        dataName="Projects"
      />
      <HoverableListItem
        icon={
          <div style={{ '--fill-0': 'var(--color-glass-icon)' } as React.CSSProperties} className="w-full h-full">
            <IconStrokeNote className="w-full h-full" />
          </div>
        }
        iconHover={
          <div style={{ '--fill-0': 'var(--color-primary)' } as React.CSSProperties} className="w-full h-full">
            <IconFilledNote className="w-full h-full" />
          </div>
        }
        label={t('project.viewAll')}
        dataName="ViewAll"
        onClick={onViewAllClick}
      />
    </div>
  );
}

function Bookmarks1() {
  const { t } = useLanguage();
  return (
    <HoverableListItem
      icon={<IconStrokeBookmark className="text-glass-icon" />}
      iconHover={<IconFilledBookmark className="text-primary" />}
      label={t('nav.favorites')}
      dataName="Favorites"
    />
  );
}

function Dashboard1() {
  const { t } = useLanguage();
  return (
    <HoverableListItem
      icon={<IconStrokeChart />}
      iconHover={<IconFilledChart />}
      label={t('nav.dashboard')}
      dataName="Dashboard"
    />
  );
}

function Logout() {
  const { t } = useLanguage();
  return (
    <button 
      className="content-stretch flex flex-col h-[33px] items-start relative rounded-full shrink-0 w-full bg-secondary/10 border border-border/10 hover:bg-secondary/20 hover:border-primary/20 transition-all duration-200 cursor-pointer backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
      data-name="Logout"
      aria-label={t('nav.logout')}
    >
      <div className="basis-0 content-stretch flex gap-1 grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="text">
        <div className="basis-0 flex flex-col grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-sm text-center font-semibold text-glass-text hover:text-primary active:opacity-70 transition-all duration-200">
          <p className="leading-[1.5]">{t('nav.logout')}</p>
        </div>
      </div>
    </button>
  );
}

function ExpandBtn({ expanded, onClick }: { expanded: boolean; onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="relative shrink-0 w-full" data-name="Expand Btn">
      <button 
        className="flex items-center justify-center w-full p-0.5 relative cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        onClick={onClick}
        aria-label={expanded ? t('nav.collapse') || "Collapse" : t('nav.expand') || "Expand"}
        aria-expanded={expanded}
      >
        {expanded ? (
           <IconUnifiedArrowUp size={14} className="text-glass-icon transition-all duration-200 group-hover:scale-110 group-hover:opacity-80" />
        ) : (
           <IconUnifiedArrowDown size={14} className="text-glass-icon transition-all duration-200 group-hover:scale-110 group-hover:opacity-80" />
        )}
      </button>
    </div>
  );
}

// --- Main Component ---

export default function SidebarExpanded({ onClose, onNotificationClick, onMessageClick, onViewAllClick }: { onClose?: () => void; onNotificationClick?: () => void; onMessageClick?: () => void; onViewAllClick?: () => void }) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className="relative rounded-2xl size-full bg-glass-bg backdrop-blur-glass" 
      data-name="Sidebar Expanded"
    >
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-2xl border-glass-border shadow-glass-shadow" />
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-center p-2.5 relative w-full h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Header Buttons */}
          <div className="absolute left-2.5 top-2.5 z-50">
            <CloseButton
              onClick={(e) => {
                e?.stopPropagation();
                onClose && onClose();
              }}
              ariaLabel={t('nav.closeSidebar')}
              size="sm"
            />
          </div>
          <div className="w-full h-6" />

          <ProfileExpandedSmall onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} />
          
          <Separator />
          
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full flex flex-col items-center gap-1 overflow-hidden"
          >
            <Search1 />
            <Separator />
            <Menu1 />
            <Separator />
            <Projects1 onViewAllClick={onViewAllClick} />
            <Bookmarks1 />
            <Dashboard1 />
            <Separator />
            <Logout />
            <Separator />
          </motion.div>
          
          <ExpandBtn expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
        </div>
      </div>
    </div>
  );
}