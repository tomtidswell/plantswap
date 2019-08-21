const mongoose = require('mongoose')

// created by here is a reference model
// comments are embedded
const likeWatchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: [ likeWatchSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true })


const houseplantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  scientificName: { type: String, required: true },
  location: { type: String, required: true },
  picture: { type: String },
  easeOfCare: { type: Number, required: true, min: 0, max: 5 },
  waterFrequency: { type: String, required: true },
  advice: { type: String, required: true },
  watchingUsers: [ likeWatchSchema ],
  comments: [ commentSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{ timestamps: true })


// adds a field into the interface which is not stored in the database, but is based on the database data
commentSchema
  .virtual('likeCount')
  .get(function(){
    return this.likes.length
  })
houseplantSchema
  .virtual('watching')
  .get(function(){
    return this.watchingUsers.length
  })

//this allows the above virtual field to be calculated and included
commentSchema.set('toJSON',{ virtuals: true })
houseplantSchema.set('toJSON',{ virtuals: true })


houseplantSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Houseplant', houseplantSchema)
