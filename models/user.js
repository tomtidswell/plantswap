const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  password: { type: String, required: true },
  passwordReminder: { type: String, required: true }
}, { timestamps: true })

userSchema.plugin(require('mongoose-unique-validator'))

//within the schema, define password confirmation as a virtual field which we can then use to validate, but aviod saving
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

//now, prior to saving, check the password confirmation against the password
userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password)
    this.invalidate('passwordConfirmation', 'does not match')
  next()
})

//if the password is changed, make sure it is salted
userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password'))
    //salt the password 8 times for security if it has been modified - then move on to the next event
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  next()
})

//add a custom function to allow the controller to call it
userSchema.methods.validatePassword = function validatePassword(password){
  console.log('Validating password:', password, this.password)
  return bcrypt.compareSync(password, this.password)
}

// This command will intercept the transform of the userSchema object (the document) into JSON format. here, we're saying that when we transform the object into JSON, we should remove (delete) the two fields from it so they arent sent back
userSchema.set('toJSON', {
  transform(doc, json){
    delete json.password
    delete json.passwordReminder
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('User', userSchema)
