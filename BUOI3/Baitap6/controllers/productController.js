const Product = require('../models/Product');

const productController = {
    // Lấy danh sách sản phẩm
    getProducts(req, res) {
        try {
            const products = Product.getAll();
            res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Tạo sản phẩm mới
    createProduct(req, res) {
        try {
            const { name, price, quantity } = req.body;

            // Kiểm tra dữ liệu đầu vào cơ bản
            if (!name || price === undefined || quantity === undefined) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Vui lòng cung cấp đầy đủ thông tin: name, price, quantity' 
                });
            }

            const newProduct = Product.create({ name, price, quantity });
            res.status(201).json({
                success: true,
                message: 'Thêm sản phẩm thành công',
                data: newProduct
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = productController;