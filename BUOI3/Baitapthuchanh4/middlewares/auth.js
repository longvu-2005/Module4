// Middleware checkAuth kiểm tra header Authorization
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Nếu không có header Authorization -> trả về 401 và KHÔNG gọi next()
    if (!authHeader) {
        return res.status(401).json({
            message: "Thiếu token xác thực"
        });
    }

    // Nếu có header Authorization -> gọi next() để đi tiếp vào handler
    next();
};

module.exports = checkAuth;