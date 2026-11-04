const mongoose = require('mongoose');

// Khởi tạo Embedded Schema cho address
const addressSchema = new mongoose.Schema({
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }
}, { _id: false });

// Cập nhật User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, default: 0 },
    address: { type: addressSchema } // Embedded Document
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;