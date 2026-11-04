const mongoose = require('mongoose');
const Movie = require('../models/movie');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

const queryMovies = async () => {
    try {
        // 1. Kết nối tới MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully for querying movies.');

        // 2. Thực hiện truy vấn kết hợp toán tử \$in và điều kiện isReleased
        // - genres: { \$in: ["Action", "Horror"] } -> Thuộc thể loại "Action" HOẶC "Horror"
        // - isReleased: true -> Phim đã được phát hành
        const matchedMovies = await Movie.find({
            genres: { \$in: ["Action", "Horror"] },
            isReleased: true
        });

        console.log('\n--- KẾT QUẢ TRUY VẤN (QUERY FILTERS) ---');
        console.log(`Tìm thấy ${matchedMovies.length} bộ phim thỏa mãn điều kiện:`);
        console.log(matchedMovies);
        console.log('-----------------------------------------\n');

        // Đóng kết nối sau khi hoàn tất
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);

    } catch (error) {
        console.error('Lỗi khi truy vấn dữ liệu:', error);
        process.exit(1);
    }
};

// Chạy script truy vấn
queryMovies();