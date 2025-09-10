/**
 * Utility functions for generating hreflang links for SEO
 */

export interface HreflangLink {
  href: string;
  hrefLang: string;
}

const BASE_URL = 'https://timetosleep.org';
const SUPPORTED_LOCALES = ['en', 'pl', 'ru'];

const getLocalizedPath = (locale: string, path: string): string => {
  if (locale === 'en') {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${locale}${path}`;
};

/**
 * Generate hreflang links for a story page
 * @param storySlug - The story slug
 * @param tagSlug - The tag slug
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Array of hreflang links
 */
export function generateStoryHreflangLinks(
  storySlug: string,
  tagSlug: string,
  currentLocale: string
): HreflangLink[] {
  const baseUrl = 'https://timetosleep.org';
  const locales = ['en', 'pl', 'ru'];
  
  return locales.map(locale => {
    let href: string;
    
    if (locale === 'en') {
      // English gets no locale in URL
      href = `${baseUrl}/stories/${tagSlug}/${storySlug}`;
    } else {
      // Other languages get locale prefix
      href = `${baseUrl}/${locale}/stories/${tagSlug}/${storySlug}`;
    }
    
    return {
      href,
      hrefLang: locale
    };
  });
}

/**
 * Generate hreflang links for a tag page
 * @param tagSlug - The tag slug
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Array of hreflang links
 */
export function generateTagHreflangLinks(
  tagSlug: string,
  currentLocale: string
): HreflangLink[] {
  const baseUrl = 'https://timetosleep.org';
  const locales = ['en', 'pl', 'ru'];
  
  return locales.map(locale => {
    let href: string;
    
    if (locale === 'en') {
      // English gets no locale in URL
      href = `${baseUrl}/stories/${tagSlug}`;
    } else {
      // Other languages get locale prefix
      href = `${baseUrl}/${locale}/stories/${tagSlug}`;
    }
    
    return {
      href,
      hrefLang: locale
    };
  });
}

/**
 * Generate hreflang links for the home page
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Array of hreflang links
 */
export function generateHomeHreflangLinks(currentLocale: string): HreflangLink[] {
  const baseUrl = 'https://timetosleep.org';
  const locales = ['en', 'pl', 'ru'];
  
  return locales.map(locale => {
    let href: string;
    
    if (locale === 'en') {
      // English gets no locale in URL
      href = baseUrl;
    } else {
      // Other languages get locale prefix
      href = `${baseUrl}/${locale}`;
    }
    
    return {
      href,
      hrefLang: locale
    };
  });
}

/**
 * Generate hreflang links for the stories index page
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Array of hreflang links
 */
export function generateStoriesIndexHreflangLinks(currentLocale: string): HreflangLink[] {
  const baseUrl = 'https://timetosleep.org';
  const locales = ['en', 'pl', 'ru'];
  
  return locales.map(locale => {
    let href: string;
    
    if (locale === 'en') {
      // English gets no locale in URL
      href = `${baseUrl}/stories`;
    } else {
      // Other languages get locale prefix
      href = `${baseUrl}/${locale}/stories`;
    }
    
    return {
      href,
      hrefLang: locale
    };
  });
}

/**
 * Generate canonical URL for a story page
 * @param storySlug - The story slug
 * @param tagSlug - The tag slug
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Canonical URL
 */
export function generateStoryCanonicalUrl(
  storySlug: string,
  tagSlug: string,
  currentLocale: string
): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/stories/${tagSlug}/${storySlug}`;
  } else {
    return `${baseUrl}/${currentLocale}/stories/${tagSlug}/${storySlug}`;
  }
}

/**
 * Generate canonical URL for a tag page
 * @param tagSlug - The tag slug
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Canonical URL
 */
export function generateTagCanonicalUrl(
  tagSlug: string,
  currentLocale: string
): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/stories/${tagSlug}`;
  } else {
    return `${baseUrl}/${currentLocale}/stories/${tagSlug}`;
  }
}

/**
 * Generate canonical URL for the home page
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Canonical URL
 */
export function generateHomeCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return baseUrl;
  } else {
    return `${baseUrl}/${currentLocale}`;
  }
}

/**
 * Generate canonical URL for the stories index page
 * @param currentLocale - Current locale (en, pl, etc.)
 * @returns Canonical URL
 */
export function generateStoriesIndexCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/stories`;
  } else {
    return `${baseUrl}/${currentLocale}/stories`;
  }
}

export function generatePrivacyPolicyHreflangLinks(currentLocale: string): HreflangLink[] {
  const links: HreflangLink[] = [];
  const basePath = '/privacy-policy';

  SUPPORTED_LOCALES.forEach(locale => {
    links.push({
      hrefLang: locale,
      href: getLocalizedPath(locale, basePath),
    });
  });

  links.push({
    hrefLang: 'x-default',
    href: getLocalizedPath('en', basePath),
  });

  return links;
}

export function generatePrivacyPolicyCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/privacy-policy`;
  } else {
    return `${baseUrl}/${currentLocale}/privacy-policy`;
  }
}

export function generateTermsOfUseHreflangLinks(currentLocale: string): HreflangLink[] {
  const links: HreflangLink[] = [];
  const basePath = '/terms-of-use';

  SUPPORTED_LOCALES.forEach(locale => {
    links.push({
      hrefLang: locale,
      href: getLocalizedPath(locale, basePath),
    });
  });

  links.push({
    hrefLang: 'x-default',
    href: getLocalizedPath('en', basePath),
  });

  return links;
}

export function generateTermsOfUseCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/terms-of-use`;
  } else {
    return `${baseUrl}/${currentLocale}/terms-of-use`;
  }
}

export function generateContactHreflangLinks(currentLocale: string): HreflangLink[] {
  const links: HreflangLink[] = [];
  const basePath = '/contact';

  SUPPORTED_LOCALES.forEach(locale => {
    links.push({
      hrefLang: locale,
      href: getLocalizedPath(locale, basePath),
    });
  });

  links.push({
    hrefLang: 'x-default',
    href: getLocalizedPath('en', basePath),
  });

  return links;
}

export function generateContactCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/contact`;
  } else {
    return `${baseUrl}/${currentLocale}/contact`;
  }
}

export function generateSearchHreflangLinks(currentLocale: string): HreflangLink[] {
  const links: HreflangLink[] = [];
  const basePath = '/search';

  SUPPORTED_LOCALES.forEach(locale => {
    links.push({
      hrefLang: locale,
      href: getLocalizedPath(locale, basePath),
    });
  });

  links.push({
    hrefLang: 'x-default',
    href: getLocalizedPath('en', basePath),
  });

  return links;
}

export function generateSearchCanonicalUrl(currentLocale: string): string {
  const baseUrl = 'https://timetosleep.org';
  
  if (currentLocale === 'en') {
    return `${baseUrl}/search`;
  } else {
    return `${baseUrl}/${currentLocale}/search`;
  }
}
