const express = require('express');
const clientController = require('../controllers/ClientController');

const router = express.Router();

// Rota para criar um cliente
router.post('/', clientController.store);
router.get('/', clientController.index);
router.get('/:client_id', clientController.show);
router.update('/:client_id', clientController.update);

module.exports = router;
