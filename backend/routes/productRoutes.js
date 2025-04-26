const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllProducts);
router.post('/', protect, createProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
