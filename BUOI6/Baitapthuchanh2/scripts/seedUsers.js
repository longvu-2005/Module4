const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

const seedUsers = async () => {
    try {
        // 1. Kết nối tới MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully for seeding users.');

        // 2. Danh sách 3 người dùng mới cần thêm (không cần truyền _id)
        const usersData = [
            { name: "Nguyễn Văn An", age: 20 },
            { name: "Trần Thị Bình", age: 22 },
            { name: "Lê Hoàng Cường", age: 25 }
        ];

        // 3. Sử dụng User.insertMany() để thêm đồng thời nhiều bản ghi dạng mảng
        const createdUsers = await User.insertMany(usersData);

        console.log('\n--- KẾT QUẢ THÊM MỚI (CREATE) ---');
        console.log(`Đã thêm thành công ${createdUsers.length} người dùng:`);
        console.log(createdUsers);
        console.log-----------------------------------\n);

        // Đóng kết nối sau khi hoàn tất
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);

    } catch (error) {
        console.error('Lỗi khi thêm mới người dùng:', error);
        process.exit(1);
    }
};

// Chạy script seed
seedUsers();