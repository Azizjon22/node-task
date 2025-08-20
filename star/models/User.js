const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    length: 16
  },
  balance: {
    type: Number,
    default: 1000000
  },
  stars: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
