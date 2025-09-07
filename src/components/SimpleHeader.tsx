import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "next-i18next";

const SimpleHeader: React.FC<{ categories?: { slug: string; name: string }[] }> = ({ categories = [] }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { t } = useTranslation('common');

    const navLinks = [
        { href: '/', label: t('common.home') },
        { href: '/stories', label: t('header.stories') },
        ...(categories.length > 0
            ? categories.map(cat => ({ href: `/stories/${cat.slug}`, label: cat.name }))
            : [])
    ];

    return (
        <header className="flex flex-col md:flex-row items-center justify-between border-b border-solid border-b-[#e9eff1] px-4 md:px-10 py-3">
            {/* Logo and brand section */}
            <div className="flex items-center gap-2 md:gap-4 text-[#101619] w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/" className="flex items-center gap-2 md:gap-4">
                        <div className="size-8 md:size-10">
                            <img
                                src="/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg"
                                alt="Time to Sleep Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
              Time to Sleep
            </span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium leading-normal ${
                                router.asPath === link.href ? 'text-blue-600' : 'text-[#101619]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-2">
                    <LanguageSelector />
                </div>
                <div className="flex gap-2">
                    {/* Search button */}
                    <Link href="/search">
                        <button className="flex h-10 items-center justify-center rounded-lg bg-[#e9eff1] px-2.5 text-sm font-bold text-[#101619] hover:bg-[#d1d7d9] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
                            </svg>
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Mobile navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden w-full mt-3 pt-3 border-t border-gray-200">
                    <div className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[#101619] text-sm font-medium leading-normal py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-6 px-4 py-2 rounded-lg shadow-sm">
                            <LanguageSelector />
                        </div>
                        <Link href="/search">
                            <button className="flex w-full h-10 items-center justify-center rounded-lg bg-[#e9eff1] px-2.5 text-sm font-bold text-[#101619] hover:bg-[#d1d7d9] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SimpleHeader;