export const DEFAULT_DISPLAY_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGES = [
  { value: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en' },
  { value: 'zh-CN', label: 'Chinese (Simplified)', nativeLabel: '简体中文', htmlLang: 'zh-CN' },
] as const;

export type DisplayLanguage = typeof SUPPORTED_LANGUAGES[number]['value'];

export function isDisplayLanguage(value: unknown): value is DisplayLanguage {
  return value === 'en' || value === 'zh-CN';
}

export function normalizeDisplayLanguage(value: unknown): DisplayLanguage | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en';
  if (normalized === 'zh' || normalized === 'zh-cn' || normalized === 'zh-hans' || normalized.startsWith('zh-hans-')) {
    return 'zh-CN';
  }
  return isDisplayLanguage(value) ? value : undefined;
}

