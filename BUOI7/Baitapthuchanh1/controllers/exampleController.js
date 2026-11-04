// Controller xử lý logic nghiệp vụ cho resource example
const getExamples = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Lấy danh sách thành công từ Controller layer."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: { code: "INTERNAL_SERVER_ERROR", message: "Lỗi hệ thống" }
        });
    }
};

module.exports = {
    getExamples
};