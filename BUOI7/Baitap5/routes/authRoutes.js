const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm tạo Access Token mới (vòng đời ngắn: 15 phút)
const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
};

// Hàm tạo Refresh Token (vòng đời dài: 7 ngày)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

// ==========================================
// 1. POST /api/auth/register (Tạo tài khoản test)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: { id: newUser._id, email: newUser.email }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 2. POST /api/auth/login (Đăng nhập - Lưu Refresh Token vào Database)
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                error: { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không chính xác" }
            });
        }

        // Tạo token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Lưu Refresh Token vào Database để kiểm soát trạng thái phiên đăng nhập
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            data: { accessToken, refreshToken }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, error: "Lỗi hệ thống" });
    }
});

// ==========================================
// 3. POST /api/auth/refresh-token (API Cấp mới Access Token khi hết hạn)
// ==========================================
router.post('/refresh-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: { code: "MISSING_REFRESH_TOKEN", message: "Không tìm thấy Refresh Token trong yêu cầu" }
            });
        }

        // Bước 1: Xác thực chữ ký và thời hạn của Refresh Token bằng JWT_REFRESH_SECRET
        let payload;
        try {
            payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(403).json({
                success: false,
                error: { code: "INVALID_REFRESH_TOKEN", message: "Refresh Token không hợp lệ hoặc đã hết hạn" }
            });
        }

        // Bước 2: Truy vấn Database để đảm bảo token này khớp với token đang lưu trữ (chưa bị thu hồi/