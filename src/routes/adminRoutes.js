const express = require('express');
const adminController = require('../controllers/AdminController');
const middlewares = require('../middlewares/AllMiddlerares');


const router = express.Router();

router.post('/', adminController.store);
router.get('/', middlewares.authenticateAdmin, adminController.index);


module.exports = router;
