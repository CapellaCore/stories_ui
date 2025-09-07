import { LanguageSelectorProps } from "../types/interfaces";
import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const { locale, locales = [], asPath } = router;

    const handleChange = async (newLocale: string) => {
        // сохранять в localStorage не обязательно, Next сам управляет локалью
        await router.push(asPath, asPath, { locale: newLocale, shallow: false });
    };

    return (
        <div className={`flex items-center gap-2 ${className || ""}`}>
            <label
                htmlFor="language"
                className="text-[#101619] text-sm font-medium leading-normal"
            >
                {t("home.language")}
            </label>

            <select
                id="language"
                value={locale}
                onChange={(e) => handleChange(e.target.value)}
                className="text-[#101619] text-sm font-medium leading-normal"
            >
                {locales.map((lc) => (
                    <option key={lc} value={lc}>
                        {lc.toUpperCase()}
                    </option>
                ))}
            </select>
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