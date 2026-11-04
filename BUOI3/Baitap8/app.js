const express = require('express');
const AppError = require('./utils/AppError');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON cho request body
app.use(express.json());

// Mẫu dữ liệu người dùng (Mock Data)
const users = [
    { id: 1, name: 'Vũ Văn Gia Long', email: 'vuvangialong02@gmail.com' },
    { id: 2, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com' }
];

// ==========================================
// 1. ROUTE: GET /users/:id (Kiểm tra tồn tại user)
// ==========================================
app.get('/users/:id', (req, res, next) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    // Nếu id không tồn tại trong dữ liệu mẫu -> next(new AppError(..., 404))
    if (!user) {
        return next(new AppError('Không tìm thấy user', 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// ==========================================
// 2. ROUTE: POST /users (Kiểm tra validate body)
// ==========================================
app.post('/users', (req, res, next) => {
    const { name, email } = req.body;

    // Nếu thiếu trường email trong body -> next(new AppError(..., 400))
    if (!email) {
        return next(new AppError('Thiếu trường email', 400));
    }

    const newUser = {
        id: users.length + 1,
        name: name || 'Anonymous',
        email
    };
    users.push(newUser);

    res.status(201).json({
        success: true,
        message: 'Tạo user thành công',
        data: newUser
    });
});

// ==========================================
// 3. ROUTE: GET /users/secret (Kiểm tra xác thực Authorization header)
// ==========================================
app.get('/users/secret', (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Nếu không có header Authorization -> next(new AppError(..., 401))
    if (!authHeader) {
        return next(new AppError('Chưa xác thực', 401));
    }

    res.status(200).json({
        success: true,
        message: 'Truy cập thành công vào dữ liệu bảo mật (secret)'
    });
});

// ==========================================
// ROUTE MẶC ĐỊNH CHO TRƯỜNG HỢP CHẠY ĐÚNG (Không lỗi)
// ==========================================
app.get('/', (req, res) => {
    res.json({ message: 'Global Error Handling Lab is running successfully!' });
});

// ==========================================
// 4. GLOBAL ERROR HANDLING MIDDLEWARE (Bắt buộc đặt ở cuối cùng, đúng 4 tham số)
// ==========================================
app.use((err, req, res, next) => {
    // Lấy statusCode từ lỗi, mặc định là 500 nếu không có
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Lỗi hệ thống nội bộ';

    // Trả về JSON theo đúng format yêu cầu
    res.status(statusCode).json({
        success: false,
        message: message
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});