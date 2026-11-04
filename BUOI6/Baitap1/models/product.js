const mongoose = require('mongoose');

// Khởi tạo Product Schema với các quy tắc validation chặt chẽ
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        minlength: [5, 'Tên sản phẩm phải có tối thiểu 5 ký tự'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá sản phẩm phải là số dương (tối thiểu là 0)']
    },
    category: {
        type: String,
        required: [true, 'Danh mục sản phẩm là bắt buộc'],
        trim: true
    }
}, {
    timestamps: true // Tự động tạo và quản lý hai trường createdAt và updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;