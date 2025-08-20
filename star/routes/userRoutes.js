const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserByCard } = require('../controllers/userController');

router.post('/', createUser);           // Yangi user qo‘shish
router.get('/', getUsers);               // Barchasini olish
router.get('/card/:cardNumber', getUserByCard); // Card bo‘yicha qidirish

module.exports = router;
