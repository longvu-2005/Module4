const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Số lượng mua là bắt buộc'],
        min: [1, 'Số lượng mua tối thiểu là 1']
    },
    total_price: {
        type: Number,
        required: [true, 'Tổng tiền là bắt buộc'],
        min: [0, 'Tổng tiền không được âm']
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Tham chiếu tới collection Product
        required: [true, 'Mã sản phẩm (product_id) là bắt buộc']
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;