const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/check-login', authController.checkLoginExists);
router.post('/send-otp', authController.sendOtpCode);
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
