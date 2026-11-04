const bcrypt = require('bcrypt');

// Lấy số vòng băm (salt rounds) từ biến môi trường, mặc định là 10 nếu không cấu hình
const getSaltRounds = () => {
    const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    return isNaN(rounds) ? 10 : rounds;
};

/**
 * Hàm mã hóa (hash) mật khẩu trước khi lưu vào cơ sở dữ liệu
 * @param {string} plainPassword - Mật khẩu dạng văn bản thuần
 * @returns {Promise<string>} - Chuỗi mật khẩu đã được băm an toàn
 */
const hashPassword = async (plainPassword) => {
    try {
        if (!plainPassword) {
            throw new Error('Mật khẩu không được để trống');
        }
        const saltRounds = getSaltRounds();
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error(`Lỗi mã hóa mật khẩu: ${error.message}`);
    }
};

/**
 * Hàm đối chiếu mật khẩu khi người dùng đăng nhập
 * @param {string} plainPassword - Mật khẩu người dùng nhập vào từ request
 * @param {string} hashedPassword - Mật khẩu đã băm được lưu trữ trong database
 * @returns {Promise<boolean>} - Trả về true nếu khớp, ngược lại false
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        if (!plainPassword || !hashedPassword) {
            return false;
        }
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error(`Lỗi đối chiếu mật khẩu: ${error.message}`);
    }
};

module.exports = {
    hashPassword,
    comparePassword
};