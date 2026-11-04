const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Đảm bảo thư mục 'uploads/' tồn tại (nếu chưa có thì tự động tạo)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Cấu hình Storage (Lưu trữ và đổi tên file tránh trùng lặp, ký tự đặc biệt)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Đặt tên theo timestamp + tên gốc (đã loại bỏ khoảng trắng nếu cần, hoặc dùng chuẩn yêu cầu)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        // Tên file: Date.now() + '-' + originalname (hoặc kết hợp suffix cho an toàn tuyệt đối)
        const safeFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, safeFilename);
    }
});

// 2. Cấu hình fileFilter (Chỉ chấp nhận image/jpeg, image/png, image/webp)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Chấp nhận file
    } else {
        // Từ chối file và trả về lỗi custom
        cb(new Error('INVALID_FILE_TYPE'), false);
    }
};

// 3. Khởi tạo middleware Multer với giới hạn 2MB và các cấu hình trên
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 2 * 1024 * 1024 // Giới hạn tối đa 2MB
    },
    fileFilter: fileFilter
}).single('avatar'); // Nhận đúng 1 file qua field 'avatar'

// 4. Định nghĩa Route POST /upload/avatar
app.post('/upload/avatar', (req, res) => {
    upload(req, res, (err) => {
        // Xử lý các lỗi phát sinh từ Multer (hoặc fileFilter)
        if (err instanceof multer.MulterError) {
            // Lỗi do Multer quy định (ví dụ: vượt quá fileSize limit)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    message: "File vượt quá dung lượng cho phép (2MB)" 
                });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // Lỗi do fileFilter (sai định dạng MIME type)
            if (err.message === 'INVALID_FILE_TYPE') {
                return res.status(400).json({ 
                    message: "Chỉ chấp nhận file ảnh JPEG/PNG/WEBP" 
                });
            }
            return res.status(400).json({ message: err.message });
        }

        // Kiểm tra xem người dùng có gửi file lên hay không
        if (!req.file) {
            return res.status(400).json({ message: "Vui lòng chọn một file ảnh để tải lên" });
        }

        // 5. Response thành công khi file hợp lệ
        res.status(200).json({
            message: "Upload thành công",
            filename: req.file.filename,
            size: req.file.size
        });
    });
});

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Multer Upload API is running..." });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});