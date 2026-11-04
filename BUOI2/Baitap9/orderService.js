const EventEmitter = require('events');
const config = require('./config');

class OrderService extends EventEmitter {
    constructor() {
        super();
    }

    createOrder(order) {
        console.log(`\n📦 Đang tiếp nhận đơn hàng #${order.id}...`);
        
        // 1. Emit sự kiện order:created ngay lập tức
        this.emit('order:created', order);

        // 2. Dùng setTimeout với thời gian từ config để mô phỏng quá trình xử lý bất đồng bộ (Macrotask)
        setTimeout(() => {
            // Sau khoảng thời gian trễ, emit sự kiện order:processed
            this.emit('order:processed', order);
        }, config.processingDelay);
    }
}

module.exports = OrderService;