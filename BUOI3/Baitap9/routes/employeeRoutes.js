const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const upload = require('../middlewares/upload');
const AppError = require('../utils/AppError');

// Định nghĩa các routes
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);

// Route upload avatar dùng multer middleware bọc xử lý lỗi Multer (giới hạn 2MB, định dạng ảnh)
router.post('/:id/avatar', (req, res, next) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return next(new AppError('File vượt quá dung lượng cho phép (2MB)', 400));
            }
            return next(err);
        }
        next();
    });
}, employeeController.uploadAvatar);

module.exports = router;