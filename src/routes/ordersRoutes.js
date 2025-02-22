const express = require('express');
const ordersController = require('../controllers/OrdersController');
const middlewares = require('../middlewares/AllMiddlerares');


const router = express.Router();

router.post('/create', middlewares.authenticateClient, ordersController.store);
router.get('/show/:order_id', middlewares.authenticateClient, ordersController.show);
router.get('/index/', middlewares.authenticateClient, ordersController.index);
router.put('/client/:order_id', middlewares.authenticateClient, ordersController.clientUpdate);
router.delete('/:order_id', middlewares.authenticateClient, ordersController.delete);

module.exports = router;

