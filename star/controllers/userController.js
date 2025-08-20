const User = require('../models/User');

// Yangi foydalanuvchi yaratish
const createUser = async (req, res) => {
  try {
    const { fullName, email, password, cardNumber } = req.body;

    // Simple validation
    if (!fullName || !email || !password || !cardNumber) {
      return res.status(400).json({ message: 'Barcha maydonlar to‘ldirilishi kerak' });
    }

    // Card va email biriktirilgan user borligini tekshirish
    let existingUser = await User.findOne({ $or: [{ email }, { cardNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email yoki karta raqami allaqachon ro‘yxatdan o‘tgan' });
    }

    // User yaratish
    const newUser = new User({ fullName, email, password, cardNumber });
    await newUser.save();

    // Parolni real loyihada albatta hash qilish kerak!

    res.status(201).json({ user: newUser, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server xatoligi', error: error.message });
  }
};

// Barcha foydalanuvchilarni olish
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server xatoligi', error: error.message });
  }
};

// Card raqam bo‘yicha user qidirish
const getUserByCard = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const user = await User.findOne({ cardNumber });
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server xatoligi', error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByCard
};
