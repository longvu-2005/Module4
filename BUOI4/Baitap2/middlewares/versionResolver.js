// Middleware xác định version của API qua header Api-Version
const versionResolver = (req, res, next) => {
    // Lấy giá trị header 'api-version', nếu không truyền thì mặc định là 'v1'
    const version = req.headers['api-version'] || 'v1';
    req.apiVersion = version.trim().toLowerCase();
    next();
};

module.exports = versionResolver;