import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { configStore, useConfigValue } from '../config';
import {
  DEFAULT_DISPLAY_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type DisplayLanguage,
} from './languages';
import { messages, type TranslationKey } from './messages';

type TranslationParams = Record<string, string | number | undefined | null>;

interface I18nContextValue {
  language: DisplayLanguage;
  setLanguage: (language: DisplayLanguage) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_match, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? '' : String(value);
  });
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useConfigValue('language') as DisplayLanguage;

  useEffect(() => {
    const info = SUPPORTED_LANGUAGES.find((entry) => entry.value === language);
    document.documentElement.lang = info?.htmlLang ?? DEFAULT_DISPLAY_LANGUAGE;
  }, [language]);

  const setLanguage = useCallback((next: DisplayLanguage) => {
    configStore.set('language', next);
  }, []);

  const t = useCallback((key: TranslationKey, params?: TranslationParams) => {
    const localized = messages[language]?.[key] ?? messages[DEFAULT_DISPLAY_LANGUAGE][key];
    return interpolate(localized, params);
  }, [language]);

  const value = useMemo<I18nContextValue>(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return value;
}

export { SUPPORTED_LANGUAGES };
export type { DisplayLanguage, TranslationKey };

