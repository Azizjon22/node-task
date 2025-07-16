require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');

// ✅ Middleware avval qo‘yiladi!
app.use(express.json());

// const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// ⏫ MongoDB ulaymiz
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portda ishga tushdi`));
