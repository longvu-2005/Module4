const { Sequelize } = require('sequelize');
require('dotenv').config();

// Khởi tạo Sequelize instance sử dụng thông tin từ biến môi trường
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Tắt log câu lệnh SQL dài dòng trên console để giữ log gọn gàng
    }
);

module.exports = sequelize;