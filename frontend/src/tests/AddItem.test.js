import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AddItem from '../components/AddItem';

jest.mock('axios');

test('renders AddItem component', () => {
    render(<AddItem />);
    const nameInput = screen.getByPlaceholderText(/name/i);
    expect(nameInput).toBeInTheDocument();
});
