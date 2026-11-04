const EventEmitter = require('events');

// Định nghĩa class NotificationCenter kế thừa từ EventEmitter
class NotificationCenter extends EventEmitter {
    constructor() {
        super();
        this.setupListeners();
        this.setupErrorHandler();
    }

    // Thiết lập các listener độc lập cho 3 loại sự kiện
    setupListeners() {
        // ==========================================
        // 1. Sự kiện: user:registered (Đăng ký tài khoản)
        // ==========================================
        // Listener 1: Gửi email chào mừng
        this.on('user:registered', (user) => {
            console.log(`[EMAIL] Gửi email chào mừng đến tài khoản: ${user.email}`);
        });

        // Listener 2: Lưu log hệ thống hoặc cấp voucher khởi tạo
        this.on('user:registered', (user) => {
            console.log(`[SYSTEM] Cấp voucher 50k khởi tạo cho user ID: ${user.id}`);
        });


        // ==========================================
        // 2. Sự kiện: order:created (Tạo đơn hàng mới)
        // ==========================================
        // Listener 1: Gửi xác nhận đơn hàng
        this.on('order:created', (order) => {
            console.log(`[EMAIL] Gửi xác nhận đơn #${order.id} (Tổng tiền: ${order.total} VNĐ)`);
        });

        // Listener 2: Cập nhật doanh thu thống kê
        this.on('order:created', (order) => {
            console.log(`[STATS] Cập nhật doanh thu: +${order.total} VNĐ`);
        });


        // ==========================================
        // 3. Sự kiện: order:cancelled (Hủy đơn hàng)
        // ==========================================
        // Listener 1: Hoàn tiền / Xử lý kho
        this.on('order:cancelled', (order) => {
            console.log(`[INVENTORY] Hoàn trả hàng vào kho cho đơn hủy #${order.id}`);
        });

        // Listener 2: Kiểm tra hạn mức và CỐ TÌNH NÉM LỖI nếu total > 1,000,000
        this.on('order:cancelled', (order) => {
            if (order.total > 1000000) {
                throw new Error(`Lỗi giao dịch: Đơn hàng #${order.id} giá trị lớn (${order.total} VNĐ) cần phê duyệt thủ công!`);
            } else {
                console.log(`[FINANCE] Hoàn tiền tự động cho đơn hủy #${order.id}`);
            }
        });
    }

    // ==========================================
    // YÊU CẦU BẮT BUỘC: Lắng nghe sự kiện 'error' của EventEmitter
    // ==========================================
    setupErrorHandler() {
        this.on('error', (err) => {
            console.error(`\n❌ [ERROR CAUGHT BY EVENTEMITTER]: ${err.message}`);
            console.log(`🛡️  Hệ thống đã bắt lỗi thành công, chương trình tiếp tục chạy bình thường không bị crash!\n`);
        });
    }

    // Phương thức giả lập kích hoạt sự kiện an toàn (bắt try-catch nếu có throw từ sync listener)
    triggerEvent(eventName, data) {
        console.log(`\n----------------------------------------`);
        console.log(`📢 Đang phát sự kiện: [${eventName}] với dữ liệu:`, data);
        console.log(`----------------------------------------`);
        
        try {
            // Phát sự kiện qua EventEmitter
            this.emit(eventName, data);
        } catch (err) {
            // Trong Node.js EventEmitter, nếu listener là đồng bộ và throw Error, 
            // ta cần bắt lỗi hoặc emitter sẽ bắn sự kiện 'error'. 
            // Nếu không có listener 'error', node sẽ crash. Do ta đã có this.on('error', ...), 
            // ta có thể emit sự kiện 'error' thủ công nếu cần bắt tường minh:
            this.emit('error', err);
        }
    }
}

// ==========================================
// KỊCH BẢN TEST: Emit tối thiểu 5 sự kiện (có trường hợp gây lỗi)
// ==========================================
const center = new NotificationCenter();

// Sự kiện 1: user:registered
center.triggerEvent('user:registered', { id: 101, email: 'vuvangialong02@gmail.com' });

// Sự kiện 2: order:created (Đơn bình thường)
center.triggerEvent('order:created', { id: 201, total: 350000 });

// Sự kiện 3: order:cancelled (Đơn hủy giá trị nhỏ <= 1,000,000 -> Không lỗi)
center.triggerEvent('order:cancelled', { id: 202, total: 200000 });

// Sự kiện 4: order:cancelled (CỐ TÌNH GÂY LỖI: Đơn hủy giá trị lớn > 1,000,000)
center.triggerEvent('order:cancelled', { id: 203, total: 2500000 });

// Sự kiện 5: order:created tiếp theo (Chứng minh chương trình VẪN TIẾP TỤC CHẠY sau khi có lỗi)
center.triggerEvent('order:created', { id: 204, total: 1500000 });