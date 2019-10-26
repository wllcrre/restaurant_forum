const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
let restController = {
  getRestaurants: (req, res) => {
    let whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }

    Restaurant.findAll({ include: Category, where: whereQuery }).then(restaurants => {
      const data = restaurants.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50)
      }))

      Category.findAll().then(categories => { // 取出 categoies 
        return res.render('restaurants', {
          restaurants: data,
          categories: categories,
          categoryId: categoryId
        })
      })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      return res.render('restaurant', {
        restaurant: restaurant
      })
    })
  }
}
module.exports = restController