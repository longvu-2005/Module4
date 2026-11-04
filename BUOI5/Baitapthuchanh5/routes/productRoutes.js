const express = require('express');
const router = express.Router();
const categoryProductController = require('../controllers/categoryProductController');

router.get('/', categoryProductController.getAllProducts);

module.exports = router;