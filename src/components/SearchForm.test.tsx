import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('renders inputs and submit button', () => {
    render(<SearchForm onSearch={() => {}} />);

    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with input values when submitted', async () => {
    const handleSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearch={handleSearch} />);

    const roleInput = screen.getByLabelText(/role/i);
    const locationInput = screen.getByLabelText(/location/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(roleInput, 'Software Engineer');
    await user.type(locationInput, 'Remote');
    await user.click(submitButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith({
      role: 'Software Engineer',
      location: 'Remote',
    });
  });
});
