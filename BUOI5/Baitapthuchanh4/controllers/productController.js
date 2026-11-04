const Product = require('../models/product');

const productController = {
    // 1. GET /api/v1/products -> Lấy danh sách sản phẩm (Status: 200)
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            return res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            // Bảo mật: Không để lộ thông tin câu SQL hay kết nối database
            console.error("Database Error:", error);
            return res.status(500).json({
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Đã có lỗi xảy ra từ phía hệ thống"
                }
            });
        }
    },

    // 2. GET /api/v1/products/:id -> Lấy chi tiết sản phẩm theo ID (Status: 200 | 404)
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: "PRODUCT_NOT_FOUND",
                        message: "Không tìm thấy sản phẩm"
                    }
                });
            }

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Đã có lỗi xảy ra từ phía hệ thống"
                }
            });
        }
    },

    // 3. POST /api/v1/products -> Tạo sản phẩm mới (Status: 201)
    async createProduct(req, res) {
        try {
            const { name, price, stock } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: "MISSING_FIELD",
                        message: "Tên sản phẩm (name) là bắt buộc"
                    }
                });
            }

            const newProduct = await Product.create({
                name,
                price: price !== undefined ? price : 0,
                stock: stock !== undefined ? stock : 0
            });

            return res.status(201).json({
                success: true,
                data: newProduct
            });
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Đã có lỗi xảy ra từ phía hệ thống"
                }
            });
        }
    },

    // 4. PUT /api/v1/products/:id -> Cập nhật sản phẩm (Status: 200 | 404)
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, price, stock } = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: "PRODUCT_NOT_FOUND",
                        message: "Không tìm thấy sản phẩm"
                    }
                });
            }

            // Cập nhật thông tin bản ghi
            await product.update({
                name: name !== undefined ? name : product.name,
                price: price !== undefined ? price : product.price,
                stock: stock !== undefined ? stock : product.stock
            });

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Đã có lỗi xảy ra từ phía hệ thống"
                }
            });
        }
    },

    // 5. DELETE /api/v1/products/:id -> Xóa sản phẩm (Status: 204 | 404 - Không kèm body khi 204)
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: "PRODUCT_NOT_FOUND",
                        message: "Không tìm thấy sản phẩm"
                    }
                });
            }

            await product.destroy();

            // Trả về status 204 và kết thúc response tuyệt đối không kèm body
            return res.status(204).send();
        } catch (error) {
            console.error("Database Error:", error);
            return res.status(500).json({
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Đã có lỗi xảy ra từ phía hệ thống"
                }
            });
        }
    }
};

module.exports = productController;