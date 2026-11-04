const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết route xác thực
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Password Hashing Security Lab API is running..." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});