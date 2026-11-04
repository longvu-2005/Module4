const express = require('express');
const { sendSuccess, sendError } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mảng dữ liệu mẫu users lưu tạm trong bộ nhớ (In-memory array)
let users = [
    { id: 1, name: "Vũ Văn Gia Long", email: "vuvangialong02@gmail.com" },
    { id: 2, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" }
];

let nextId = 3;

// ==========================================
// ROUTE: POST /api/v1/users (Validate & Status Codes)
// ==========================================
app.post('/api/v1/users', (req, res) => {
    const { name, email } = req.body;

    // 1. Trường hợp thiếu name hoặc email -> 400 MISSING_FIELD
    if (!name || !email) {
        return sendError(
            res, 
            400, 
            "MISSING_FIELD", 
            "Thiếu thông tin bắt buộc: name hoặc email"
        );
    }

    // 2. Trường hợp email sai định dạng (kiểm tra ký tự '@' đơn giản) -> 422 VALIDATION_ERROR
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return sendError(
            res, 
            422, 
            "VALIDATION_ERROR", 
            "Định dạng email không hợp lệ"
        );
    }

    // 3. Trường hợp email đã tồn tại trong mảng -> 409 EMAIL_EXISTS
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return sendError(
            res, 
            409, 
            "EMAIL_EXISTS", 
            "Email này đã tồn tại trong hệ thống"
        );
    }

    // 4. Dữ liệu hợp lệ -> 201 Created kèm user vừa tạo
    const newUser = {
        id: nextId++,
        name: name.trim(),
        email: email.trim()
    };

    users.push(newUser);

    return sendSuccess(res, 201, newUser);
});

// Route kiểm tra danh sách users hiện tại
app.get('/api/v1/users', (req, res) => {
    return sendSuccess(res, 200, users, { total: users.length });
});

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Error Status Codes API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});