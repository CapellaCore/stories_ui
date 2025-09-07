import React from 'react';
import {LoadMoreButtonProps} from "../types/interfaces";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasMore,
  loading,
  totalItems,
  currentItems
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-[#577c8e] text-sm">
          Showing all {totalItems} stories
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center px-6 py-3 bg-[#4c51bf] text-white font-medium rounded-lg hover:bg-[#434190] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            Load More Stories
            <span className="ml-2 text-sm opacity-75">
              ({currentItems} of {totalItems})
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
