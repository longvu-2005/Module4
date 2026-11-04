const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore_db';

app.use(express.json());

// Gắn kết route sản phẩm
app.use('/api/v1/products', productRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Mongoose Schema Validation API is running..." });
});

// Kết nối MongoDB và khởi động server
const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully via Mongoose.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
    }
};

startServer();