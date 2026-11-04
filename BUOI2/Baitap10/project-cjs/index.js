const OrderService = require('./orderService');
const { setupLogger } = require('./logger');
const config = require('./config');

const orderService = new OrderService();
setupLogger(orderService);

console.log(`========================================`);
console.log(` CJS SYSTEM RUNNING (Delay: ${config.processingDelay}ms)`);
console.log(`========================================`);

orderService.createOrder({ id: 101, total: 500000 });