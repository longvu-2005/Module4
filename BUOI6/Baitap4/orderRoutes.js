const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// ==========================================
// 1. POST /api/v1/orders -> Tạo đơn hàng mới liên kết với Product
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { quantity, product_id } = req.body;

        // Kiểm tra xem sản phẩm có tồn tại hay không trước khi tạo đơn hàng
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "PRODUCT_NOT_FOUND",
                    message: "Không tìm thấy sản phẩm được tham chiếu"
                }
            });
        }

        // Tính toán tổng tiền tự động dựa trên giá sản phẩm và số lượng
        const total_price = product.price * quantity;

        const newOrder = await Order.create({
            quantity,
            total_price,
            product_id
        });

        return res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch (error) {
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

// ==========================================
// 2. GET /api/v1/orders/:id -> Lấy thông tin một Đơn hàng và Populate thông tin Product
// ==========================================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Sử dụng phương thức .populate('product_id') ngay sau findById() để nạp dữ liệu chi tiết
        const order = await Order.findById(id).populate('product_id');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "ORDER_NOT_FOUND",
                    message: "Không tìm thấy đơn hàng"
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error("Query Error:", error);
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

// ==========================================
// 3. GET /api/v1/orders -> Lấy danh sách toàn bộ đơn hàng kèm populate sản phẩm
// ==========================================
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('product_id').sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
});

module.exports = router;