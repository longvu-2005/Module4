const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết route xác thực
app.use('/api/v1/auth', authRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Rate Limit Security Lab is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});