const sequelize = require('../config/database');
const Category = require('./category');
const Product = require('./product');

// Quan hệ 1-Nhiều: Một Category có nhiều Product
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = {
    sequelize,
    Category,
    Product
};