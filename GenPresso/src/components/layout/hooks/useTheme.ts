/**
 * 테마 관리 Hook
 * 라이트/다크 모드 전환 로직을 관리합니다
 */

import { useState, useCallback, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // localStorage에서 테마 설정 가져오기
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      return stored || "system";
    }
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 시스템 테마 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateResolvedTheme = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light");
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    // 시스템 테마 변경 감지
    mediaQuery.addEventListener("change", updateResolvedTheme);
    return () => mediaQuery.removeEventListener("change", updateResolvedTheme);
  }, [theme]);

  // 실제 테마 적용
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    handleThemeChange(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, handleThemeChange]);

  return {
    // State
    theme,
    resolvedTheme,

    // Handlers
    setTheme: handleThemeChange,
    toggleTheme,
  };
}
