// index.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const transferRoutes = require('./routes/transferRoutes');


app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/transfer', transferRoutes);

// DB ulash
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB ulanildi'))
.catch((err) => console.error(' MongoDB xato:', err));

// Routerlar
app.get('/', (req, res) => {
  res.send(' ClickStar server ishlayapti!');
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(` Server ${PORT}-portda ishlayapti`);
});
console.log('✅ Transfer router ulandi:', typeof transferRoutes);