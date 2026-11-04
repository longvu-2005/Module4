const express = require('express');
const orders = require('./data/orders');
const { generateOrderLinks } = require('./utils/links');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// ROUTE: GET /api/v2/orders/:id (HATEOAS Level 3)
// ==========================================
app.get('/api/v2/orders/:id', (req, res) => {
    const orderId = Number(req.params.id);
    const order = orders.find(o => o.id === orderId);

    // Kiểm tra tồn tại của đơn hàng
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy đơn hàng"
        });
    }

    // Sử dụng hàm tiện ích sinh khối _links động theo status
    const links = generateOrderLinks(order);

    // Trả về response chuẩn HATEOAS
    res.status(200).json({
        success: true,
        data: order,
        _links: links
    });
});

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "HATEOAS API (Level 3) is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});