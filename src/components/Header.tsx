import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import SearchInput from './SearchInput';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="flex flex-col md:flex-row items-center justify-between border-b border-solid border-b-[#e9eff1] px-4 md:px-10 py-3">
      {/* Logo and brand section */}
      <div className="flex items-center gap-2 md:gap-4 text-[#101619] w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="size-8 md:size-10">
            <img 
              src="/images/-a-friendly--smiling-moon-is-reading-a-book-under-.svg" 
              alt="Time to Sleep Logo" 
              className="w-full h-full"
            />
          </div>
          <Link to="/" className="text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
            {t('header.brandName')}
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
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link to="/stories" className="text-[#101619] text-sm font-medium leading-normal">
            {t('header.stories')}
          </Link>
        </div>
        <div className="flex gap-2">
          <SearchInput />
        </div>
      </div>
      
      {/* Mobile navigation (collapsible) */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <Link 
              to="/stories" 
              className="text-[#101619] text-sm font-medium leading-normal py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('header.stories')}
            </Link>
            <div className="w-full">
              <SearchInput className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 