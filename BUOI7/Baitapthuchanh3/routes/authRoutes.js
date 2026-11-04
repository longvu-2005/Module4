const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../services/passwordService');

// Database giả lập trên RAM để minh họa
const mockDatabase = [];

// ==========================================
// 1. POST /api/v1/auth/register -> Đăng ký (Mã hóa mật khẩu)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: { code: "MISSING_FIELDS", message: "Email và mật khẩu là bắt buộc" }
            });
        }

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = mockDatabase.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: { code: "EMAIL_EXISTS", message: "Email đã được đăng ký" }
            });
        }

        // Sử dụng service để băm mật khẩu
        const hashedPassword = await hashPassword(password);

        // Lưu user vào database giả lập
        const newUser = { id: Date.now().toString(), email, password: hashedPassword };
        mockDatabase.push(newUser);

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: {
                id: newUser.id,
                email: newUser.email,
                hashedPasswordPreview: hashedPassword // Chỉ hiển thị minh họa độ an toàn của chuỗi hash
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 2. POST /api/v1/auth/login -> Đăng nhập (Đối chiếu mật khẩu)
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: { code: "MISSING_FIELDS", message: "Email và mật khẩu là bắt buộc" }
            });
        }

        // Tìm user trong database
        const user = mockDatabase.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không chính xác" }
            });
        }

        // Sử dụng service để đối chiếu mật khẩu nhập vào với mật khẩu đã băm trong database
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không chính xác" }
            });
        }

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            data: { email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;