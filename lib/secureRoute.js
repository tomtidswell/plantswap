const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')
const User = require('../models/user')

function secureRoute(req,res,next){
  if(!req.headers.authorization) return res.status(401).json({message: 'Unauthorised'})
  const token = req.headers.authorization.replace('Bearer ', '')
  //console.log('Token:',token)

  new Promise((resolve,reject) =>
    jwt.verify(token, secret, (err, tokenPayload) => err ? reject(err) : resolve(tokenPayload))
  )
    .then(tokenPayload => {
      //console.log('Token payload',tokenPayload)
      return User.findById(tokenPayload.sub)
    })
    // check that the user exists and if they do, continue, if not, issue an unauthorised exception
    .then(user => {
      //console.log('user:',user)
      if(!user) return res.status(401).json({message: 'Unauthorised'})
      //console.log('user:',user._id, user.username)
      //place the current user into the request so we can access it later in the controller
      req.currentUser = user._id
      //req.currentUsername = user.username
      next()
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({message: 'Unauthorised'})
    })
}

module.exports = secureRoute
