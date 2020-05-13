const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')
const bankController = require('../controllers/bank.controller')
const categoryController = require('../controllers/category.controller')

const { upload } = require('../middleware/multer.js')

router.get('/dashboard', adminController.viewDashboard)

// Category Routing
router.get('/category', categoryController.viewCategory)
router.post('/category', categoryController.addCategory)
router.put('/category', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)

// Bank Routing
router.get('/bank', bankController.viewBank)
router.post('/bank', upload, bankController.addBank)
router.put('/bank', upload, bankController.updateBank)
router.delete('/bank/:id', upload, bankController.deleteBank)

router.get('/item', adminController.viewItem)
router.get('/booking', adminController.viewBooking)

module.exports = router;
