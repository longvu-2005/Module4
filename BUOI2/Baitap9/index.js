const OrderService = require('./orderService');
const { setupLogger } = require('./logger');
const config = require('./config');

const orderService = new OrderService();

// Gắn logger vào orderService
setupLogger(orderService);

console.log(`========================================`);
console.log(` HỆ THỐNG XỬ LÝ ĐƠN HÀNG BẮT ĐẦU CHẠY`);
console.log(` Thời gian trễ cấu hình: ${config.processingDelay}ms`);
console.log(`========================================`);

// Tạo tối thiểu 2 đơn hàng liên tiếp cách nhau một khoảng thời gian ngắn
orderService.createOrder({ id: 101, total: 500000 });

setTimeout(() => {
    orderService.createOrder({ id: 102, total: 1200000 });
}, 500); // Đơn hàng 102 được tạo sau 500ms