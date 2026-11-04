const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON cho request body (dùng cho phương thức PUT)
app.use(express.json());

// Mảng dữ liệu mẫu lưu tạm trong bộ nhớ (In-memory array)
let tasks = [
    { id: 1, title: 'Học Express.js cơ bản', completed: false },
    { id: 2, title: 'Làm bài tập Route Chaining', completed: true }
];

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Task API with Route Chaining is running..." });
});

// Lấy danh sách toàn bộ tasks (hỗ trợ kiểm tra dễ dàng)
app.get('/tasks', (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
});

// ==========================================
// ROUTE CHAINING VỚI app.route('/tasks/:id')
// ==========================================
app.route('/tasks/:id')
    // 1. GET: Lấy chi tiết task theo id
    .get((req, res) => {
        const taskId = Number(req.params.id);
        const task = tasks.find(t => t.id === taskId);

        // Nếu id không tồn tại -> trả về 404
        if (!task) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy task với ID: ${taskId}`
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    })

    // 2. PUT: Cập nhật task theo id
    .put((req, res) => {
        const taskId = Number(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        // Nếu id không tồn tại -> trả về 404
        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy task với ID: ${taskId}`
            });
        }

        const { title, completed } = req.body;

        // Cập nhật thông tin (giữ lại giá trị cũ nếu không truyền field mới)
        tasks[taskIndex] = {
            id: taskId,
            title: title !== undefined ? title : tasks[taskIndex].title,
            completed: completed !== undefined ? completed : tasks[taskIndex].completed
        };

        res.status(200).json({
            success: true,
            message: "Cập nhật task thành công",
            data: tasks[taskIndex]
        });
    })

    // 3. DELETE: Xóa task theo id
    .delete((req, res) => {
        const taskId = Number(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        // Nếu id không tồn tại -> trả về 404
        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy task với ID: ${taskId}`
            });
        }

        // Xóa task khỏi mảng
        tasks.splice(taskIndex, 1);

        // Trả về định dạng thông báo theo yêu cầu
        res.status(200).json({
            success: true,
            message: `Đã xóa task ${taskId}`
        });
    });

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});