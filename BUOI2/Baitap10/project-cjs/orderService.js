const EventEmitter = require('events');
const config = require('./config');

class OrderService extends EventEmitter {
    constructor() {
        super();
    }

    createOrder(order) {
        console.log(`\n📦 [CJS] Đang tiếp nhận đơn hàng #${order.id}...`);
        this.emit('order:created', order);

        setTimeout(() => {
            this.emit('order:processed', order);
        }, config.processingDelay);
    }
}

module.exports = OrderService;