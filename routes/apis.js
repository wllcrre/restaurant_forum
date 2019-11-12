const express = require('express');
const router = express.Router();

const adminController = require('../controllers/apis/adminController')

router.get('/admin/restaurants', adminController.getRestaurants)

module.exports = router
