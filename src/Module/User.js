var mongoose = require("mongoose")
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    min: 6,
    required: true
  },
  profile: {
    type: String,
    required:true
  }
}, {
  timestamps: true
})




module.exports = mongoose.model('users', userSchema)