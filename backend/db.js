const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowecase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
})

const User = mongoose.model('User', userSchema);
module.exports = {
  User
};