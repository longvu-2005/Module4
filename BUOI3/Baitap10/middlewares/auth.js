const AppError = require('../utils/AppError');

// 1. authenticate: Kiểm tra header Authorization và giả lập req.user
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Chưa đăng nhập (Thiếu header Authorization)', 401));
    }

    // Giả lập đọc role từ giá trị header (Ví dụ: 'admin' hoặc 'user')
    const role = authHeader.trim().toLowerCase();
    if (role !== 'admin' && role !== 'user') {
        return next(new AppError('Token hoặc Role không hợp lệ', 401));
    }

    // Gán thông tin user giả lập vào req.user
    req.user = {
        id: role === 'admin' ? 1 : 2,
        role: role
    };

    next();
};

// 2. authorize(role): Middleware factory kiểm tra quyền truy cập theo role
const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return next(new AppError('Không đủ quyền truy cập', 403));
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};