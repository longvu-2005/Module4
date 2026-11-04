const sequelize = require('../config/database');
const Category = require('./category');
const Product = require('./product');

// Khai báo quan hệ One-to-Many ở cả hai chiều
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = {
    sequelize,
    Category,
    Product
};