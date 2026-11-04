const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Định nghĩa route GET /products/:id
app.get('/products/:id', (req, res) => {
    // 1. Lấy productId từ req.params (Route Params)
    const productId = req.params.id;

    // 2. Lấy sort và limit từ req.query (Query String), thiết lập giá trị mặc định nếu không truyền
    const sort = req.query.sort || 'desc';
    const limit = req.query.limit || '20';

    // 3. Trả về kết quả JSON theo đúng định dạng yêu cầu
    res.status(200).json({
        productId: productId,
        sort: sort,
        limit: limit
    });
});

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Params and Query Lab is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});