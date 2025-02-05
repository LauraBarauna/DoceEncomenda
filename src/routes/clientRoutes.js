const express = require('express');
const clientController = require('../controllers/ClientController');

const router = express.Router();

// Rota para criar um cliente
router.post('/', clientController.store);

module.exports = router;
