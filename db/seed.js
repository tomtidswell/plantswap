const mongoose = require('mongoose')
const {dbURI} = require('../config/environment')
const Houseplant = require('../models/houseplant')
const User = require('../models/user')
const {plantData, userData} = require('./seedData')

mongoose.connect(dbURI, {useNewUrlParser: true}, (err,db)=>{
  // connection error handling, or confirm connection
  if(err) return console.log(`There is an error in connecting: ${err}`)
  else console.log(`Connected to ${db.name} for seeding`)

  //clear the database, then do all the follow on actions sequentially
  db.dropDatabase()
    .then(() => console.log('Database clear complete'))

    //add the users
    .then(() => User.create(userData))
    // confirm the users, and enhance the plant data and comments with the first user
    .then(users => {
      console.log(`Added ${users.length} users into the database`)
      return plantData.map((plant,pIndex) => {
        plant.comments = plant.comments.map((comment,cIndex) => {
          //set the user to always be index 0 unless it is the first comment
          return {...comment, createdBy: users[cIndex === 0 ? 1 : 0 ]}
        })
        return {...plant, createdBy: users[pIndex === 1 ? 1 : 0 ]}
      })
    })
    //add the houseplants
    .then(enhancedPlantData => Houseplant.create(enhancedPlantData))
    .then(plants => console.log(`Added ${plants.length} plants into the database`))

    //finally close the database connection
    .finally(() => {
      console.log('Connection closed')
      mongoose.connection.close()
    })
    .catch(err => console.log(err.message))
})


// {
//   "name": "Ivy Winters",
//   "scientificName": "Hedera helix",
//   "killRating": 1,
//   "waterFrequency": "Weekly",
//   "advice": "Ivy Winters lives on the balcony and manages to feed and water herself. She's got a mind of her own and tries to escape the balcony at any opportunity using her long tendrils"
// }

// {
// 	"username": "tommykins2",
// 	"email": "tom2@email",
// 	"password": "pass123",
// 	"passwordConfirmation": "pass123",
// 	"passwordReminder": "Short with a 123"
// }
