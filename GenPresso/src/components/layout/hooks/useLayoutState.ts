/**
 * 레이아웃 상태 관리 Hook
 * 사이드바, 패널, 다이얼로그 등의 상태를 관리합니다
 */

import { useState, useCallback } from "react";
import type { ScenarioId } from "../../../types";

export function useLayoutState() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isCreditDialogOpen, setIsCreditDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'canvas'>('home');
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState("projects");

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleSettingsToggle = useCallback(() => {
    setIsSettingsOpen(prev => !prev);
  }, []);

  const handleProjectMenuToggle = useCallback(() => {
    setIsProjectMenuOpen(prev => !prev);
  }, []);

  const handleCreditDialogToggle = useCallback(() => {
    setIsCreditDialogOpen(prev => !prev);
  }, []);

  const handleNotificationToggle = useCallback(() => {
    setIsNotificationOpen(prev => !prev);
  }, []);

  const handleScenarioClick = useCallback((scenarioId: string) => {
    setCurrentScenarioId(scenarioId);
    setCurrentView('canvas');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentView('home');
    setCurrentScenarioId(null);
  }, []);

  const handleMobileTabChange = useCallback((tab: string) => {
    setActiveMobileTab(tab);
  }, []);

  return {
    // State
    isSidebarOpen,
    isSettingsOpen,
    isProjectMenuOpen,
    isCreditDialogOpen,
    isNotificationOpen,
    currentView,
    currentScenarioId,
    activeMobileTab,

    // Setters
    setIsSidebarOpen,
    setIsSettingsOpen,
    setIsProjectMenuOpen,
    setIsCreditDialogOpen,
    setIsNotificationOpen,
    setCurrentView,

    // Handlers
    handleSidebarToggle,
    handleSettingsToggle,
    handleProjectMenuToggle,
    handleCreditDialogToggle,
    handleNotificationToggle,
    handleScenarioClick,
    handleBackToHome,
    handleMobileTabChange,
  };
}
