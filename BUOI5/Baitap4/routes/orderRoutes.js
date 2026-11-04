const express = require('express');
const router = express.Router();
const { sequelize, Product, Order, OrderItem } = require('../models/index');

// ==========================================
// POST /api/v1/orders (Đặt hàng với Transaction)
// ==========================================
router.post('/', async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Danh sách sản phẩm (items) không được để trống"
        });
    }

    // Khởi tạo Sequelize Transaction duy nhất
    const t = await sequelize.transaction();

    try {
        let totalAmount = 0;
        const validatedItems = [];

        // 1. Kiểm tra tồn kho của từng sản phẩm trong danh sách items
        for (const item of items) {
            const { productId, qty } = item;

            if (!productId || !qty || qty <= 0) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: "Thông tin sản phẩm hoặc số lượng (qty) không hợp lệ"
                });
            }

            // Tìm sản phẩm trong DB (khóa bản ghi để tránh race condition trong transaction)
            const product = await Product.findByPk(productId, { transaction: t });

            if (!product) {
                await t.rollback();
                return res.status(404).json({
                    success: false,
                    message: `Không tìm thấy sản phẩm với ID: ${productId}`
                });
            }

            // Kiểm tra tồn kho
            if (product.stock < qty) {
                // Nếu không đủ tồn kho -> Rollback toàn bộ transaction và trả về 409 kèm tên sản phẩm thiếu hàng
                await t.rollback();
                return res.status(409).json({
                    success: false,
                    error: {
                        code: "OUT_OF_STOCK",
                        message: `Sản phẩm '${product.name}' không đủ tồn kho (Còn lại: ${product.stock}, Yêu cầu: ${qty})`,
                        productName: product.name
                    }
                });
            }

            totalAmount += product.price * qty;
            validatedItems.push({ product, qty, price: product.price });
        }

        // 2. Tạo bản ghi trong bảng orders
        const newOrder = await Order.create({
            total_amount: totalAmount,
            status: 'completed'
        }, { transaction: t });

        // 3. Tạo các bản ghi order_items tương ứng và 4. Trừ stock của từng product bằng decrement
        for (const vi of validatedItems) {
            // Tạo bản ghi trong bảng trung gian order_items
            await OrderItem.create({
                order_id: newOrder.id,
                product_id: vi.product.id,
                qty: vi.qty,
                price: vi.price
            }, { transaction: t });

            // Trừ stock của product bằng phương thức decrement
            await vi.product.decrement('stock', { by: vi.qty, transaction: t });
        }

        // Commit transaction nếu mọi thao tác thành công tuyệt đối
        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Đặt hàng thành công và đã trừ tồn kho",
            data: {
                orderId: newOrder.id,
                totalAmount: totalAmount,
                items: items
            }
        });

    } catch (error) {
        // Nếu phát sinh bất kỳ lỗi hệ thống nào khác -> Rollback transaction
        await t.rollback();
        console.error("Lỗi transaction đặt hàng:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ nội bộ trong quá trình xử lý đơn hàng",
            error: error.message
        });
    }
});

module.exports = router;