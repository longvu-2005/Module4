const express = require('express');
const router = express.Router();
const User = require('../models/user');

// ==========================================
// POST /api/v1/users/register -> Đăng ký người dùng mới
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Tạo bản ghi mới (Middleware pre('save') sẽ tự động băm password)
        const newUser = await User.create({
            username,
            email,
            password,
            role
        });

        return res.status(201).json({
            success: true,
            message: "Tạo tài khoản người dùng thành công",
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: { code: "DUPLICATE_KEY", message: "Username hoặc Email đã tồn tại trong hệ thống" }
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: { code: "VALIDATION_ERROR", message: messages.join(', ') }
            });
        }

        console.error("Server Error:", error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;