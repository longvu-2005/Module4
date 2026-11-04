const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

const queryUsersByAddressAndAge = async () => {
    try {
        // 1. Kết nối tới MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully for querying users.');

        // 2. Truy vấn sử dụng Dot Notation "address.city" và toán tử \$gt (greater than)
        // Điều kiện: sống ở thành phố "Hanoi" VÀ độ tuổi lớn hơn 20 (age > 20)
        const matchedUsers = await User.find({
            "address.city": "Hanoi",
            age: { \$gt: 20 }
        });

        console.log('\n--- KẾT QUẢ TRUY VẤN (DOT NOTATION & \$GT) ---');
        console.log(`Tìm thấy ${matchedUsers.length} người dùng thỏa mãn điều kiện:`);
        console.log(matchedUsers);
        console.log('----------------------------------------------\n');

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
queryUsersByAddressAndAge();