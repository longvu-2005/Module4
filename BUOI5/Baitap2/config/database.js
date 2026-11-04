const { Sequelize } = require('sequelize');
require('dotenv').config();

// Khởi tạo Sequelize instance và bật logging để hiển thị câu lệnh SQL ra console
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: (msg) => console.log(`[SQL Query]: ${msg}`) // Bật logging theo yêu cầu
    }
);

module.exports = sequelize;