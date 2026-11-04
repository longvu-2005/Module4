const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'books', // Áp dụng tên bảng dạng số nhiều chuẩn REST
    underscored: true   // Tự động chuyển đổi các cột dạng camelCase sang snake_case (ví dụ: createdAt -> created_at)
});

module.exports = Book;