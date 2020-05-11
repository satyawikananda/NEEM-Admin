var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller')
const { upload } = require('../middleware/multer.js')

router.get('/dashboard', adminController.viewDashboard)
router.get('/bank', adminController.viewBank)
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.updateCategory)
router.delete('/category/:id', adminController.deleteCategory)
router.post('/bank', upload, adminController.addBank)
router.get('/item', adminController.viewItem)
router.get('/booking', adminController.viewBooking)

module.exports = router;
