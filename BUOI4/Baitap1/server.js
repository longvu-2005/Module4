const express = require('express');
const { users, orders } = require('./data/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON
app.use(express.json());

// ==========================================
// ROUTE: GET /api/v1/users/:userId/orders
// ==========================================
app.get('/api/v1/users/:userId/orders', (req, res) => {
    const userId = Number(req.params.userId);

    // 1. Kiểm tra userId có tồn tại trong hệ thống hay không
    if (!users.includes(userId)) {
        return res.status(404).json({
            success: false,
            error: {
                code: "USER_NOT_FOUND",
                message: `Không tìm thấy user với ID: ${userId}`
            }
        });
    }

    // 2. Lọc danh sách đơn hàng theo userId
    let userOrders = orders.filter(o => o.userId === userId);

    // 3. Xử lý Query String: status và limit
    const { status, limit } = req.query;

    // Lọc theo status nếu được truyền và hợp lệ (pending | paid | cancelled)
    if (status) {
        const validStatuses = ['pending', 'paid', 'cancelled'];
        if (validStatuses.includes(status)) {
            userOrders = userOrders.filter(o => o.status === status);
        }
    }

    // Xử lý limit (mặc định lấy 5 bản ghi nếu không truyền)
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    const limitedOrders = userOrders.slice(0, parsedLimit);

    // 4. Trả về response theo đúng format yêu cầu
    res.status(200).json({
        success: true,
        data: limitedOrders,
        meta: {
            total: limitedOrders.length
        }
    });
});

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Nested Resource API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});