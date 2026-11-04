const express = require('express');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const AppError = require('./utils/AppError');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logger middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

// Mount routers với prefix yêu cầu
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Blog RBAC API is running successfully!' });
});

// Xử lý 404 Route không tồn tại
app.all('*', (req, res, next) => {
    next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl} trên server`, 404));
});

// Global Error Handling Middleware (Duy nhất ở cuối cùng, đúng 4 tham số)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Lỗi hệ thống nội bộ';

    res.status(statusCode).json({
        success: false,
        message: message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});