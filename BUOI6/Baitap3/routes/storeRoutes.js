const express = require('express');
const router = express.Router();
const Store = require('../models/store');

// ==========================================
// POST /api/v1/stores -> Tạo mới cửa hàng với Embedded Document location
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { name, phone, location } = req.body;

        // Lệnh Mongoose tạo mới bản ghi áp dụng cấu trúc lồng nhau
        const newStore = await Store.create({
            name,
            phone,
            location // Truyền trực tiếp object location gồm { street, district, city }
        });

        return res.status(201).json({
            success: true,
            data: newStore
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: messages.join(', ')
                }
            });
        }

        console.error("Server Error:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Đã có lỗi xảy ra từ phía hệ thống"
            }
        });
    }
});

// GET /api/v1/stores -> Lấy danh sách toàn bộ cửa hàng
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;