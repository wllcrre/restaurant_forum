const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => { // 記得這邊要接收 passport

  app.get('/', (req, res) => res.redirect('/restaurants'))
  app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))

  //在 /restaurants 底下則交給 restController.getRestaurants 來處理
  app.get('/restaurants', restController.getRestaurants)

  // 在 /admin/restaurants 底下則交給 adminController.getRestaurants 處理
  app.get('/admin/restaurants', adminController.getRestaurants)


  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)
}