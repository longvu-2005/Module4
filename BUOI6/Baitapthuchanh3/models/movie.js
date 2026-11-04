const mongoose = require('mongoose');

// Khởi tạo Movie Schema thể hiện các kiểu dữ liệu BSON phong phú
const movieSchema = new mongoose.Schema({
    title: {
        type: String, // Kiểu String
        required: [true, 'Tên phim là bắt buộc'],
        trim: true
    },
    releaseYear: {
        type: Number, // Kiểu Number
        required: [true, 'Năm phát hành là bắt buộc']
    },
    isReleased: {
        type: Boolean, // Kiểu Boolean
        default: false
    },
    genres: {
        type: [String], // Kiểu Array chứa các chuỗi (thể loại phim)
        required: [true, 'Danh sách thể loại là bắt buộc']
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;