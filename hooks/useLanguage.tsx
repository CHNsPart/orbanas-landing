'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type definitions
export type Language = 'en' | 'ar';
export type SupportedLanguages = {
  en: 'English';
  ar: 'العربية';
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: any;
  isLoading: boolean;
  supportedLanguages: SupportedLanguages;
  toggleLanguage: () => void;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'en' 
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supportedLanguages: SupportedLanguages = {
    en: 'English',
    ar: 'العربية'
  };

  // Load content based on language
  const loadContent = async (lang: Language) => {
    setIsLoading(true);
    try {
      let contentData;
      if (lang === 'ar') {
        contentData = await import('@/constants/copywritings/ar_content.json');
      } else {
        contentData = await import('@/constants/copywritings/en_content.json');
      }
      setContent(contentData.default || contentData);
    } catch (error) {
      console.error(`Failed to load ${lang} content:`, error);
      // Fallback to English if Arabic fails
      if (lang === 'ar') {
        const fallbackContent = await import('@/constants/copywritings/en_content.json');
        setContent(fallbackContent.default || fallbackContent);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Set language with persistence
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('orbanas-language', lang);
    loadContent(lang);
  };

  // Toggle between languages
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  // Initialize language from localStorage or browser
  useEffect(() => {
    const initializeLanguage = () => {
      // Check localStorage first
      const savedLanguage = localStorage.getItem('orbanas-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        setLanguageState(savedLanguage);
        loadContent(savedLanguage);
        return;
      }

      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      const detectedLang = browserLang.startsWith('ar') ? 'ar' : 'en';
      
      setLanguageState(detectedLang);
      loadContent(detectedLang);
    };

    initializeLanguage();
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    content,
    isLoading,
    supportedLanguages,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

// Utility hook for getting specific content sections
export function useContent<T = any>(section: string): T | null {
  const { content, isLoading } = useLanguage();
  
  if (isLoading || !content) {
    return null;
  }
  
  return content[section] || null;
}

// Utility hook for checking if current language is RTL
export function useIsRTL(): boolean {
  const { language } = useLanguage();
  return language === 'ar';
}