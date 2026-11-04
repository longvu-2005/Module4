const express = require('express');
const router = express.Router();

// Mảng dữ liệu mẫu lưu tạm trong bộ nhớ (In-memory array)
let students = [
    { id: 1, name: 'Vũ Văn Gia Long', score: 9.5 },
    { id: 2, name: 'Nguyễn Văn A', score: 8.0 }
];

let nextId = 3; // Biến quản lý id tự tăng

// 1. GET /api/students -> Lấy toàn bộ danh sách sinh viên
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// 2. GET /api/students/:id -> Lấy thông tin sinh viên theo id
router.get('/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Không tìm thấy sinh viên"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// 3. POST /api/students -> Thêm sinh viên mới
router.post('/', (req, res) => {
    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({
            message: "Vui lòng cung cấp đầy đủ thông tin: name và score"
        });
    }

    const newStudent = {
        id: nextId++,
        name: name,
        score: Number(score)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Thêm sinh viên thành công",
        data: newStudent
    });
});

// 4. DELETE /api/students/:id -> Xóa sinh viên theo id
router.delete('/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const index = students.findIndex(s => s.id === studentId);

    // Nếu id không tồn tại trong mảng -> trả về 404 kèm message yêu cầu
    if (index === -1) {
        return res.status(404).json({
            message: "Không tìm thấy sinh viên"
        });
    }

    // Xóa sinh viên khỏi mảng và lưu lại phần tử vừa xóa
    const deletedStudent = students.splice(index, 1)[0];

    // Trả về 200 kèm dữ liệu vừa xóa nếu thành công
    res.status(200).json({
        success: true,
        message: "Xóa sinh viên thành công",
        data: deletedStudent
    });
});

module.exports = router;