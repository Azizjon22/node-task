const express = require('express');
const router = express.Router();
const Transfer = require('../models/transfer');

// Yangi transfer yaratish
router.post('/', async (req, res) => {
  try {
    const { fromUser, toUser, amount } = req.body;

    // Oddiy validatsiya
    if (!fromUser || !toUser || !amount) {
      return res.status(400).json({ message: 'Barcha maydonlar to‘ldirilishi kerak' });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: 'Summasi musbat bo‘lishi kerak' });
    }

    // Transfer yaratish
    const transfer = new Transfer({ fromUser, toUser, amount, status: 'completed' });
    await transfer.save();

    res.status(201).json({ message: 'Transfer muvaffaqiyatli yaratildi', transfer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Transferlarni olish (hammasi)
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find()
      .populate('fromUser', 'name email') // foydalanuvchi haqida ma'lumot olish uchun
      .populate('toUser', 'name email')
      .sort({ createdAt: -1 });

    res.json(transfers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;


