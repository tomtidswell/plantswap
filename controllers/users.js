const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')
const responseBuilder = require('../lib/responseBuilder')

function register(req,res){
  console.log('Begin REGISTER logic')
  User.create(req.body)
    .then(user => responseBuilder(res, 202, user))
    .catch(err => responseBuilder(res, 422, err))
}

function deleteAccount(req,res){
  console.log('Begin DELETE ACCOUNT logic')
  responseBuilder(res, 501)
}

function login(req,res){
  console.log('Begin LOGIN logic')
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password))
        return responseBuilder(res, 401)
      const token = jwt.sign({
        sub: user._id,
        name: user.username,
        email: user.email,
        avatar: user.avatar
      }, secret, { expiresIn: '6h' })
      //console.log('Token:',token)
      responseBuilder(res, 202,{message: `Welcome back ${user.username}`, token })
    })
    .catch(err => responseBuilder(res, 422, err))
}

function userIndex(req,res){
  console.log('Begin UserINDEX logic')
  User.find()
    .then(users => users ? responseBuilder(res, 200, users) : responseBuilder(res, 401))
    .catch(err => responseBuilder(res, 422, err))
}

module.exports = {
  register,
  deleteAccount,
  login,
  userIndex
}
