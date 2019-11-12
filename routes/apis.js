const express = require('express');
const router = express.Router();

const adminController = require('../controllers/apis/adminController')

const categoryController = require('../controllers/apis/categoryController')


router.get('/admin/categories', categoryController.getCategories)


router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurants/:id', adminController.getRestaurant)

module.exports = router
