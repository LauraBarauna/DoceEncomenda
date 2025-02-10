const express = require('express');
const addressesController = require('../controllers/AddressesController');

const router = express.Router();

router.post('/', addressesController.store);

