const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware bắt buộc để đọc dữ liệu JSON từ request body (POST /books)
app.use(express.json());

// 1. GET / -> Trả về thông điệp chào mừng
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Bookstore API"
    });
});

// 2. GET /books -> Trả về danh sách sách (mảng rỗng)
app.get('/books', (req, res) => {
    res.status(200).json({
        message: "Danh sách sách",
        data: []
    });
});

// 3. POST /books -> Nhận dữ liệu từ body và trả về thông báo kèm data
app.post('/books', (req, res) => {
    const bookData = req.body;
    res.status(201).json({
        message: "Tạo sách thành công",
        data: bookData
    });
});

// 4. GET /books/:id -> Lấy id từ req.params.id và trả về chi tiết
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    res.status(200).json({
        message: "Chi tiết sách",
        id: bookId
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});