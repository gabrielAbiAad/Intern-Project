import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = ({ onSelectItem }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                console.log('Fetched items:', response.data); // Add logging here
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error); // Add error handling here
            }
        };
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Item List</h2> {/* Add title for clarity */}
            {items.length > 0 ? (
                items.map(item => (
                    <div key={item._id}>
                        <p>ID: {item._id}</p> {/* Display primary key ID */}
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>{item.mobileNumber}</p>
                        <p>{"--------------------------------------------------"}</p>
                    </div>
                ))
            ) : (
                <p>No items found.</p> // Add message for empty state
            )}
        </div>
    );
};

export default ItemList;
