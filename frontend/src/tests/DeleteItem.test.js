import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ItemList from '../components/ItemList';

jest.mock('axios');

test('renders ItemList component', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ItemList />);
    const itemList = await screen.findByText(/no items found/i);
    expect(itemList).toBeInTheDocument();
});
