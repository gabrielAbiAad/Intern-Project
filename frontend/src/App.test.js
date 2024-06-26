import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Item Management title', () => {
    render(<App />);
    const titleElement = screen.getByText(/item management/i);
    expect(titleElement).toBeInTheDocument();
});
