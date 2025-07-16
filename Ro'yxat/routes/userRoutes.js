const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 📝 Foydalanuvchini ro‘yxatdan o‘tkazish
router.post('/register', userController.registerUser);

// 🔐 Secret savol va javob qo‘shish
router.post('/set-secret', userController.setSecret);

// 👤 Ism, familiya, tug‘ilgan sana qo‘shish
router.post('/set-profile', userController.setProfile);

// 💳 Karta ulash
router.post('/link-card', userController.linkCard);

module.exports = router;
