import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner@2.0.3";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // 초기 테마 설정
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast.success("다크 모드로 전환되었습니다.");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast.success("라이트 모드로 전환되었습니다.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0 transition-colors duration-200"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600" />
      )}
    </Button>
  );
}