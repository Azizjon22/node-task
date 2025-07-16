const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  otp: String,
  secretQuestion: String,
  secretAnswer: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  card: { type: String },
  cardLinked: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
