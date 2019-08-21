const router = require('express').Router()
const plantController = require('../controllers/houseplants')
const userController = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')

router.route('/plants')
  .get(plantController.index)
  .post(secureRoute, plantController.create)

router.route('/plants/:id')
  .get(plantController.show)
  .put(plantController.edit)
  .delete(secureRoute, plantController.delete)

router.route('/plants/:id/watch')
  .put(secureRoute, plantController.watchPlant)

router.route('/plants/:id/comments')
  .post(secureRoute, plantController.createComment)

router.route('/plants/:id/comments/:commentId')
  .delete(secureRoute, plantController.deleteComment)

router.route('/plants/:id/comments/:commentId/like')
  .put(secureRoute, plantController.likeComment)

router.route('/users')
  .get(secureRoute, userController.userIndex)
  .delete(userController.deleteAccount)
  .post(userController.register)

router.route('/login')
  .post(userController.login)

// router.route('/*')
//   .all((req,res) =>
//     res.status(405).json({message: 'Yer wot? Please dont do that again', image: 'https://httpstatusdogs.com/405'}))

module.exports = router
