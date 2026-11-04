// Định nghĩa module tính toán sử dụng chuẩn CommonJS
const calculator = {
    add(a, b) {
        return a + b;
    },
    
    subtract(a, b) {
        return a - b;
    },
    
    multiply(a, b) {
        return a * b;
    },
    
    divide(a, b) {
        // Kiểm tra điều kiện chia cho 0 để trả về thông báo lỗi chính xác
        if (b === 0) {
            return "Lỗi: không thể chia cho 0";
        }
        return a / b;
    }
};

// Export object calculator ra ngoài
module.exports = calculator;