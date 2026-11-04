const express = require('express');
const protectedRoutes = require('./routes/protectedRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết route được bảo vệ bởi middleware
app.use('/api/v1/protected', protectedRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Auth Middleware Lab API is running..." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});