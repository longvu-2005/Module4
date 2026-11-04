import EventEmitter from 'events';
import config from './config.js';

export default class OrderService extends EventEmitter {
    constructor() {
        super();
    }

    createOrder(order) {
        console.log(`\n📦 [ESM] Đang tiếp nhận đơn hàng #${order.id}...`);
        this.emit('order:created', order);

        setTimeout(() => {
            this.emit('order:processed', order);
        }, config.processingDelay);
    }
}