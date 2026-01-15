import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchResultItem from './SearchResultItem';
import { SearchResult } from '../services/SearchService';

describe('SearchResultItem', () => {
  const mockResult: SearchResult = {
    title: 'Senior Engineer',
    link: 'https://example.com/job',
    snippet: 'Great job opportunity...',
  };

  it('renders result details', () => {
    render(<SearchResultItem result={mockResult} />);

    const linkElement = screen.getByRole('link', { name: /Senior Engineer/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com/job');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByText('https://example.com/job')).toBeInTheDocument();
    expect(screen.getByText('Great job opportunity...')).toBeInTheDocument();
  });
});
