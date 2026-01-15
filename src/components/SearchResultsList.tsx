import React from 'react';
import type { SearchResult } from '../services/SearchService';
import SearchResultItem from './SearchResultItem';

interface SearchResultsListProps {
  results: SearchResult[];
  loading: boolean;
  hasSearched: boolean;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, loading, hasSearched }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Searching...</span>
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No results found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {results.map((result, index) => (
        <SearchResultItem key={`${result.link}-${index}`} result={result} />
      ))}
    </div>
  );
};

export default SearchResultsList;
