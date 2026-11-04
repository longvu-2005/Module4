// Định nghĩa custom ApiError class kế thừa từ Error built-in
class ApiError extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
        
        // Ghi lại stack trace cho việc debug
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;