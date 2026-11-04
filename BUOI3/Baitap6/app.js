const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Gắn middleware parse JSON cho request body
app.use(express.json());

// Gắn router vào đường dẫn cơ sở /api/products
app.use('/api/products', productRoutes);

// Route mặc định kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'MVC Product API is running...' });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});