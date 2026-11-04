const config = require('./config');

function setupLogger(orderService) {
    // Lắng nghe sự kiện order:created
    orderService.on('order:created', (order) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Đơn hàng #${order.id} - created`);
    });

    // Lắng nghe sự kiện order:processed
    orderService.on('order:processed', (order) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Đơn hàng #${order.id} - processed (Xử lý thành công sau ${config.processingDelay}ms)`);
    });
}

module.exports = { setupLogger };