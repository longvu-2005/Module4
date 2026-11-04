const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Tên tài khoản là bắt buộc'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: [6, 'Mật khẩu tối thiểu 6 ký tự']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER' // Thiết lập giá trị mặc định là 'USER'
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

// Mongoose Pre-save Hook: Tự động mã hóa mật khẩu trước khi lưu vào database (Chống lưu Plain Text)
userSchema.pre('save', async function (next) {
    // Chỉ mã hóa lại mật khẩu nếu trường password được tạo mới hoặc bị thay đổi
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;