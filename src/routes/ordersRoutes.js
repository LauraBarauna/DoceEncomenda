const express = require('express');
const ordersController = require('../controllers/OrdersController');

const router = express.Router();

router.post('/:client_id', ordersController.store);

module.exports = router;

