const rateLimit = require('express-rate-limit');

// Tạo middleware giới hạn số lượng request cho API đăng nhập
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Khoảng thời gian: 15 phút (tính bằng mili-giây)
    max: 5,                   // Giới hạn tối đa: 5 yêu cầu từ một IP trong 15 phút
    standardHeaders: true,    // Trả về thông tin rate limit trong các header `RateLimit-*`
    legacyHeaders: false,     // Tắt các header cũ `X-RateLimit-*`
    message: {
        success: false,
        error: {
            code: "TOO_MANY_REQUESTS",
            message: "Bạn đã vượt quá số lần thử đăng nhập cho phép. Vui lòng thử lại sau 15 phút."
        }
    }
});

module.exports = authLimiter;