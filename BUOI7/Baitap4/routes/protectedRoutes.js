const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// ==========================================
// GET /api/v1/protected/profile -> Route yêu cầu phải có Token hợp lệ mới được truy cập
// ==========================================
router.get('/profile', authMiddleware, (req, res) => {
    try {
        // req.user đã được gán dữ liệu từ authMiddleware sau khi verify thành công
        return res.status(200).json({
            success: true,
            message: "Xác thực thành công! Chào mừng bạn đến với tài nguyên được bảo vệ.",
            data: {
                userInfo: req.user // Hiển thị payload đã giải mã (userId, role)
            }
        });
    } catch (error) {
        console.error("Protected Route Error:", error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;