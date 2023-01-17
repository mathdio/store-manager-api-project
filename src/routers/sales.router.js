const express = require('express');
const { salesController } = require('../controllers/index');
const validateSaleFields = require('../middlewares/validateSaleFields');

const router = express.Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getById);

router.post('/', validateSaleFields, salesController.createSale);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', validateSaleFields, salesController.editSale);

module.exports = router;