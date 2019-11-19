const express = require('express');
const router = express.Router();
const passport = require('../config/passport')

const adminController = require('../controllers/apis/adminController')
const categoryController = require('../controllers/apis/categoryController')
const userController = require('../controllers/apis/userController.js')

// 引入 multer 並設定上傳資料夾 
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) { return next() }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}


// JWT signin
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)


router.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
router.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)
router.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)
router.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)


router.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
router.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
router.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
router.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)


module.exports = router
