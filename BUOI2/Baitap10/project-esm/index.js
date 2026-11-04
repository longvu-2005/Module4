import OrderService from './orderService.js';
import { setupLogger } from './logger.js';
import config from './config.js';

const orderService = new OrderService();
setupLogger(orderService);

console.log(`========================================`);
console.log(` ESM SYSTEM RUNNING (Delay: ${config.processingDelay}ms)`);
console.log(`========================================`);

orderService.createOrder({ id: 101, total: 500000 });