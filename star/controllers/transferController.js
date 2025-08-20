const User = require('../models/User');

const transferMoney = async (req, res) => {
  const { fromCard, toCard, amount } = req.body;

  if (!fromCard || !toCard || !amount || amount < 1000) {
    return res.status(400).json({ success: false, message: 'Noto‘g‘ri maʼlumot' });
  }

  try {
    const sender = await User.findOne({ cardNumber: fromCard });
    const receiver = await User.findOne({ cardNumber: toCard });

    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: 'Balans yetarli emas' });
    }

    // Balansni yangilash
    sender.balance -= amount;
    sender.stars += 1000;  // Sizning talab bo‘yicha yulduzlar oshishi

    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.json({ success: true, message: 'Pul muvaffaqiyatli o‘tkazildi' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server xatoligi', error: err.message });
  }
};

module.exports = {
  transferMoney,
};
