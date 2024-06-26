import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdateItem from '../components/UpdateItem';

jest.mock('axios');

test('renders UpdateItem component', () => {
    render(<UpdateItem />);
    const nameInput = screen.getByPlaceholderText(/name/i);
    expect(nameInput).toBeInTheDocument();
});
