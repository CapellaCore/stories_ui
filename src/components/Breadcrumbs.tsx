import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

export interface BreadcrumbItem {
  name: string;
  path: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { t } = useTranslation();

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center flex-nowrap overflow-hidden text-sm text-gray-600 ${className}`}
      aria-label={t('common.breadcrumbs') || 'Breadcrumb navigation'}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <svg 
              className="w-4 h-4 text-gray-400 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          
          {item.isCurrent ? (
            <span 
              className="text-gray-900 font-medium truncate min-w-0"
              aria-current="page"
              title={item.name}
            >
              {item.name}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors truncate min-w-0"
              title={item.name}
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 