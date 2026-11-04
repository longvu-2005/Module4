const express = require('express');
const router = express.Router();
const users = require('../../data/users');

// GET /api/v2/users -> Trả về cấu trúc v2 { id, firstName, lastName, email }
router.get('/', (req, res) => {
    // Tự động chuyển đổi từ dữ liệu dùng chung (tách name thành firstName và lastName)
    const v2Users = users.map(user => {
        const nameParts = user.name.trim().split(' ');
        const lastName = nameParts.pop() || ""; // Lấy từ cuối làm lastName
        const firstName = nameParts.join(' ') || ""; // Phần còn lại là firstName

        return {
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            email: user.email
        };
    });

    res.status(200).json({
        success: true,
        version: "v2",
        data: v2Users
    });
});

// GET /api/v2/users/:id -> Lấy chi tiết theo ID (v2)
router.get('/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "Không tìm thấy user" });
    }

    const nameParts = user.name.trim().split(' ');
    const lastName = nameParts.pop() || "";
    const firstName = nameParts.join(' ') || "";

    res.status(200).json({
        success: true,
        version: "v2",
        data: {
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            email: user.email
        }
    });
});

module.exports = router;