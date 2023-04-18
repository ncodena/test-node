const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    min:2,
    max: 20,
    required: true
  },
  last_name: {
    type: String,
    min:2,
    max: 20,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;