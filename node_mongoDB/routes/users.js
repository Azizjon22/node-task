const { User, validate } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user)
      return res.status(404).send("Foydalanuvchi topilmadi.");

    res.send(user);
  } catch (err) {
    console.error("❌ /me route xatosi:", err.message);
    res.status(500).send("Ichki server xatosi.");
  }
});

// Yangi foydalanuvchi ro'yxatdan o'tkazish
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("Bu email bilan foydalanuvchi allaqachon mavjud.");

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin'])); 
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
  } catch (err) {
    console.error("❌ POST /users route xatosi:", err.message);
    res.status(500).send("Foydalanuvchi yaratishda serverda xatolik yuz berdi.");
  }
});

module.exports = router; 