/**
 * Pagination service for optimized data loading
 * Reduces bundle size by loading content in chunks
 */

export interface PaginationOptions {
  page: number;
  limit: number;
  language: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class PaginationService {
  /**
   * Calculate pagination metadata
   */
  static calculatePagination(page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Generate pagination URLs for SEO
   */
  static generatePaginationUrls(basePath: string, currentPage: number, totalPages: number, locale?: string) {
    const urls: Array<{ page: number; url: string; isCurrent: boolean }> = [];
    const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';
    
    // Add pages around current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Always include first page if not in the range
    if (startPage > 1) {
      urls.push({
        page: 1,
        url: `${localePrefix}${basePath}`,
        isCurrent: false,
      });
      
      // Add ellipsis if there's a gap
      if (startPage > 2) {
        urls.push({
          page: -1, // Use -1 to indicate ellipsis
          url: '',
          isCurrent: false,
        });
      }
    }

    // Add pages in the range
    for (let i = startPage; i <= endPage; i++) {
      if (i === 1) {
        urls.push({
          page: i,
          url: `${localePrefix}${basePath}`,
          isCurrent: i === currentPage,
        });
      } else {
        urls.push({
          page: i,
          url: `${localePrefix}${basePath}/page/${i}`,
          isCurrent: i === currentPage,
        });
      }
    }

    // Always include last page if not in the range
    if (endPage < totalPages) {
      // Add ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        urls.push({
          page: -1, // Use -1 to indicate ellipsis
          url: '',
          isCurrent: false,
        });
      }
      
      urls.push({
        page: totalPages,
        url: `${localePrefix}${basePath}/page/${totalPages}`,
        isCurrent: false,
      });
    }

    return urls;
  }

  /**
   * Parse page number from URL
   */
  static parsePageFromUrl(pageParam: string | string[] | undefined): number {
    if (!pageParam) return 1;
    const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;
    const parsed = parseInt(page, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }
}
