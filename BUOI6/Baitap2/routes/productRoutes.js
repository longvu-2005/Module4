const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ==========================================
// 1. POST /api/v1/products -> Tạo sản phẩm mới (Kiểm tra Schema Validation)
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { name, price, category } = req.body;

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

// ==========================================
// 2. GET /api/v1/products/filter -> Lấy sản phẩm danh mục "Laptop" HOẶC "Mobile" VÀ giá < 20.000
// ==========================================
router.get('/filter', async (req, res) => {
    try {
        // Sử dụng toán tử $in để lọc danh mục tối ưu kết hợp với $lt để lọc giá nhỏ hơn 20000
        const products = await Product.find({
            category: { $in: ["Laptop", "Mobile"] },
            price: { $lt: 20000 }
        });

        /* 
          Hoặc bạn có thể sử dụng toán tử $or đúng theo gợi ý:
          const products = await Product.find({
              $or: [
                  { category: "Laptop" },
                  { category: "Mobile" }
              ],
              price: { $lt: 20000 }
          });
        */

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Đã có lỗi xảy ra từ phía hệ thống"
            }
        });
    }
});

// ==========================================
// 3. GET /api/v1/products -> Lấy toàn bộ danh sách sản phẩm
// ==========================================
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