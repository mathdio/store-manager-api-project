const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getById);

router.post('/', salesController.createSales);

module.exports = router;