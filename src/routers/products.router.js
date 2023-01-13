const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductField = require('../middlewares/validateNewProductField');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getById);

router.post('/', validateNewProductField, productsController.createProduct);

module.exports = router;