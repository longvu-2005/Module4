const express = require('express');
const v1Users = require('./routes/v1/users');
const v2Users = require('./routes/v2/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết URI Versioning vào app
app.use('/api/v1/users', v1Users);
app.use('/api/v2/users', v2Users);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "URI Versioning API (v1 & v2) is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});