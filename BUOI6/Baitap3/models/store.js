const mongoose = require('mongoose');

// Định nghĩa cấu trúc lồng nhau (Embedded Document) cho location
const locationSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Tên đường (street) là bắt buộc'],
        trim: true
    },
    district: {
        type: String,
        required: [true, 'Quận/Huyện (district) là bắt buộc'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'Thành phố (city) là bắt buộc'],
        trim: true
    }
}, { _id: false }); // Tắt _id cho subdocument nếu không cần thiết lập ID riêng

// Thiết kế Schema Store chính
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên cửa hàng là bắt buộc'],
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        type: locationSchema,
        required: [true, 'Thông tin địa chỉ (location) là bắt buộc']
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;