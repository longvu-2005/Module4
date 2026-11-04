// Định nghĩa custom error class kế thừa từ Error built-in của JavaScript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Đánh dấu đây là lỗi dự đoán được (Operational error) thay vì lỗi lập trình bất ngờ
        this.isOperational = true;

        // Ghi lại stack trace cho mục đích debug
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;