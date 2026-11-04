const express = require('express');
const ApiError = require('./utils/ApiError');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mảng dữ liệu mẫu users lưu tạm trong bộ nhớ (In-memory array)
const users = [
    { id: 1, name: "Vũ Văn Gia Long", email: "vuvangialong02@gmail.com" },
    { id: 2, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" }
];

// ==========================================
// CÁC ROUTES (Chỉ dùng next(new ApiError(...)) khi gặp lỗi)
// ==========================================

// 1. GET /api/v1/users/:id -> Lấy chi tiết user hoặc đẩy lỗi 404 qua next()
app.get('/api/v1/users/:id', (req, res, next) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        // Đẩy lỗi 404 qua next() thay vì tự response
        return next(new ApiError(404, 'USER_NOT_FOUND', 'Không tìm thấy user'));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// 2. GET /api/v1/boom -> Route cố tình throw lỗi 500 để kiểm tra cơ chế bắt lỗi toàn cục
app.get('/api/v1/boom', (req, res, next) => {
    // Cố tình gây lỗi hệ thống (ví dụ: gọi hàm không tồn tại hoặc throw Error)
    throw new Error('Lỗi máy chủ nội bộ bất ngờ xảy ra (Boom!)');
});

// Route lấy danh sách thành công thông thường
app.get('/api/v1/users', (req, res, next) => {
    res.status(200).json({
        success: true,
        data: users,
        meta: { total: users.length }
    });
});

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Centralized Error Handling API is running..." });
});

// Xử lý 404 cho các đường dẫn không tồn tại trên hệ thống
app.all('*', (req, res, next) => {
    next(new ApiError(404, 'NOT_FOUND', `Không tìm thấy đường dẫn ${req.originalUrl} trên server`));
});

// ==========================================
// GLOBAL ERROR HANDLING MIDDLEWARE (Bắt buộc đặt CUỐI CÙNG, đúng 4 tham số)
// ==========================================
app.use((err, req, res, next) => {
    // In stack trace ra console phục vụ debug
    console.error(err.stack);

    const status = err.status || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Đã có lỗi xảy ra từ phía server';

    // Trả về JSON theo đúng chuẩn thống nhất
    res.status(status).json({
        success: false,
        error: {
            code: code,
            message: message,
            status: status
        }
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});