const EventEmitter = require('events');

// Định nghĩa class OrderService kế thừa từ EventEmitter
class OrderService extends EventEmitter {
    constructor() {
        super();
        this.initListeners();
    }

    // Thiết lập các lắng nghe sự kiện (listeners)
    initListeners() {
        // 1. Sử dụng .on: Chạy MỖI KHI sự kiện 'order:created' được emit
        this.on('order:created', (order) => {
            console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${order.id}`);
        });

        // 2. Sử dụng .once: CHỈ CHẠY ĐÚNG 1 LẦN DUY NHẤT cho lần emit đầu tiên
        this.once('order:created', (order) => {
            console.log(`[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống`);
        });
    }

    // Phương thức giả lập tạo đơn hàng và phát sự kiện
    createOrder(id, total) {
        const order = { id, total };
        console.log(`\n--- Đang tạo đơn hàng #${id} (Tổng: ${total} VNĐ) ---`);
        
        // Emit sự kiện order:created kèm theo dữ liệu đơn hàng
        this.emit('order:created', order);
    }
}

// ==========================================
// CODE TEST: Tạo tối thiểu 3 đơn hàng mẫu
// ==========================================
const service = new OrderService();

const sampleOrders = [
    { id: 1, total: 100000 },
    { id: 2, total: 250000 },
    { id: 3, total: 75000 }
];

// Emit tuần tự các đơn hàng
sampleOrders.forEach(order => {
    service.createOrder(order.id, order.total);
});