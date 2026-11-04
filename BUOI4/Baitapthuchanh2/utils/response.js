/**
 * Hàm gửi response thành công theo cấu trúc chuẩn
 * @param {Object} res - Express response object
 * @param {Number} status - HTTP status code (ví dụ: 200, 201)
 * @param {Array|Object} data - Dữ liệu trả về
 * @param {Object} [meta] - Thông tin bổ sung (ví dụ: { total })
 */
const sendSuccess = (res, status, data, meta = null) => {
    const responsePayload = {
        success: true,
        data: data
    };

    if (meta) {
        responsePayload.meta = meta;
    }

    return res.status(status).json(responsePayload);
};

/**
 * Hàm gửi response lỗi theo cấu trúc chuẩn
 * @param {Object} res - Express response object
 * @param {Number} status - HTTP status code (ví dụ: 400, 404, 500)
 * @param {String} code - Mã lỗi định danh (ví dụ: STUDENT_NOT_FOUND)
 * @param {String} message - Thông điệp lỗi chi tiết
 */
const sendError = (res, status, code, message) => {
    return res.status(status).json({
        success: false,
        error: {
            code: code,
            message: message,
            status: status
        }
    });
};

module.exports = {
    sendSuccess,
    sendError
};