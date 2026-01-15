import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchResultsList from './SearchResultsList';
import { SearchResult } from '../services/SearchService';

describe('SearchResultsList', () => {
  const mockResults: SearchResult[] = [
    { title: 'Job 1', link: 'http://link1.com', snippet: 'Desc 1' },
    { title: 'Job 2', link: 'http://link2.com', snippet: 'Desc 2' },
  ];

  it('renders loading state', () => {
    render(<SearchResultsList results={[]} loading={true} hasSearched={true} />);
    expect(screen.getByText(/Searching.../i)).toBeInTheDocument();
  });

  it('renders empty state when searched and no results', () => {
    render(<SearchResultsList results={[]} loading={false} hasSearched={true} />);
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('renders nothing when not searched yet', () => {
    const { container } = render(<SearchResultsList results={[]} loading={false} hasSearched={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders list of results', () => {
    render(<SearchResultsList results={mockResults} loading={false} hasSearched={true} />);
    expect(screen.getByText('Job 1')).toBeInTheDocument();
    expect(screen.getByText('Job 2')).toBeInTheDocument();
  });
});
