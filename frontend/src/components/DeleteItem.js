import React, { useState } from 'react';
import axios from 'axios';

const DeleteItem = () => {
    const [id, setId] = useState('');

    const handleDelete = async () => {
        if (!id) {
            console.error('No item ID provided for deletion');
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            console.log('Item deleted');
            setId(''); // Clear the input field after deletion
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter item ID to delete"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleDelete}>Delete Item</button>
        </div>
    );
};

export default DeleteItem;
