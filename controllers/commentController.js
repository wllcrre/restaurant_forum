const db = require('../models')
const commentService = require('../services/commentService.js')

let commentController = {
  postComment: (req, res) => {
    commentService.postComment(req, res, (data) => {
      res.redirect(`/restaurants/${req.body.restaurantId}`)
    })
  },
  deleteComment: (req, res) => {

    commentService.deleteComment(req, res, (data) => {
      res.redirect(`/restaurants/${data.comment.RestaurantId}`)
    })
  }
}
module.exports = commentController