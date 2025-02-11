const express = require('express');
const addressesController = require('../controllers/AddressesController');

const router = express.Router();

router.post('/:client_id', addressesController.store);
router.get('/:client_id', addressesController.show);
router.delete('/:client_id/:address_id', addressesController.delete);

module.exports = router;

