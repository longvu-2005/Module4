const express = require('express');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');
const AppError = require('./utils/AppError');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON
app.use(express.json());

// Phục vụ các file tĩnh trong thư mục uploads để có thể truy cập ảnh qua URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Logger Middleware toàn cục ghi log mọi request
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

// 2. Gắn router employee vào /api/employees
app.use('/api/employees', employeeRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'Employee MVC API with Upload & Error Handling is running...' });
});

// Xử lý Route không tồn tại (404)
app.all('*', (req, res, next) => {
    next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl} trên server`, 404));
});

// 3. Global Error-Handling Middleware (Đặt ở cuối cùng, đúng 4 tham số)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Lỗi hệ thống nội bộ';

    res.status(statusCode).json({
        success: false,
        message: message
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});