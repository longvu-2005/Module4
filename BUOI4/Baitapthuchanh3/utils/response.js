/**
 * Gửi response thành công
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
 * Gửi response lỗi chuẩn cấu trúc
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