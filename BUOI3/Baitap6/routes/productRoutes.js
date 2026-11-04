const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Khai báo GET / gọi hàm getProducts
router.get('/', productController.getProducts);

// Khai báo POST / gọi hàm createProduct
router.post('/', productController.createProduct);

module.exports = router;