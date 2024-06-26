const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const validateRoutes = require('./routes/validateRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.use('/api', validateRoutes); // Validation routes
app.use('/api', itemRoutes); // Item routes

mongoose.set('useFindAndModify', false); // Fix deprecation warning
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
