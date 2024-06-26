import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateResponse = await axios.post('http://localhost:5000/api/validate', { mobileNumber });
            if (!validateResponse.data.valid) {
                setMessage(`Invalid mobile number: ${validateResponse.data.message}`);
                return;
            }

            const response = await axios.post('http://localhost:5000/api/items', { name, description, mobileNumber });
            setMessage('Item added successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('Error adding item');
            console.error('Error adding item', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                <button type="submit">Add Item</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddItem;
