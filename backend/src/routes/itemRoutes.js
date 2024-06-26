const express = require('express');
const { addItem, updateItem, deleteItem, getItems } = require('../controllers/itemController');

const router = express.Router();

router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem); // Ensure this route is correct
router.get('/items', getItems);

module.exports = router;
