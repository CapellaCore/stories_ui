import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import plTranslations from '../locales/pl.json';
import enTranslations from '../locales/en.json';

type Translations = typeof plTranslations;

interface TranslationContextType {
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>('en');
  const [translations, setTranslations] = useState<Translations>(enTranslations);

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    // Update translations when language changes
    const newTranslations = language === 'pl' ? plTranslations : enTranslations;
    setTranslations(newTranslations);
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage, translations }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 