import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateItem = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/items/${id}`);
                    const item = response.data;
                    setName(item.name);
                    setDescription(item.description);
                    setMobileNumber(item.mobileNumber);
                } catch (error) {
                    console.error('Error fetching item:', error);
                }
            }
        };
        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedItem = { name, description, mobileNumber };
            await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
            console.log('Item updated');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Item ID" value={id} onChange={(e) => setId(e.target.value)} required />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            <button type="submit">Update Item</button>
        </form>
    );
};

export default UpdateItem;
