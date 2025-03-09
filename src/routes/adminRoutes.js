const express = require('express');
const adminController = require('../controllers/AdminController');

const router = express.Router();

router.post('/', adminController.store);
router.get('/', adminController.index);


module.exports = router;
