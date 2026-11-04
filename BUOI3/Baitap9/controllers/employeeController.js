const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');

const employeeController = {
    // GET /api/employees
    getEmployees(req, res, next) {
        try {
            const employees = Employee.getAll();
            res.status(200).json({
                success: true,
                count: employees.length,
                data: employees
            });
        } catch (error) {
            next(error);
        }
    },

    // GET /api/employees/:id
    getEmployeeById(req, res, next) {
        try {
            const employee = Employee.findById(req.params.id);
            if (!employee) {
                return next(new AppError('Không tìm thấy nhân viên', 404));
            }
            res.status(200).json({
                success: true,
                data: employee
            });
        } catch (error) {
            next(error);
        }
    },

    // POST /api/employees
    createEmployee(req, res, next) {
        try {
            const { name, email } = req.body;

            // Validate bắt buộc name và email
            if (!name || !email) {
                return next(new AppError('Thiếu trường bắt buộc: name hoặc email', 400));
            }

            // Kiểm tra email đã tồn tại hay chưa
            const existingEmployee = Employee.findByEmail(email);
            if (existingEmployee) {
                return res.status(409).json({ message: "Email đã tồn tại" });
            }

            const newEmployee = Employee.create({ name, email });
            res.status(201).json({
                success: true,
                message: 'Thêm nhân viên thành công',
                data: newEmployee
            });
        } catch (error) {
            next(error);
        }
    },

    // POST /api/employees/:id/avatar
    uploadAvatar(req, res, next) {
        try {
            const employeeId = req.params.id;
            const employee = Employee.findById(employeeId);

            if (!employee) {
                return next(new AppError('Không tìm thấy nhân viên', 404));
            }

            if (!req.file) {
                return next(new AppError('Vui lòng chọn một file ảnh đại diện', 400));
            }

            // Đường dẫn lưu ảnh (hoặc URL public)
            const avatarUrl = `/uploads/${req.file.filename}`;
            Employee.updateAvatar(employeeId, avatarUrl);

            res.status(200).json({
                success: true,
                message: 'Upload avatar thành công',
                avatarUrl: avatarUrl
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = employeeController;