const mongoose = require('mongoose');

// Khởi tạo User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên người dùng là bắt buộc'],
        trim: true
    },
    age: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;