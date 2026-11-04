const mongoose = require('mongoose');
const Product = require('../models/product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore_db';

const migrateMissingStock = async () => {
    try {
        // 1. Kết nối tới MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully for migration.');

        // 2. Tìm và cập nhật tất cả sản phẩm cũ chưa có trường stock (\$exists: false)
        // Sử dụng updateMany kết hợp toán tử \$set để gán giá trị mặc định là 10
        const result = await Product.updateMany(
            { stock: { \$exists: false } }, // Điều kiện: trường stock chưa tồn tại
            { \$set: { stock: 10 } }        // Thao tác: thiết lập stock = 10
        );

        console.log(`\n--- KẾT QUẢ MIGRATION DỮ LIỆU KHUYẾT THIẾU ---`);
        console.log(`- Số lượng bản ghi tìm thấy và khớp điều kiện: ${result.matchedCount}`);
        console.log(`- Số lượng bản ghi đã được cập nhật thành công: ${result.modifiedCount}`);
        console.log(`---------------------------------------------\n`);

        // Đóng kết nối sau khi hoàn tất
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);

    } catch (error) {
        console.error('Lỗi trong quá trình migration dữ liệu:', error);
        process.exit(1);
    }
};

// Chạy script migration
migrateMissingStock();