var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller')

router.get('/dashboard', adminController.viewDashboard)
router.get('/bank', adminController.viewBank)
router.get('/category', adminController.viewCategory)
router.get('/item', adminController.viewItem)
router.get('/booking', adminController.viewBooking)

module.exports = router;
