const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ==========================================
// POST /api/v1/products -> Tạo sản phẩm mới (Kiểm tra Schema Validation)
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { name, price, category } = req.body;

        // Tạo mới bản ghi Product
        const newProduct = await Product.create({
            name,
            price,
            category
        });

        return res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        // Xử lý lỗi validation từ Mongoose (ValidationError)
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

        // Lỗi hệ thống khác
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

// GET /api/v1/products -> Lấy danh sách sản phẩm để kiểm tra dữ liệu
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;