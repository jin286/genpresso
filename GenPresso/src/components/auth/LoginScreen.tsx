import React, { memo } from 'react';
import { TermsFooter } from "../ui/terms-footer";
import { getGlassmorphismStyle } from "../layout/style-utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AppHeader } from "../layout/AppHeader";
import { useLanguage } from "../../contexts/LanguageContext";

interface LoginScreenProps {
  onLogin: () => void;
}

// Optimized Google Icon Component (16x16 standard size)
const GoogleIcon = memo(() => (
  <div className="relative shrink-0 w-4 h-4">
    <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0365 8.16478C15.0365 7.6449 14.9899 7.14501 14.9032 6.66513H7.99815V9.50447H11.9439C11.7706 10.4176 11.2507 11.1907 10.4709 11.7106V13.5569H12.8504C14.2367 12.2772 15.0365 10.3976 15.0365 8.16478ZM7.99815 15.3298C9.97769 15.3298 11.6373 14.6766 12.8504 13.5569L10.4709 11.7106C9.81773 12.1505 8.98459 12.4171 7.99815 12.4171C6.09192 12.4171 4.4723 11.1308 3.89243 9.39783H1.453V11.2907C2.65938 13.6835 5.13215 15.3298 7.99815 15.3298ZM3.89243 9.39116C3.7458 8.95126 3.65915 8.4847 3.65915 7.99815C3.65915 7.5116 3.7458 7.04504 3.89243 6.60514V4.71224H1.453C0.953113 5.69868 0.666513 6.81176 0.666513 7.99815C0.666513 9.18454 0.953113 10.2976 1.453 11.2841L3.35256 9.8044L3.89243 9.39116ZM7.99815 3.58584C9.0779 3.58584 10.0377 3.95908 10.8042 4.67892L12.9037 2.5794C11.6306 1.39301 9.97769 0.666513 7.99815 0.666513C5.13215 0.666513 2.65938 2.3128 1.453 4.71224L3.89243 6.60514C4.4723 4.87221 6.09192 3.58584 7.99815 3.58584Z"
        fill="currentColor"
      />
    </svg>
  </div>
));

// Extracted AuthLinks component for cleaner render method
const AuthLinks = memo(({ t }: { t: any }) => (
  <div className="flex items-center justify-center gap-6 w-full px-2">
    {[
      { key: 'signUp', label: t('auth.signUp') },
      { key: 'forgotPassword', label: t('auth.forgotPassword') },
      { key: 'contactUs', label: t('auth.contactUs') }
    ].map((item) => (
      <Button
        key={item.key}
        variant="ghost"
        className="text-xs text-muted-foreground hover:text-[#4fa8d8] font-medium h-auto p-0 hover:bg-transparent transition-colors"
      >
        {item.label}
      </Button>
    ))}
  </div>
));

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full relative z-50">
      {/* 공통 헤더 컴포넌트 - 모바일 최적화 */}
      <AppHeader logoSize="small" showMobileStyle />

      {/* Main Login Card - 중앙 정렬 Wrapper */}
      <div className="flex items-center justify-center flex-1 w-full">
        <div
          className="relative w-full max-w-md p-6 md:p-8 flex flex-col items-center gap-6 md:gap-8 rounded-3xl mx-4 md:mx-auto z-50"
          style={getGlassmorphismStyle()}
        >
          <div className="flex flex-col items-center mt-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{t('auth.login')}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input
              type="email"
              placeholder={t('auth.email')}
              className="h-11 md:h-12 rounded-xl !bg-black/50 dark:!bg-white/10 border-black/20 dark:border-white/20 text-sm md:text-base"
              aria-label={t('auth.email')}
            />
            <Input
              type="password"
              placeholder={t('auth.password')}
              className="h-11 md:h-12 rounded-xl !bg-black/50 dark:!bg-white/10 border-black/20 dark:border-white/20 text-sm md:text-base"
              aria-label={t('auth.password')}
            />

            <Button type="submit" className="h-11 md:h-12 w-full rounded-xl text-sm md:text-base shadow-sm">
              {t('auth.login')}
            </Button>
          </form>

          <AuthLinks t={t} />
          
          <div className="w-full pt-2 flex flex-col gap-4 md:gap-6">
            {/* 
               Social Login Button 
               - Fixed border width to integer (border-2)
               - Standardized colors to Tailwind zinc-600 (#52525b)
               - Text color set to black as per design request
            */}
            <Button
              variant="ghost"
              onClick={onLogin}
              className="relative w-full h-11 md:h-12 gap-2 rounded-full border-2 shadow-sm bg-[rgba(232,232,232,0.25)] border-gray-300 hover:bg-accent dark:bg-[#E8E8E8]/25 dark:border-white/20 dark:hover:bg-zinc-600/30 text-foreground"
            >
              <GoogleIcon />
              <span className="text-sm md:text-base font-medium">{t('auth.loginWithGoogle')}</span>
            </Button>
            
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <Button 
                variant="ghost" 
                className="text-xs text-muted-foreground hover:text-[#4fa8d8] font-medium h-auto p-0 hover:bg-transparent transition-colors"
              >
                {t('auth.termsOfUse')}
              </Button>
              <Button 
                variant="ghost" 
                className="text-xs text-muted-foreground hover:text-[#4fa8d8] font-medium h-auto p-0 hover:bg-transparent transition-colors"
              >
                {t('auth.privacyPolicy')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TermsFooter />
    </div>
  );
}