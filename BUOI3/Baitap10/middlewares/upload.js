const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AppError = require('../utils/AppError');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const safeFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, safeFilename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Chỉ chấp nhận file ảnh JPEG/PNG/WEBP', 400), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
    fileFilter: fileFilter
});

module.exports = upload;