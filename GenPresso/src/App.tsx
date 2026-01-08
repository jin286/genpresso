import React, { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import GenPressoLayout from "./components/layout/GenPressoLayout";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  useEffect(() => {
    // 초기 테마 설정
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // 다크모드 조건:
      // 1. 저장된 테마가 'dark'
      // 2. 저장된 테마가 'system'이고 시스템이 다크모드
      // 3. 저장된 테마가 없고 시스템이 다크모드 (기본값)
      const shouldBeDark = savedTheme === 'dark' || 
                           (savedTheme === 'system' && systemPrefersDark) || 
                           (!savedTheme && systemPrefersDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    initializeTheme();

    // 시스템 테마 변경 감지 (사용자가 'system' 모드일 때만)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'system' || !savedTheme) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-[100svh]">
        <GenPressoLayout />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}