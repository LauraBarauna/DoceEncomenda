const express = require('express');
const clientController = require('../controllers/ClientController');
const middlewares = require('../middlewares/AllMiddlerares');

const router = express.Router();

// Route to create a client
router.post('/', clientController.store);
router.get('/', clientController.index);
router.get('/show', middlewares.authenticateClient, clientController.show);
router.put('/update', middlewares.authenticateClient, clientController.update);
router.delete('/delete', middlewares.authenticateClient, clientController.delete);

module.exports = router;
