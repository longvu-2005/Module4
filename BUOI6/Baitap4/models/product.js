const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true }
}, { timestamps: true });

// Tránh lỗi OverwriteModelError khi gọi lại model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;