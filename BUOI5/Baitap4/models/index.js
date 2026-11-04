const sequelize = require('../config/database');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItem');

// Khai báo quan hệ nhiều-nhiều ở cả hai chiều qua bảng trung gian order_items
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'order_id', otherKey: 'product_id' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id', otherKey: 'order_id' });

module.exports = {
    sequelize,
    Product,
    Order,
    OrderItem
};