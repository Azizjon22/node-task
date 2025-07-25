const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// Muhit o'zgaruvchisini tekshirish
if (!process.env.jwtPrivateKey) {
  console.error('❌ Muhit ozgaruvchisi jwtPrivateKey aniqlanmadi!');
  process.exit(1);
}

router.post('/', async (req, res) => {
  try {
    // 1. Ma'lumotni tekshiramiz (validation)
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.details[0].message);

    // 2. Foydalanuvchini qidiramiz
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send('Email yoki parol notogri.');

    // 3. Parolni solishtiramiz
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid)
      return res.status(400).send('Email yoki parol notogri.');

    // 4. Token yaratamiz
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.jwtPrivateKey
    );

    // 5. Javob qaytaramiz — header + body
    res
      .header('x-auth-token', token)
      .send({ success: true, message: 'Tizimga muvaffaqiyatli kirdingiz.' });

  } catch (err) {
    console.error('Server xatosi:', err.message);
    res.status(500).send('Ichki server xatosi.');
  }
});


function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(), 
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req); 
}

module.exports = router;
