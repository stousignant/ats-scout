import React from 'react';
import type { SearchResult } from '../services/SearchService';

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="mb-1">
        <a
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-blue-600 hover:underline font-medium"
        >
          {result.title}
        </a>
      </div>
      <div className="text-sm text-green-700 mb-2 break-all">
        {result.link}
      </div>
      <p className="text-gray-600 text-sm">
        {result.snippet}
      </p>
    </div>
  );
};

export default SearchResultItem;
