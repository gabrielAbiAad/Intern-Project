const Item = require('../models/itemModel');

const addItem = async (req, res) => {
    const { name, description, mobileNumber } = req.body;

    try {
        const newItem = new Item({ name, description, mobileNumber });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, mobileNumber } = req.body;

    console.log(`Update request for item with id: ${id}`); // Add debugging
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { name, description, mobileNumber }, { new: true });
        if (!updatedItem) {
            console.log(`Item with id ${id} not found`); // Add debugging
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;

    console.log(`Delete request for item with id: ${id}`); // Add debugging
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            console.log(`Item with id ${id} not found`); // Add debugging
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { addItem, updateItem, deleteItem, getItems };
