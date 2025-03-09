const express = require('express');
const authenticationController = require('../controllers/AuthenticationController');

const router = express.Router();

router.post('/clients', authenticationController.clientLogin);
router.post('/admins', authenticationController.adminLogin);


module.exports = router;
