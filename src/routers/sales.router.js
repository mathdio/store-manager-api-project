const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.post('/', salesController.createSales);

router.get('/', salesController.getSales);

// router.get('/', salesController.getById);

module.exports = router;