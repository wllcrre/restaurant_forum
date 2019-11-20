const db = require('../models')
const Category = db.Category

const categoryService = {

  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {

      if (req.params.id) {
        return Category.findByPk(req.params.id).then(category => {
          callback({ categories: categories, category: category })
        })
      } else {
        callback({ categories: categories })
      }
    })
  },

  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: "error", message: "name didn\'t exist" })
    } else {
      return Category.create({
        name: req.body.name
      }).then(() => {
        callback({ status: "success", message: "category was successfully created" })
      })
    }
  },

  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: "error", message: "name didn\'t exist" })
    } else {
      return Category.findByPk(req.params.id).then((category) => {
        category.update({
          name: req.body.name
        })
      }).then(() => {
        callback({ status: "success", message: "category was successfully modified" })
      })
    }
  },

  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then((category) => {
      category.destroy()
    }).then(() => {
      callback({ status: "success", message: "category was successfully delete" })
    })
  },

}


module.exports = categoryService