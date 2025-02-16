const express = require('express');
const ordersController = require('../controllers/OrdersController');
const middlewares = require('../middlewares/AllMiddlerares');


const router = express.Router();

router.post('/create', middlewares.authenticateClient, ordersController.store);
router.get('/:order_id', middlewares.authenticateClient, ordersController.show);

module.exports = router;

