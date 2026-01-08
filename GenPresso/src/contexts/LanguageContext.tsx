import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import koTranslations from '../locales/ko';
import enTranslations from '../locales/en';
import jaTranslations from '../locales/ja';

type Language = 'ko' | 'en' | 'ja';

interface Translations {
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 번역 객체 직접 할당 (타입 캐스팅 최소화)
const translations: Record<Language, Translations> = {
  ko: koTranslations,
  en: enTranslations,
  ja: jaTranslations,
};

// 개발 환경에서만 번역 파일 유효성 검증
if (process.env.NODE_ENV === 'development') {
  const ko = translations.ko;
  if (!ko?.credit?.managementDescription) {
    console.error('❌ Translation validation failed: credit.managementDescription is missing');
  }
}

function getNestedTranslation(obj: any, path: string): string {
  if (!obj) {
    return path;
  }
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path;
    }
  }
  
  if (typeof result !== 'string') {
    return path;
  }
  
  return result;
}

function replacePlaceholders(text: string, params?: Record<string, any>): string {
  if (!params) return text;
  
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  
  return result;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ko';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, params?: Record<string, any>): string => {
    const translationObj = translations[language];
    
    if (!translationObj && process.env.NODE_ENV === 'development') {
      console.error(`❌ No translation object for language: ${language}`);
      return key;
    }
    
    const translation = getNestedTranslation(translationObj, key);
    
    if (translation === key && process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Translation missing: "${key}" (${language})`);
    }
    
    return replacePlaceholders(translation, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

