const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models/index');

// ==========================================
// 1. GET /api/v1/report/slow (Gây lỗi N+1 Query)
// ==========================================
router.get('/slow', async (req, res, next) => {
    try {
        // Lấy danh sách toàn bộ 50 category (1 query)
        const categories = await Category.findAll();
        const result = [];

        // Dùng vòng lặp gọi Product.findAll() cho từng category (50 queries tiếp theo -> Tổng 51 queries)
        for (const cat of categories) {
            const products = await Product.findAll({
                where: { category_id: cat.id }
            });

            result.push({
                id: cat.id,
                name: cat.name,
                products: products
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
});

// ==========================================
// 2. GET /api/v1/report/fast (Khắc phục bằng Eager Loading)
// ==========================================
router.get('/fast', async (req, res, next) => {
    try {
        // Chỉ dùng MỘT lời gọi Category.findAll() có include kèm eager loading (JOIN SQL)
        const categories = await Category.findAll({
            include: [{
                model: Product,
                as: 'products'
            }]
        });

        // Format dữ liệu đồng nhất với endpoint slow
        const result = categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            products: cat.products
        }));

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;