const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// Muhit o'zgaruvchisini tekshirish
if (!process.env.jwtPrivateKey) {
  console.error('❌ Muhit o‘zgaruvchisi jwtPrivateKey aniqlanmadi!');
  process.exit(1);
}

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send('email yoki parol notogri');

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword)
    return res.status(400).send('email yoki parol notogri');

  const token = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey);
  res.header('x-auth-token', token).send(true);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req); 
}

module.exports = router;
