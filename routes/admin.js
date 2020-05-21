const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller')
const bankController = require('../controllers/bank.controller')
const categoryController = require('../controllers/category.controller')
const itemController = require('../controllers/item.controller')
const bookingController = require('../controllers/booking.controller')

const { uploadSingle, uploadMulti } = require('../middleware/multer.js')

// Dashboard Routing
router.get('/dashboard', dashboardController.viewDashboard)

// Category Routing
router.get('/category', categoryController.viewCategory)
router.post('/category', categoryController.addCategory)
router.put('/category', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)

// Bank Routing
router.get('/bank', bankController.viewBank)
router.post('/bank', uploadSingle, bankController.addBank)
router.put('/bank', uploadSingle, bankController.updateBank)
router.delete('/bank/:id', uploadSingle, bankController.deleteBank)

// Item Routing
router.get('/item', itemController.viewItem)
router.get('/item/show-image/:id', itemController.showImageItem)
router.post('/item', uploadMulti, itemController.addItem)

// Booking Routing
router.get('/booking', bookingController.viewBooking)

module.exports = router;
