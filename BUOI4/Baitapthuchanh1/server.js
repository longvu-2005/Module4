const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware bắt buộc để đọc dữ liệu JSON từ request body (cho POST và PUT)
app.use(express.json());

// Mảng dữ liệu mẫu lưu tạm trong bộ nhớ (In-memory array)
let books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' }
];

let nextId = 3;

// ==========================================
// 1. GET /api/v1/books -> Lấy danh sách (Status: 200)
// ==========================================
app.get('/api/v1/books', (req, res) => {
    res.status(200).json({
        success: true,
        count: books.length,
        data: books
    });
});

// ==========================================
// 2. POST /api/v1/books -> Tạo sách mới (Status: 201)
// ==========================================
app.post('/api/v1/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: "Thiếu thông tin bắt buộc: title hoặc author"
        });
    }

    const newBook = {
        id: nextId++,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json({
        success: true,
        data: newBook
    });
});

// ==========================================
// 3. PUT /api/v1/books/:id -> Cập nhật sách (Status: 200)
// ==========================================
app.put('/api/v1/books/:id', (req, res) => {
    const bookId = Number(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy sách"
        });
    }

    const { title, author } = req.body;

    // Cập nhật thông tin (giữ lại giá trị cũ nếu không truyền field mới)
    books[bookIndex] = {
        id: bookId,
        title: title !== undefined ? title : books[bookIndex].title,
        author: author !== undefined ? author : books[bookIndex].author
    };

    res.status(200).json({
        success: true,
        data: books[bookIndex]
    });
});

// ==========================================
// 4. DELETE /api/v1/books/:id -> Xóa sách (Status: 204 No Content - Không kèm body)
// ==========================================
app.delete('/api/v1/books/:id', (req, res) => {
    const bookId = Number(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy sách"
        });
    }

    // Xóa sách khỏi mảng
    books.splice(bookIndex, 1);

    // Trả về status 204 và kết thúc response không kèm body theo đúng chuẩn REST
    res.status(204).send();
});

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "RESTful Books API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});