const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductField = require('../middlewares/validateNewProductField');

const router = express.Router();

router.get('/search', productsController.getByName);

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getById);

router.post('/', validateNewProductField, productsController.createProduct);

router.put('/:id', validateNewProductField, productsController.editProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;