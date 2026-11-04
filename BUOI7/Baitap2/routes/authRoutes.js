const express = require('express');
const router = express.Router();
const authLimiter = require('../middlewares/authLimiter');

// ==========================================
// POST /api/v1/auth/login -> API Đăng nhập có gắn Rate Limit bảo vệ
// ==========================================
router.post('/login', authLimiter, (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: { code: "MISSING_CREDENTIALS", message: "Email và mật khẩu là bắt buộc" }
            });
        }

        // Giả lập logic xác thực đăng nhập thành công
        // (Trong thực tế sẽ kiểm tra database, so sánh password hash...)
        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            data: {
                email: email,
                token: "sample_jwt_access_token_xyz..."
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;