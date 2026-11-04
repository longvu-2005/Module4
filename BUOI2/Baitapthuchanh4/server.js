// 1. Nạp và cấu hình dotenv để đọc biến môi trường từ file .env
require('dotenv').config();

const http = require('http');

// 2. Lấy cấu hình từ process.env, đặt giá trị mặc định PORT = 3000 nếu không có
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_KEY = process.env.API_KEY || 'default_key';

// 3. Tạo HTTP Server thuần
const server = http.createServer((req, res) => {
    // Kiểm tra route GET /
    if (req.method === 'GET' && req.url === '/') {
        // Chuẩn bị dữ liệu JSON trả về
        const responseData = {
            message: "Server dang chay",
            env: NODE_ENV
        };

        // Thiết lập header trả về kiểu JSON
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        
        // Gửi chuỗi JSON về cho client
        res.end(JSON.stringify(responseData));
    } else {
        // Xử lý các route không tồn tại (404 Not Found)
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: "404 Not Found" }));
    }
});

// 4. Khởi động server lắng nghe tại cổng đã cấu hình
server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📦 Môi trường hiện tại (NODE_ENV): ${NODE_ENV}`);
    console.log(`🔑 API Key đã được tải: ${API_KEY ? '****** (Đã cấu hình)' : 'Chưa có'}`);
});