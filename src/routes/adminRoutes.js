const express = require('express');
const adminController = require('../controllers/AdminController');
const middlewares = require('../middlewares/AllMiddlerares');


const router = express.Router();

router.post('/', adminController.store);
router.get('/', middlewares.authenticateAdmin, adminController.index);
router.get('/show', middlewares.authenticateAdmin, adminController.show);
router.delete('/', middlewares.authenticateAdmin, adminController.delete);
router.put('/', middlewares.authenticateAdmin, adminController.update);


module.exports = router;
