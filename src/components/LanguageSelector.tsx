import { LanguageSelectorProps } from "../types/interfaces";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const { locale, locales = [], asPath } = router;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = async (newLocale: string) => {
        setIsOpen(false);
        await router.push(asPath, asPath, { locale: newLocale, shallow: false });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getLanguageName = (locale: string) => {
        const languageNames: { [key: string]: string } = {
            'en': 'EN',
            'pl': 'PL',
            'es': 'ES',
            'fr': 'FR',
            'de': 'DE',
            'it': 'IT',
            'pt': 'PT',
            'ru': 'RU',
            'ja': 'JA',
            'ko': 'KO',
            'zh': 'ZH',
            'ar': 'AR'
        };
        return languageNames[locale] || locale.toUpperCase();
    };

    const getLanguageFlag = (locale: string) => {
        const flags: { [key: string]: string } = {
            'en': '🇺🇸',
            'pl': '🇵🇱',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'it': '🇮🇹',
            'pt': '🇵🇹',
            'ru': '🇷🇺',
            'ja': '🇯🇵',
            'ko': '🇰🇷',
            'zh': '🇨🇳',
            'ar': '🇸🇦'
        };
        return flags[locale] || '🌐';
    };

    return (
        <div className={`relative ${className || ""}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#e9eff1] px-3 text-sm font-bold text-[#101619] hover:bg-[#d1d7d9] transition-colors min-w-[80px]"
                aria-label="Select language"
            >
                <span className="text-base">{getLanguageFlag(locale || 'en')}</span>
                <span>{getLanguageName(locale || 'en')}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e9eff1] rounded-lg shadow-lg z-50 overflow-hidden">
                    {locales.map((lc) => (
                        <button
                            key={lc}
                            onClick={() => handleChange(lc)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-left hover:bg-[#f8f9fa] transition-colors ${
                                locale === lc ? 'bg-[#e9eff1] text-[#101619]' : 'text-[#101619]'
                            }`}
                        >
                            <span className="text-base">{getLanguageFlag(lc)}</span>
                            <span>{getLanguageName(lc)}</span>
                            {locale === lc && (
                                <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
//     const { locales, loading: langLoading, error: langError } = useLocales();
//     const { t, language, setLanguage } = useTranslation();
//     const router = useRouter();
//     console.log("locales", locales, "loading", langLoading, "error", langError);
//     const handleChange = (newLang: string) => {
//         setLanguage(newLang);
//
//         // Break current path into parts
//         const parts = router.asPath.split("?")[0].split("/").filter(Boolean);
//
//         // If first segment is a supported locale, remove it
//         if (locales.some((l) => l.code === parts[0])) {
//             parts.shift();
//         }
//
//         // Add prefix if not English
//         if (newLang !== "en") {
//             parts.unshift(newLang);
//         }
//
//         // Build new path
//         const newPath = "/" + parts.join("/");
//
//         // Preserve query string
//         const search = router.asPath.includes("?")
//             ? "?" + router.asPath.split("?")[1]
//             : "";
//
//         router.push(newPath + search, undefined, { shallow: true });
//     };
//
//     return (
//         <div className={`flex items-center gap-2 ${className || ""}`}>
//             <label
//                 htmlFor="language"
//                 className="text-[#101619] text-sm font-medium leading-normal"
//             >
//                 {t("home.language")}
//             </label>
//
//             {langLoading ? (
//                 <span className="text-gray-500 text-sm">{t("home.loading")}</span>
//             ) : langError ? (
//                 <span className="text-red-500 text-sm">{t("home.error")}</span>
//             ) : (
//                 <select
//                     id="language"
//                     value={language}
//                     onChange={(e) => handleChange(e.target.value)}
//                     className="text-[#101619] text-sm font-medium leading-normal"
//                 >
//                     {locales.map((locale) => (
//                         <option key={locale.code} value={locale.code}>
//                             {locale.name}
//                         </option>
//                     ))}
//                 </select>
//             )}
//         </div>
//     );
// };

export default LanguageSelector;