const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AppError = require('../utils/AppError');

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình storage lưu trữ và đổi tên file tránh trùng lặp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const safeFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, safeFilename);
    }
});

// Chỉ chấp nhận các loại file ảnh (image/*)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new AppError('Chỉ chấp nhận file định dạng hình ảnh (image/*)', 400), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn tối đa 2MB
    fileFilter: fileFilter
});

module.exports = upload;