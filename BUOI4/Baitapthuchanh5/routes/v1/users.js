const express = require('express');
const router = express.Router();
const users = require('../../data/users');

// GET /api/v1/users -> Trả về cấu trúc v1 { id, name, email }
router.get('/', (req, res) => {
    // v1 giữ nguyên format name gốc từ nguồn dữ liệu
    const v1Users = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
    }));

    res.status(200).json({
        success: true,
        version: "v1",
        data: v1Users
    });
});

// GET /api/v1/users/:id -> Lấy chi tiết theo ID (v1)
router.get('/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "Không tìm thấy user" });
    }

    res.status(200).json({
        success: true,
        version: "v1",
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

module.exports = router;