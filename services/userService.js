const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User
const Comment = db.Comment
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship
const Restaurant = db.Restaurant

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const userService = {

  getUser: (req, res, callback) => {
    return User.findByPk(req.params.id, {
      include:
        [
          {
            model: Comment,
            include: [Restaurant]
          },
          {
            model: Restaurant,
            as: "FavoritedRestaurants"
          },
          {
            model: User,
            as: "Followers"
          },
          {
            model: User,
            as: "Followings"
          }

        ]
    }).then(user => {
      callback({
        user: user
      })
    })
  },


  putUsers: (req, res, callback) => {
    let uid = Number(req.params.id)

    if (uid !== req.user.id) {
      callback({ status: "error", message: "you can not edit other profile" })
    }

    if (!req.body.name) {
      callback({ status: "error", message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      console.log('file exits heree')
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        console.log('heree imgLink:' + img.data.link)

        return User.findByPk(req.params.id)
          .then((user) => {
            user.update({
              name: req.body.name,
              image: file ? img.data.link : user.image,
            })
              .then((user) => {
                callback({ status: "success", message: "user was successfully to update" })
              })
          })
      })
    }
    else {
      console.log('file not exist heree')
      return User.findByPk(req.params.id)
        .then((user) => {
          user.update({
            name: req.body.name,
            image: user.image
          })
            .then((user) => {
              callback({ status: "success", message: "user was successfully updated" })
            })
        })
    }
  },

  addFavorite: (req, res, callback) => {
    return Favorite.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        callback({ status: "success", message: "Add Favorite successfully" })
      })
  },

  removeFavorite: (req, res, callback) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((favorite) => {
        favorite.destroy()
          .then((restaurant) => {
            callback({ status: "success", message: "remove Favorite successfully" })
          })
      })
  },

  addLike: (req, res, callback) => {
    return Like.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        callback({ status: "success", message: "Add Like successfully" })
      })
  },

  removeLike: (req, res, callback) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((like) => {
        like.destroy()
          .then((restaurant) => {
            callback({ status: "success", message: "Remove Like successfully" })
          })
      })
  },

  getTopUser: (req, res, callback) => {
    // 撈出所有 User 與 followers 資料
    return User.findAll({
      include: [
        { model: User, as: 'Followers' }
      ]
    }).then(users => {
      // 整理 users 資料
      users = users.map(user => ({
        ...user.dataValues,
        // 計算追蹤者人數
        FollowerCount: user.Followers.length,
        // 判斷目前登入使用者是否已追蹤該 User 物件
        isFollowed: req.user.Followings.map(d => d.id).includes(user.id)
      }))
      // 依追蹤者人數排序清單
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)

      callback({ users: users })
    })
  },


  addFollowing: (req, res, callback) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: req.params.userId
    })
      .then((followship) => {
        callback({ status: "success", message: "Add Following successfully" })
      })
  },

  removeFollowing: (req, res, callback) => {
    return Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then((followship) => {
        followship.destroy()
          .then((followship) => {
            callback({ status: "success", message: "Remove Following successfully" })
          })
      })
  }

}

module.exports = userService