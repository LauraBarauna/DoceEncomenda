const express = require('express');
const addressesController = require('../controllers/AddressesController');
const middlewares = require('../middlewares/AllMiddlerares');

const router = express.Router();

router.post('/register', middlewares.authenticateClient, addressesController.store);
router.get('/show', middlewares.authenticateClient, addressesController.show);
router.delete('/delete/:address_id', middlewares.authenticateClient, addressesController.delete);
router.put('/update/:address_id', middlewares.authenticateClient, addressesController.update);

module.exports = router;

