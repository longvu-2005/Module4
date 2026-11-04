import config from './config.js';

export function setupLogger(orderService) {
    orderService.on('order:created', (order) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Đơn hàng #${order.id} - created`);
    });

    orderService.on('order:processed', (order) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Đơn hàng #${order.id} - processed`);
    });
}