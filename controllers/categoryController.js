const db = require('../models')
const Category = db.Category
const adminService = require('../services/adminService.js')

const categoryController = {

  getCategories: (req, res) => {
    return Category.findAll().then(categories => {

      if (req.params.id) {
        return Category.findByPk(req.params.id).then(category => {
          return res.render('admin/categories', { categories: categories, category: category })
        })
      } else {
        return res.render('admin/categories', { categories: categories })
      }
    })
  },

  postCategory: (req, res) => {
    adminService.postCategory(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        res.redirect('/admin/categories')
      }
    })
  },

  putCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      return Category.findByPk(req.params.id).then((category) => {
        category.update({
          name: req.body.name
        })
      }).then(() => {
        return res.redirect('/admin/categories')
      })
    }
  },

  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id).then((category) => {
      category.destroy()
    }).then(() => {
      return res.redirect('/admin/categories')
    })
  }

}

module.exports = categoryController