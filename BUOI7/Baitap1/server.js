const express = require('express');
// Gọi cấu hình dotenv ngay tại dòng đầu tiên của ứng dụng để nạp các biến từ file .env vào process.env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route kiểm tra việc đọc biến môi trường thành công (Tuyệt đối không trả về giá trị secret thật trong môi trường thực tế)
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Environment variables loaded successfully!",
        config: {
            port: PORT,
            mongoUriConfigured: !!process.env.MONGO_URI,
            jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
            jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy an toàn tại cổng: ${PORT}`);
    console.log(`- Đã tải thành công các cấu hình JWT Secret và Database URI từ biến môi trường.`);
});