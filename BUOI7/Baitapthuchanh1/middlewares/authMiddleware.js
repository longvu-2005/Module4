// Middleware trung gian kiểm tra yêu cầu trước khi đến controller
const sampleMiddleware = (req, res, next) => {
    // Logic kiểm duyệt (ví dụ: kiểm tra header, token, log request...)
    console.log(`[Middleware] Incoming request to: ${req.method} ${req.url}`);
    next();
};

module.exports = sampleMiddleware;