const express = require('express');
const authenticationController = require('../controllers/AuthenticationController');

const router = express.Router();

router.post('/clients', authenticationController.clientLogin);


module.exports = router;
