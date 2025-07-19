require('dotenv').config();
const express = require('express');
const categoriesRoute = require('./routes/categories');
const customerRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses')
const enrollmentsRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const app = express();
const mongoose = require('mongoose');


console.log(process.env.jwtPrivateKey);



console.log("JWT key:", process.env.jwtPrivateKey);


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
app.use('/api/courses', coursesRoute)
app.use('/api/enrollments', enrollmentsRoute)
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});