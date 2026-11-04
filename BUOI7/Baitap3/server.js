const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

app.use(express.json());

// Gắn kết route xác thực
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "JWT Authentication Lab API is running..." });
});

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

startServer();