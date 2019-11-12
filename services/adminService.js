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
      // return res.render('admin/restaurants', { restaurants: restaurants })
      callback({ restaurants: restaurants })
    })
  }

}

module.exports = adminService