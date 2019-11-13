const express = require('express');
const router = express.Router();

const adminController = require('../controllers/apis/adminController')
const categoryController = require('../controllers/apis/categoryController')

// 引入 multer 並設定上傳資料夾 
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


router.get('/admin/categories', categoryController.getCategories)


router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurants/:id', adminController.getRestaurant)
router.post('/admin/restaurants', upload.single('image'), adminController.postRestaurant)
router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)
module.exports = router
