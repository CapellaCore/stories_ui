import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import {useParams} from "react-router-dom";

type Translations = typeof enTranslations;

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
  const { lang } = useParams<{ lang?: string }>();
  const [language, setLanguageState] = useState<string>('en');
  const [translations, setTranslations] = useState<Translations>(enTranslations);

  // Sync language with URL parameter
  useEffect(() => {
    const newLanguage = lang || 'en'; // Default to 'en' if lang is undefined
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage); // Update localStorage
  }, [lang]);

  // Load translation file whenever language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const messages = await import(`../locales/${language}.json`);
        setTranslations(messages.default);
      } catch (err) {
        console.error(`No translations found for: ${language}, falling back to English.`);
        setTranslations(enTranslations);
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
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