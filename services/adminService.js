const db = require('../models')
const fs = require('fs')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
// Client secret
// f5996ad740af6e93434b3166bf85482c98251933

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      include: [Category]
    }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      callback({ restaurant: restaurant })
    })

  },


  deleteRestaurant: (req, res, callback) => {
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

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: "success", message: "" })
          })
      })
  },

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

}


module.exports = adminService