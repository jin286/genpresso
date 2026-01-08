import React from "react";
import { toast } from "sonner@2.0.3";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { useLanguage } from "../../../contexts/LanguageContext";

export function GeneralTab() {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  // 캔버스 작업환경 설정
  const [leftToolbarMode, setLeftToolbarMode] = React.useState<'compact' | 'expanded'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('leftToolbarMode');
      if (saved) return saved as 'compact' | 'expanded';
      // 기본값: 1280px 이하는 축소형, 초과는 확장형
      return window.innerWidth <= 1280 ? 'compact' : 'expanded';
    }
    return 'compact';
  });

  const [topToolbarMode, setTopToolbarMode] = React.useState<'compact' | 'expanded'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('topToolbarMode');
      if (saved) return saved as 'compact' | 'expanded';
      // 기본값: 1280px 이하는 축소형, 초과는 확장형
      return window.innerWidth <= 1280 ? 'compact' : 'expanded';
    }
    return 'compact';
  });

  // 화면 크기 변경 감지하여 기본값 자동 조정
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // 저장된 값이 없을 때만 자동 조정
      if (!localStorage.getItem('leftToolbarMode')) {
        setLeftToolbarMode(width <= 1280 ? 'compact' : 'expanded');
      }
      if (!localStorage.getItem('topToolbarMode')) {
        setTopToolbarMode(width <= 1280 ? 'compact' : 'expanded');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    localStorage.setItem('theme', value);
    
    if (value === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
  };

  const handleLeftToolbarModeChange = (value: 'compact' | 'expanded') => {
    setLeftToolbarMode(value);
    localStorage.setItem('leftToolbarMode', value);
    
    // 같은 탭의 다른 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'leftToolbarMode', value }
    }));
    
    const modeText = value === 'compact' ? t('settings.compactView') : t('settings.expandedView');
    toast.success(`${t('canvas.leftToolbar')} ${modeText}`);
  };

  const handleTopToolbarModeChange = (value: 'compact' | 'expanded') => {
    setTopToolbarMode(value);
    localStorage.setItem('topToolbarMode', value);
    
    // 같은 탭의 다른 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'topToolbarMode', value }
    }));
    
    const modeText = value === 'compact' ? t('settings.compactView') : t('settings.expandedView');
    toast.success(`${t('canvas.topToolbar')} ${modeText}`);
  };

  const notifications = [
    { id: "email", label: t('settings.enableAllNotifications'), defaultChecked: true },
    { id: "project", label: t('settings.projectUpdates'), defaultChecked: true },
    { id: "marketing", label: t('settings.marketingEmails'), defaultChecked: true },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-12 py-4 space-y-6">
        <div>
          <div className="mb-6">
            <h3 className="font-semibold mb-1">{t('settings.themeSettings')}</h3>
            <p className="text-xs text-muted-foreground">{t('settings.themeSettingsDescription')}</p>
          </div>
          <div className="space-y-4 px-3">
            <div className="space-y-2">
              <Label htmlFor="theme">{t('settings.theme')}</Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">{t('settings.systemMode')}</SelectItem>
                  <SelectItem value="light">{t('settings.lightMode')}</SelectItem>
                  <SelectItem value="dark">{t('settings.darkMode')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-6">
            <h3 className="font-semibold mb-1">{t('canvas.workspace')}</h3>
            <p className="text-xs text-muted-foreground">{t('settings.viewOptionsDescription')}</p>
          </div>
          <div className="space-y-4 px-3">
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="leftToolbar">{t('canvas.leftToolbar')}</Label>
                <Select value={leftToolbarMode} onValueChange={handleLeftToolbarModeChange}>
                  <SelectTrigger id="leftToolbar" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">{t('settings.compactView')}</SelectItem>
                    <SelectItem value="expanded">{t('settings.expandedView')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="topToolbar">{t('canvas.topToolbar')}</Label>
                <Select value={topToolbarMode} onValueChange={handleTopToolbarModeChange}>
                  <SelectTrigger id="topToolbar" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">{t('settings.compactView')}</SelectItem>
                    <SelectItem value="expanded">{t('settings.expandedView')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-6">
            <h3 className="font-semibold mb-1">{t('settings.languageAndRegion')}</h3>
            <p className="text-xs text-muted-foreground">{t('settings.languageAndRegionDescription')}</p>
          </div>
          <div className="space-y-4 px-3">
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="language">{t('settings.language')}</Label>
                <Select value={language} onValueChange={(value: 'ko' | 'en' | 'ja') => setLanguage(value)}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="timezone">{t('settings.timezone')}</Label>
                <Select defaultValue="seoul">
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder={t('settings.timezone')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">Asia/Seoul (GMT+9)</SelectItem>
                    <SelectItem value="newyork">America/New_York (GMT-5)</SelectItem>
                    <SelectItem value="london">Europe/London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-6">
            <h3 className="font-semibold mb-1">{t('settings.notificationSettings')}</h3>
            <p className="text-xs text-muted-foreground">{t('settings.notificationSettingsDescription')}</p>
          </div>
          <div className="space-y-3">
            {notifications.map((item) => (
              <label 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  boxShadow: 'var(--input-shadow)',
                }}
              >
                <span className="text-sm">{item.label}</span>
                <Checkbox defaultChecked={item.defaultChecked} />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Footer Area */}
      <div 
        className="shrink-0 z-10 flex items-center justify-end gap-2 py-4 px-6 border-t rounded-b-2xl relative" 
        style={{ 
          borderColor: 'var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="absolute inset-0 bg-background/50 -z-10 rounded-b-2xl" />
        <Button variant="outline" className="bg-background hover:bg-muted">{t('common.cancel')}</Button>
        <Button>{t('common.save')}</Button>
      </div>
    </div>
  );
}