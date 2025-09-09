import React from 'react';
import Link from 'next/link';

interface PaginationUrl {
  page: number;
  url: string;
  isCurrent: boolean;
}

interface PaginationProps {
  urls: PaginationUrl[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  urls, 
  currentPage, 
  totalPages, 
  basePath,
  locale 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? `${localePrefix}${basePath}` : `${localePrefix}${basePath}/page/${currentPage - 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Previous page"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
          ← Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {urls.map((url, index) => {
          // Handle ellipsis (page -1)
          if (url.page === -1) {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            );
          }
          
          return (
            <React.Fragment key={url.page}>
              {url.isCurrent ? (
                <span 
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md"
                  aria-current="page"
                  aria-label={`Page ${url.page}, current page`}
                >
                  {url.page}
                </span>
              ) : (
                <Link
                  href={url.url}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  aria-label={`Go to page ${url.page}`}
                >
                  {url.page}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={`${localePrefix}${basePath}/page/${currentPage + 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  );
};

export default Pagination;
