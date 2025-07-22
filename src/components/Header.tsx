import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import SearchInput from './SearchInput';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e9eff1] px-10 py-3">
      <div className="flex items-center gap-4 text-[#101619]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <Link to="/" className="text-[#101619] text-lg font-bold leading-tight tracking-[-0.015em]">
          {t('header.brandName')}
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link to="/stories" className="text-[#101619] text-sm font-medium leading-normal">
            {t('header.stories')}
          </Link>
        </div>
        <div className="flex gap-2">
          <SearchInput />
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e9eff1] text-[#101619] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-[#101619]" data-icon="User" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
          🌙
        </div>
      </div>
    </header>
  );
};

export default Header; 