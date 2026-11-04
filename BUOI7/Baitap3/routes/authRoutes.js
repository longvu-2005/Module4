const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm hỗ trợ tạo Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role }, // Payload chỉ chứa định danh và quyền, tuyệt đối KHÔNG lưu password
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
};

// Hàm hỗ trợ tạo Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

// ==========================================
// 1. POST /api/auth/register (Endpoint phụ trợ tạo tài khoản test)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại trong hệ thống" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: { id: newUser._id, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 2. POST /api/auth/login -> API Đăng nhập và Khởi tạo JWT
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra đầu vào
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: { code: "MISSING_CREDENTIALS", message: "Vui lòng cung cấp email và mật khẩu" }
            });
        }

        // Tìm kiếm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không chính xác" }
            });
        }

        // Đối chiếu mật khẩu đã mã hóa bằng bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không chính xác" }
            });
        }

        // Tạo cặp Access Token và Refresh Token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            data: {
                accessToken,
                refreshToken,
                tokenType: "Bearer",
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
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