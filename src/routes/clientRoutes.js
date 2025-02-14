const express = require('express');
const clientController = require('../controllers/ClientController');

const router = express.Router();

// Route to create a client
router.post('/', clientController.store);
router.get('/', clientController.index);
router.get('/:client_id', clientController.show);
router.put('/:client_id', clientController.update);
router.delete('/:client_id', clientController.delete);
router.post('/login', clientController.login);

module.exports = router;
