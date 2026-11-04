const { Category, Product } = require('../models/index');

const categoryProductController = {
    // 1. GET /api/v1/categories/:id -> Trả về category kèm danh sách product thuộc category đó
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id, {
                include: [{
                    model: Product,
                    as: 'products'
                }]
            });

            if (!category) {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: "CATEGORY_NOT_FOUND",
                        message: "Không tìm thấy danh mục"
                    }
                });
            }

            return res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                success: false,
                error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
            });
        }
    },

    // 2. GET /api/v1/products -> Mỗi product trả kèm object category chỉ gồm 2 field id và name (Dùng đúng 1 câu SELECT JOIN)
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'] // Giới hạn cột bảng liên kết, không lấy toàn bộ
                }]
            });

            return res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                success: false,
                error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
            });
        }
    }
};

module.exports = categoryProductController;