// components/LanguageSelector.tsx
import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useLocales } from "../hooks/useLocales";
import { useNavigate, useLocation } from "react-router-dom";

interface LanguageSelectorProps {
    className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
    const { locales, loading: langLoading, error: langError } = useLocales();
    const { t, language, setLanguage } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (newLang: string) => {
        setLanguage(newLang);
        const parts = location.pathname.split("/").filter(Boolean);
        // If first segment is a supported lang, remove it
        if (locales.some((l) => l.code === parts[0])) {
            parts.shift();
        }
        // Add prefix if not English
        if (newLang !== "en") {
            parts.unshift(newLang);
        }
        navigate("/" + parts.join("/") + location.search, { replace: true });
    };

    return (
        <div className={`flex items-center gap-2 ${className || ""}`}>
            <label
                htmlFor="language"
                className="text-[#101619] text-sm font-medium leading-normal"
            >
                {t("home.language")}
            </label>

            {langLoading ? (
                <span className="text-gray-500 text-sm">{t("home.loading")}</span>
            ) : langError ? (
                <span className="text-red-500 text-sm">{t("home.error")}</span>
            ) : (
                <select
                    id="language"
                    value={language}
                    onChange={(e) => handleChange(e.target.value)}
                    className="text-[#101619] text-sm font-medium leading-normal"
                >
                    {locales.map((locale) => (
                        <option key={locale.code} value={locale.code}>
                            {locale.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default LanguageSelector;