import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the MockGoogleSearchService to avoid real delays and control results
vi.mock('./services/MockGoogleSearchService', () => {
  return {
    MockGoogleSearchService: class {
      async search() {
        return [
          { title: 'Mock Job', link: 'http://mock.com', snippet: 'Mock snippet' }
        ];
      }
    }
  };
});

describe('App', () => {
  it('renders headline and search form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /ATS Scout/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  it('performs search and displays results', async () => {
    render(<App />);

    const roleInput = screen.getByLabelText(/Role/i);
    const locationInput = screen.getByLabelText(/Location/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(roleInput, { target: { value: 'Engineer' } });
    fireEvent.change(locationInput, { target: { value: 'Remote' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Mock Job')).toBeInTheDocument();
    });
  });
});
