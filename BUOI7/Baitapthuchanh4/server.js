const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

app.use(express.json());

// Gắn kết route
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: "User Schema Lab API is running..." });
});

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

startServer();