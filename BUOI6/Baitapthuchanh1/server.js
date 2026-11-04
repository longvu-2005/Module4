const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const User = require('./models/user'); // Import model để đảm bảo Schema được biên dịch

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Mongoose Connection Lab is running..." });
});

// Khởi động server sau khi kết nối MongoDB thành công
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
};

startServer();