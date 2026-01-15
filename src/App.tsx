import { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResultsList from './components/SearchResultsList';
import { MockGoogleSearchService } from './services/MockGoogleSearchService';
import { ResultsAggregator } from './services/ResultsAggregator';
import { QueryBuilder } from './services/QueryBuilder';
import type { SearchResult } from './services/SearchService';
import './App.css';

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (criteria: { role: string; location: string }) => {
    setLoading(true);
    setHasSearched(true);
    setError(null);
    setResults([]);

    try {
      const query = QueryBuilder.build(criteria.role, criteria.location);
      // Instantiate services here (or move outside if stateless/singleton desired)
      const service = new MockGoogleSearchService();
      const aggregator = new ResultsAggregator(service);

      const uniqueResults = await aggregator.aggregate([query]);
      setResults(uniqueResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">ATS Scout</h1>
          <p className="text-center text-blue-100 mt-2">
            Find hidden job opportunities directly from ATS domains.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <SearchForm onSearch={handleSearch} />

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <SearchResultsList
            results={results}
            loading={loading}
            hasSearched={hasSearched}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} ATS Scout. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
