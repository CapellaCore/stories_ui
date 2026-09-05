export const SUPPORTED_LOCALES = ['en', 'pl', 'ru'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';
export const ISR_REVALIDATE_SECONDS = 3600;
export const STORIES_PER_PAGE = 12;

export const localeStaticPath = (
  locale: string,
  params: Record<string, string>
) => (locale === DEFAULT_LOCALE ? { params } : { params, locale });
