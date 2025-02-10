const express = require('express');
const addressesController = require('../controllers/AddressesController');

const router = express.Router();

router.post('/:client_id', addressesController.store);

module.exports = router;

