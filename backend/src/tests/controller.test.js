const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const itemRoutes = require('../routes/itemRoutes');

const app = express();
app.use(express.json());
app.use('/api', itemRoutes);

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/myapp_test';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await Item.deleteMany();
    console.log('Database cleared before each test');
});

afterEach(async () => {
    await Item.deleteMany();
    console.log('Database cleared after each test');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Item Controller Tests', () => {

    it('should create a new item', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({ name: 'Test Item', description: 'This is a test item', mobileNumber: '1234567890' })
            .expect(201);

        expect(response.body.name).toBe('Test Item');
        expect(response.body.description).toBe('This is a test item');
        expect(response.body.mobileNumber).toBe('1234567890');
    });

    it('should update an item', async () => {
        const item = await Item.create({ name: 'Test Item', description: 'This is a test item', mobileNumber: '1234567890' });

        console.log(`Created item with id: ${item._id}`); // Add debugging

        const response = await request(app)
            .put(`/api/items/${item._id}`)
            .send({ name: 'Updated Item', description: 'This is an updated test item', mobileNumber: '0987654321' })
            .expect(200);

        console.log(`Update response status: ${response.status}`); // Add debugging
        console.log(`Update response body: ${JSON.stringify(response.body)}`); // Add debugging

        expect(response.body.name).toBe('Updated Item');
        expect(response.body.description).toBe('This is an updated test item');
        expect(response.body.mobileNumber).toBe('0987654321');

        const updatedItem = await Item.findById(item._id);
        console.log(`Updated item: ${JSON.stringify(updatedItem)}`); // Add debugging

        expect(updatedItem.name).toBe('Updated Item');
        expect(updatedItem.description).toBe('This is an updated test item');
        expect(updatedItem.mobileNumber).toBe('0987654321');
    });

    it('should delete an item', async () => {
        const item = await Item.create({ name: 'Test Item', description: 'This is a test item', mobileNumber: '1234567890' });

        console.log(`Created item with id: ${item._id}`); // Add debugging

        const response = await request(app)
            .delete(`/api/items/${item._id}`)
            .expect(200);

        console.log(`Delete response status: ${response.status}`); // Add debugging

        const deletedItem = await Item.findById(item._id);
        console.log(`Deleted item: ${deletedItem}`); // Add debugging
        expect(deletedItem).toBeNull();
    });

    it('should get all items', async () => {
        await Item.create({ name: 'Test Item 1', description: 'This is a test item 1', mobileNumber: '1234567890' });
        await Item.create({ name: 'Test Item 2', description: 'This is a test item 2', mobileNumber: '0987654321' });

        const response = await request(app)
            .get('/api/items')
            .expect(200);

        console.log(`Items fetched: ${response.body.length}`); // Add debugging

        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('Test Item 1');
        expect(response.body[1].name).toBe('Test Item 2');
    });
});
