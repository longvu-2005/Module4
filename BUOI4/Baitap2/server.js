const express = require('express');
const versionResolver = require('./middlewares/versionResolver');
const books = require('./data/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Áp dụng middleware phân giải version cho các route API
app.use('/api/books', versionResolver);

// ==========================================
// ROUTE: GET /api/books (Hỗ trợ Header Versioning)
// ==========================================
app.get('/api/books', (req, res) => {
    const version = req.apiVersion;

    // 1. Kiểm tra hỗ trợ version (Hỗ trợ v1, v2; từ chối v9 hoặc các version khác)
    if (version !== 'v1' && version !== 'v2') {
        return res.status(400).json({
            success: false,
            error: {
                code: "UNSUPPORTED_API_VERSION",
                message: `Version '${version}' không được hỗ trợ hoặc không tồn tại.`
            }
        });
    }

    // 2. Format response dựa trên từng version từ cùng một nguồn dữ liệu
    if (version === 'v1') {
        // v1: format author dưới dạng chuỗi (string)
        const formattedBooks = books.map(b => ({
            id: b.id,
            title: b.title,
            author: b.authorName
        }));

        // Yêu cầu bắt buộc: Mọi response của v1 phải kèm 2 header Deprecation và Sunset
        res.setHeader('Deprecation', 'true');
        res.setHeader('Sunset', 'Wed, 31 Dec 2025 23:59:59 GMT');

        return res.status(200).json({
            success: true,
            version: 'v1',
            data: formattedBooks
        });
    }

    if (version === 'v2') {
        // v2: format author dưới dạng object chi tiết hơn và kèm publishedYear
        const formattedBooks = books.map(b => ({
            id: b.id,
            title: b.title,
            author: {
                id: b.authorId,
                name: b.authorName
            },
            publishedYear: b.publishedYear
        }));

        return res.status(200).json({
            success: true,
            version: 'v2',
            data: formattedBooks
        });
    }
});

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Header Versioning & Deprecation API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});