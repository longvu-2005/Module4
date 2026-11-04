const express = require('express');
const { sendSuccess, sendError } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mảng dữ liệu mẫu sinh viên lưu tạm trong bộ nhớ (In-memory array)
const students = [
    { id: 1, name: "Nguyen Van A", score: 8.5 },
    { id: 2, name: "Tran Thi B", score: 9.0 }
];

// ==========================================
// 1. GET /api/v1/students -> Lấy danh sách sinh viên
// ==========================================
app.get('/api/v1/students', (req, res) => {
    // Sử dụng hàm sendSuccess, không gọi res.json() trực tiếp
    return sendSuccess(res, 200, students, { total: students.length });
});

// ==========================================
// 2. GET /api/v1/students/:id -> Lấy chi tiết sinh viên theo ID
// ==========================================
app.get('/api/v1/students/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(s => s.id === studentId);

    // Nếu không tìm thấy, sử dụng hàm sendError trả về 404 chuẩn
    if (!student) {
        return sendError(res, 404, "STUDENT_NOT_FOUND", "Không tìm thấy sinh viên");
    }

    // Nếu tìm thấy, trả về dữ liệu thành công
    return sendSuccess(res, 200, student);
});

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Standardized Response API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});