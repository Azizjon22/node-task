const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendOtp = require('../utils/sendOtp');

exports.checkLoginExists = async (req, res) => {
  const { login } = req.body;
  const user = await User.findOne({ login });
  if (user) return res.status(200).send({ exists: true });
  res.status(200).send({ exists: false });
};

exports.sendOtpCode = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOtp(phone, code);
  await User.findOneAndUpdate({ phone }, { otp: code }, { upsert: true });
  res.send({ message: 'OTP yuborildi' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  const user = await User.findOne({ phone });
  if (!user || user.otp !== code) return res.status(400).send({ error: 'Noto‘g‘ri OTP' });
  res.send({ message: 'OTP tasdiqlandi' });
};
