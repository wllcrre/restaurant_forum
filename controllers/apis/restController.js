const db = require('../../models')
const Restaurant = db.Restaurant
const restService = require('../../services/restService.js')

const Category = db.Category
const Comment = db.Comment
const Favorite = db.Favorite
const User = db.User

let restController = {
  getRestaurants: (req, res) => {
    restService.getRestaurants(req, res, (data) => {
      return res.render('restaurants', data)
    })
  },


  //please ref getTopUsers:
  getTopRestaurants: (req, res) => {
    restService.getTopRestaurants(req, res, (data) => {
      return res.render('topRestaurants', data)
    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' },
        {
          model: Comment,
          include: [User]
        }
      ]
    }).then(restaurant => {
      let viewCounts = restaurant.viewCounts || 0
      viewCounts = viewCounts + 1

      restaurant.update({ viewCounts: viewCounts }).then((restaurant) => {
        const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
        const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
        return res.render('restaurant', { restaurant: restaurant, isFavorited: isFavorited, isLiked: isLiked })
      })
    })
  },

  getDashboard: (req, res) => {

    let whereQuery = {}
    whereQuery['RestaurantId'] = req.params.id

    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' }
      ]
    })
      .then(restaurant => {
        Comment.findAndCountAll({ where: whereQuery })
          .then(comment => {
            return res.render('dashboard', {
              comments_count: comment.count,
              restaurant: restaurant
            })
          })
      })
  },

  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
    })
  }
}
module.exports = restController