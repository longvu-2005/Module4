const Product = require('../models/Product');

const productController = {
    getProducts(req, res) {
        try {
            const { limit } = req.query;
            const products = Product.getAll(limit);
            res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getProductById(req, res) {
        try {
            const product = Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy sản phẩm"
                });
            }
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    createProduct(req, res) {
        try {
            const { name, price, quantity } = req.body;
            // Kiểm tra body rỗng hoặc thiếu trường bắt buộc
            if (!name || price === undefined || quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin bắt buộc: name, price, quantity"
                });
            }
            const newProduct = Product.create({ name, price, quantity });
            res.status(201).json({
                success: true,
                message: "Tạo sản phẩm thành công",
                data: newProduct
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = productController;