const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // 1. Lấy giá trị từ Header Authorization
        const authHeader = req.headers.authorization;

        // Kiểm tra xem header có tồn tại và bắt đầu bằng tiền tố "Bearer " hay không
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Không tìm thấy token xác thực hoặc sai định dạng Bearer Token"
                }
            });
        }

        // 2. Bóc tách lấy chuỗi token (cắt bỏ phần chữ "Bearer ")
        const token = authHeader.split(' ')[1];

        // 3. Verify token bằng khóa bí mật JWT_ACCESS_SECRET
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // 4. Gắn thông tin payload đã giải mã vào đối tượng req để controller sử dụng tiếp
        req.user = decoded; // Ví dụ: req.user chứa { userId, role, iat, exp }

        // 5. Chuyển giao quyền xử lý sang middleware hoặc controller tiếp theo
        next();
    } catch (error) {
        // Xử lý các trường hợp lỗi từ jwt.verify (Token hết hạn, sai chữ ký, giả mạo...)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: {
                    code: "TOKEN_EXPIRED",
                    message: "Token xác thực đã hết hạn. Vui lòng đăng nhập lại."
                }
            });
        }

        return res.status(401).json({
            success: false,
            error: {
                code: "INVALID_TOKEN",
                message: "Token xác thực không hợp lệ."
            }
        });
    }
};

module.exports = authMiddleware;