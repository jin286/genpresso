import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import SidebarReduced from "./sidebar/SidebarReduced";
import SidebarExpanded from "./sidebar/SidebarExpanded";
import { SystemButton } from "../ui/system-button";
import { UserIcon, MenuIcon } from "../ui/system-icon";
import { NotificationDialog } from "../forms/NotificationDialog";
import { MessageDialog } from "../forms/MessageDialog";

interface ExpandableSidebarProps {
  expansionLevel: 0 | 1 | 2;
  onNavigate: (targetLevel: 0 | 1 | 2) => void;
  width: number;
  onSettingsClick?: () => void;
  onProjectsClick?: () => void;
  onFavoritesClick?: () => void;
  onDashboardClick?: () => void;
  onViewAllClick?: () => void;
  onLogout?: () => void;
}

// 간소화된 토글 버튼 (SystemButton 활용)
const ToggleButton = React.memo<{ isOpen: boolean; onToggle: () => void }>(({ isOpen, onToggle }) => {
  return (
    <motion.div
      className="mb-1 mr-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <SystemButton
        variant="glass"
        size="icon"
        onClick={onToggle}
        className="rounded-3xl text-foreground hover:text-primary transition-colors shadow-glass-shadow"
      >
        {isOpen ? <UserIcon className="text-current" /> : <MenuIcon className="text-current" />}
      </SystemButton>
    </motion.div>
  );
});

ToggleButton.displayName = 'ToggleButton';

// 간소화된 사이드바 패널
const SidebarPanel = React.memo<{
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onClose: () => void;
  width: number;
  onSettingsClick?: () => void;
  onProjectsClick?: () => void;
  onFavoritesClick?: () => void;
  onDashboardClick?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onViewAllClick?: () => void;
  onLogout?: () => void;
}>(({ 
  isExpanded, 
  onToggleExpansion,
  onClose,
  width,
  onSettingsClick,
  onProjectsClick,
  onFavoritesClick,
  onDashboardClick,
  onNotificationClick,
  onMessageClick,
  onViewAllClick,
  onLogout
}) => {
  return (
    <motion.div 
      className="relative pb-3 pr-1 overflow-visible"
      style={{ width: `${width + 8}px` }}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.3 }}
    >
      {/* 축소형 (기본) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: `${width}px` }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const expandBtn = target.closest('[data-name="Expand Btn"]');
              const settingsBtn = target.closest('[data-settings-button="true"]');
              if (expandBtn) {
                e.stopPropagation();
                onToggleExpansion();
              } else if (settingsBtn && onSettingsClick) {
                e.stopPropagation();
                onSettingsClick();
              }
            }}
          >
            <SidebarReduced onClose={onClose} onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 확장형 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 left-0 z-10"
            style={{ width: `${width}px` }}
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1, overflow: "visible" }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const expandBtn = target.closest('[data-name="Expand Btn"]');
              const settingsBtn = target.closest('[data-settings-button="true"]');
              const projectsBtn = target.closest('[data-name="Projects"]');
              const favoritesBtn = target.closest('[data-name="Favorites"]');
              const dashboardBtn = target.closest('[data-name="Dashboard"]');
              if (expandBtn) {
                e.stopPropagation();
                onToggleExpansion();
              } else if (settingsBtn && onSettingsClick) {
                e.stopPropagation();
                onSettingsClick();
              } else if (projectsBtn && onProjectsClick) {
                e.stopPropagation();
                onProjectsClick();
              } else if (favoritesBtn && onFavoritesClick) {
                e.stopPropagation();
                onFavoritesClick();
              } else if (dashboardBtn && onDashboardClick) {
                e.stopPropagation();
                onDashboardClick();
              }
            }}
          >
            <SidebarExpanded onClose={onClose} onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} onViewAllClick={onViewAllClick} onLogout={onLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

SidebarPanel.displayName = 'SidebarPanel';

const ExpandableSidebarComponent = ({ expansionLevel, onNavigate, width, onSettingsClick, onProjectsClick, onFavoritesClick, onDashboardClick, onViewAllClick, onLogout }: ExpandableSidebarProps) => {
  const isOpen = expansionLevel > 0;
  const isExpanded = expansionLevel === 2;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleToggleOpen = useCallback(() => {
    onNavigate(isOpen ? 0 : 1);
  }, [isOpen, onNavigate]);

  const handleToggleExpansion = useCallback(() => {
    onNavigate(isExpanded ? 1 : 2);
  }, [isExpanded, onNavigate]);

  const handleNotificationClick = useCallback(() => {
    setIsNotificationOpen(true);
  }, []);

  const handleMessageClick = useCallback(() => {
    setIsMessageOpen(true);
  }, []);

  return (
    <div className="fixed top-16 z-50 left-4 md:left-6 max-h-[calc(100vh-4rem)] overflow-visible">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="toggle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <ToggleButton isOpen={false} onToggle={handleToggleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="sidebar"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <SidebarPanel
              isExpanded={isExpanded}
              onToggleExpansion={handleToggleExpansion}
              onClose={() => onNavigate(0)}
              width={width}
              onSettingsClick={onSettingsClick}
              onProjectsClick={onProjectsClick}
              onFavoritesClick={onFavoritesClick}
              onDashboardClick={onDashboardClick}
              onNotificationClick={handleNotificationClick}
              onMessageClick={handleMessageClick}
              onViewAllClick={onViewAllClick}
              onLogout={onLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
};

ExpandableSidebarComponent.displayName = 'ExpandableSidebar';

export const ExpandableSidebar = React.memo(ExpandableSidebarComponent);