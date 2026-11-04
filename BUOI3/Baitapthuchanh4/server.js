const express = require('express');
const checkAuth = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON cho request body
app.use(express.json());

// ==========================================
// 1. GLOBAL LOGGER MIDDLEWARE (Áp dụng toàn cục qua app.use)
// ==========================================
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${req.method}] ${req.url} - ${timestamp}`);
    // Bắt buộc gọi next() để request tiếp tục luồng xử lý
    next();
};

// Đăng ký logger middleware chạy cho mọi request
app.use(logger);

// ==========================================
// 2. CÁC ROUTES CỦA ỨNG DỤNG
// ==========================================

// Route công khai 1: GET /
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Home Page"
    });
});

// Route công khai 2: GET /products
app.get('/products', (req, res) => {
    res.status(200).json({
        message: "Danh sách sản phẩm",
        data: []
    });
});

// Route bảo mật: GET /admin/dashboard (Áp dụng checkAuth cục bộ)
app.get('/admin/dashboard', checkAuth, (req, res) => {
    res.status(200).json({
        message: "Chào mừng Admin"
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});