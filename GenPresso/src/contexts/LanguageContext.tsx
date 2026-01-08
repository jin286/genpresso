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

// 번역 객체 안전하게 추출 (default export 처리)
const getTranslationObject = (imported: any): Translations => {
  // ES module default export 처리
  if (imported && typeof imported === 'object') {
    // `export default {...}` 패턴
    if ('default' in imported && typeof imported.default === 'object') {
      return imported.default;
    }
    // 이미 객체 자체인 경우
    return imported;
  }
  // fallback: 빈 객체
  console.error('❌ Failed to extract translation object:', imported);
  return {};
};

// 번역 객체 직접 할당 (안전한 추출 사용)
const translations: Record<Language, Translations> = {
  ko: getTranslationObject(koTranslations),
  en: getTranslationObject(enTranslations),
  ja: getTranslationObject(jaTranslations),
};

// 개발 환경에서만 번역 파일 유효성 검증
if (process.env.NODE_ENV === 'development') {
  const ko = translations.ko;
  
  // 핵심 번역 키 존재 여부 확인
  if (!ko?.canvas?.nodeTypes?.text) {
    console.error('❌ [Translation] canvas.nodeTypes.text is missing');
  }
  if (!ko?.canvas?.aiTools) {
    console.error('❌ [Translation] canvas.aiTools is missing');
  }
  if (!ko?.canvas?.shortcutGuide) {
    console.error('❌ [Translation] canvas.shortcutGuide is missing');
  }
  
  // 번역 객체 유효성 확인 완료
  if (ko?.canvas?.nodeTypes && ko?.canvas?.aiTools && ko?.canvas?.shortcutGuide) {
    console.log('✅ [Translation] All core translation keys are present');
  }
}

function getNestedTranslation(obj: any, path: string): string {
  if (!obj) {
    return path;
  }
  
  const keys = path.split('.');
  let result = obj;
  let currentIndex = 0;
  
  while (currentIndex < keys.length) {
    if (!result || typeof result !== 'object') {
      return path;
    }
    
    const key = keys[currentIndex];
    
    // 현재 키가 존재하면 다음으로
    if (key in result) {
      result = result[key];
      currentIndex++;
    } else {
      // 존재하지 않으면 남은 키들을 합쳐서 시도 (점이 포함된 키 이름 처리)
      let found = false;
      for (let i = keys.length; i > currentIndex; i--) {
        const combinedKey = keys.slice(currentIndex, i).join('.');
        if (combinedKey in result) {
          result = result[combinedKey];
          currentIndex = i;
          found = true;
          break;
        }
      }
      
      if (!found) {
        return path;
      }
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