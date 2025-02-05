const express = require('express');
const clientController = require('../controllers/ClientController');

const router = express.Router();

// Client's routes
router.post('/', clientController.store);

module.exports = router;
