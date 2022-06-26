const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 254
  },
  email: {
    type: String,
    required: true,
    max: 254
  },
  password: {
    type: String,
    required: true,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('User', userSchema)