const express = require('express');

const categoriesRoute = require('./routes/categories');
const customerRoute = require('./routes/customers');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/virtualdars',)
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...');
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
  });

app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customerRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});