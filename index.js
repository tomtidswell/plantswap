// all the requires needed for the API
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { port, dbURI } = require('./config/environment')
const router = require('./config/router')
const bodyParser = require('body-parser')
const {logRequests} = require('./lib/logger')

// connect to the database
mongoose.connect(dbURI, {useNewUrlParser: true},(err,db)=> console.log(`Connected to ${db.name}`))

//
app.use(express.static(`${__dirname}/dist`))

// register the bodyparser
app.use(bodyParser.json())

// enhanced error messaging
app.use(logRequests)

// implement the routing
app.use('/api', router)


app.get('/*', (req,res) => res.sendFile(`${__dirname}/dist/index.html`))

// listen to the appropriate port
app.listen(port,()=>console.log(`Listening on port ${port}`))
