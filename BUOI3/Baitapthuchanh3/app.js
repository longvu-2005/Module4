const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON cho request body
app.use(express.json());

// Gắn router vào ứng dụng qua prefix /api/students
app.use('/api/students', studentRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Student Router API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});