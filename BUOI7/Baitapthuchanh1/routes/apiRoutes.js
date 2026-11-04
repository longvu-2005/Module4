const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const sampleMiddleware = require('../middlewares/authMiddleware');

// Định nghĩa route áp dụng middleware và gọi controller tương ứng
router.get('/examples', sampleMiddleware, exampleController.getExamples);

module.exports = router;