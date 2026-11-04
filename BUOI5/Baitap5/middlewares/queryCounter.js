/**
 * Middleware đo đếm số câu lệnh SQL Sequelize sinh ra và thời gian xử lý (durationMs)
 */
const queryCounter = (req, res, next) => {
    let queryCount = 0;
    const startTime = process.hrtime();

    // Lắng nghe sự kiện logging của Sequelize instance gắn qua req.app
    const sequelizeInstance = req.app.get('sequelizeInstance');
    
    if (sequelizeInstance) {
        // Tạm thời ghi đè hoặc lắng nghe hook logging
        sequelizeInstance.options.logging = (sql) => {
            queryCount++;
        };
    }

    // Intercept phương thức res.json để tự động nhúng thông tin vào khối meta trước khi gửi về client
    const originalJson = res.json;
    res.json = function (body) {
        const diff = process.hrtime(startTime);
        const durationMs = diff[0] * 1000 + diff[1] / 1e6; // Đổi sang mili-giây

        // Nếu response có cấu trúc chuẩn thành công, tự động bổ sung/cập nhật khối meta
        if (body && body.success === true) {
            body.meta = {
                ...(body.meta || {}),
                queryCount: queryCount,
                durationMs: Math.round(durationMs * 100) / 100 // Làm tròn 2 chữ số thập phân
            };
        }

        return originalJson.call(this, body);
    };

    next();
};

module.exports = queryCounter;