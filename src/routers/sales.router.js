const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getById);

router.post('/', salesController.createSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;