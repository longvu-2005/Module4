const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    tableName: 'products',
    underscored: true
});

module.exports = Product;