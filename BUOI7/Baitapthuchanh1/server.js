const express = require('express');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết hệ thống routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
    res.json({ message: "MVC Architecture Lab API is running..." });
});

// Kết nối database và khởi động server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
};

startServer();