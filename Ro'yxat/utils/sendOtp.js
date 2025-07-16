const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOtp = async (phone, code) => {
  try {
    await client.messages.create({
      body: `Tasdiqlash kodingiz: ${code}`,
      from: process.env.TWILIO_PHONE,
      to: phone
    });
    console.log('✅ SMS yuborildi');
  } catch (err) {
    console.error('❌ SMS yuborishda xato:', err.message);
  }
};

module.exports = sendOtp;
