const Houseplant = require('../models/houseplant')
const responseBuilder = require('../lib/responseBuilder')

// INDEX handler
function indexRoute(req,res){
  Houseplant
    .find(req.query)
    .populate('createdBy')
    .then(plant => plant ? responseBuilder(res, 200, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 422, err))
}

// CREATE handler
function createRoute(req,res){
  console.log('Begin CREATE logic')
  Houseplant
    .create(req.body)
    .then(plant => responseBuilder(res, 201, plant))
    .catch(err => responseBuilder(res, 422, err))
}

// SHOW handler
function showRoute(req,res){
  console.log('Begin SHOW logic')
  Houseplant
    .findById(req.params.id)
    .populate('createdBy')
    .populate('comments.createdBy')
    .populate('watchingUsers.user')
    .then(plant => plant ? responseBuilder(res, 200, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 422, err))
}

// EDIT handler
function editRoute(req,res){
  console.log('Begin EDIT logic')
  Houseplant
    .findById(req.params.id)
    .then(plant => {
      if(!plant) return false
      Object.assign(plant, req.body)
      return plant.save()
    })
    .then(plant => plant ? responseBuilder(res, 202, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 422, err))
}

// DELETE handler
function deleteRoute(req,res){
  console.log('Begin DELETE logic')
  Houseplant
    .findByIdAndRemove(req.params.id)
    .then(plant => plant ? responseBuilder(res, 204, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 422, err))
}


// LIKE PLANT ROUTE
function likePlantRoute(req,res){
  console.log('Begin LIKE PLANT logic')
  Houseplant
    .findById(req.params.id)
    .then(plant => {
      if(!plant) return false
      const comment = plant.comments.id(req.params.commentId)
      console.log(comment)
      comment.likes = comment.likes ? comment.likes+1 : 1
      return plant.save()
    })
    .then(plant => plant ? responseBuilder(res, 202, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 404, err))
}

// WATCH PLANT ROUTE
function watchPlantRoute(req,res){
  console.log('Begin WATCH PLANT logic')
  Houseplant
    .findById(req.params.id)
    .populate('createdBy')
    .populate('comments.createdBy')
    .populate('watchingUsers.user')
    .then(plant => {
      if(!plant) return false
      const alreadyWatching = plant.watchingUsers.some(user => user.user.equals(req.currentUser))
      alreadyWatching ?
        plant.watchingUsers = plant.watchingUsers.filter(user => !user.user.equals(req.currentUser)) :
        plant.watchingUsers.push({ user: req.currentUser })
      return plant.save()
    })
    .then(plant => plant ? responseBuilder(res, 202, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 404, err))
}

// LIKE COMMENT ROUTE
function likeCommentRoute(req,res){
  console.log('Begin LIKE COMMENT logic')
  Houseplant
    .findById(req.params.id)
    .populate('createdBy')
    .populate('comments.createdBy')
    .then(plant => {
      if(!plant) return false
      const comment = plant.comments.id(req.params.commentId)
      const alreadyLiked = comment.likes.some(like => like.user.equals(req.currentUser))

      //if the requestor already liked the comment, unlike it, if not, like it
      alreadyLiked ?
        comment.likes = comment.likes.filter(like => !like.user.equals(req.currentUser)) :
        comment.likes.push({ user: req.currentUser })

      return plant.save()
    })
    .then(plant => {
      console.log(plant)
      return plant ? responseBuilder(res, 202, plant) : responseBuilder(res, 404)
    })
    .catch(err => responseBuilder(res, 404, err))
}


// CREATE COMMENT ROUTE
function createCommentRoute(req,res){
  console.log('Begin CREATE COMMENT logic')
  Houseplant
    .findById(req.params.id)
    .then(plant => {
      if(!plant) return false
      const comment = req.body
      comment.createdBy = req.currentUser
      plant.comments.push(comment)
      return plant.save()
    })
    .then(plant => {
      if(!plant) return false
      return Houseplant.findById(req.params.id)
        .populate('createdBy')
        .populate('comments.createdBy')
        .populate('watchingUsers.user')
    })
    .then(plant => plant ? responseBuilder(res, 201, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 422, err))
}


// DELETE COMMENT ROUTE
function deleteCommentRoute(req,res){
  console.log('Begin DELETE COMMENT logic')
  Houseplant
    .findById(req.params.id)
    .populate('createdBy')
    .populate('comments.createdBy')
    .populate('watchingUsers.user')
    .then(plant => {
      if(!plant) return false
      const comment = plant.comments.id(req.params.commentId)
      comment.remove()
      return plant.save()
    })
    .then(plant => plant ? responseBuilder(res, 202, plant) : responseBuilder(res, 404))
    .catch(err => responseBuilder(res, 404, err))
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  delete: deleteRoute,
  watchPlant: watchPlantRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  likeComment: likeCommentRoute
}
