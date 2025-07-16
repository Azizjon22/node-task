const User = require('../models/User');
const bcrypt = require('bcryptjs');
const isStrongPassword = require('../utils/validatePassword');

// Ro‘yxatdan o‘tish (parol, parol takror, login, phone)
exports.registerUser = async (req, res) => {
  const { login, password, repeatPassword, phone } = req.body;

  // 1. Login unikal bo‘lishi kerak
  const existing = await User.findOne({ login });
  if (existing) return res.status(400).send({ error: 'Login band' });

  // 2. Parollar bir xil bo‘lishi kerak
  if (password !== repeatPassword) {
    return res.status(400).send({ error: 'Parollar mos emas' });
  }

  // 3. Parol mustahkammi?
  if (!isStrongPassword(password)) {
    return res.status(400).send({ error: 'Parol kuchsiz! Kamida 8 ta belgi, 1 ta katta, 1 ta kichik harf, 1 ta raqam bo‘lishi kerak.' });
  }

  // 4. Parolni hash qilish
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  // 5. Foydalanuvchini bazaga saqlash
  const user = new User({
    login,
    phone,
    password: hashed,
    cardLinked: false
  });

  await user.save();
  res.send({ message: '✅ Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi!' });
};


exports.setSecret = async (req, res) => {
    const { login, question, answer } = req.body;
  
    if (!login || !question || !answer)
      return res.status(400).json({ message: "❌ Ma'lumotlar to‘liq emas" });
  
    const user = await User.findOne({ login });
    if (!user)
      return res.status(404).json({ message: "❌ Foydalanuvchi topilmadi" });
  
    user.secretQuestion = question;
    user.secretAnswer = answer;
    await user.save();
  
    res.json({ message: "✅ Secret savol va javob saqlandi" });
  };


  exports.setProfile = async (req, res) => {
    const { login, firstName, lastName, birthDate } = req.body;
  
    if (!login || !firstName || !lastName || !birthDate)
      return res.status(400).json({ message: "❌ Ma'lumotlar yetarli emas" });
  
    const user = await User.findOne({ login });
    if (!user)
      return res.status(404).json({ message: "❌ Foydalanuvchi topilmadi" });
  
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    await user.save();
  
    res.json({ message: "✅ Profil ma'lumotlari saqlandi" });
  };
  



  exports.linkCard = async (req, res) => {
    const { login } = req.body;
  
    if (!login)
      return res.status(400).json({ message: "❌ Login kiritilmagan" });
  
    const user = await User.findOne({ login });
    if (!user)
      return res.status(404).json({ message: "❌ Foydalanuvchi topilmadi" });
  
    // Karta ulash logikasi (bu yerda tasodifiy karta raqami biriktiramiz)
    user.card = `8600${Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")}`;
  
    await user.save();
  
    res.json({ message: "✅ Bank kartasi muvaffaqiyatli bog‘landi!" });
  };
  