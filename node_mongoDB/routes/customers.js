const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth')


router.get('/', async (req, res) => {
    try {
      const customers = await Customer.find().sort('name');
      res.send(customers);
    } catch (err) {
      res.status(500).send('Serverda xatolik yuz berdi');
    }
  });

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send(error.details[0].message);

    let customer = new Customer({
      name: req.body.name,
      isVip: req.body.isVip,
      phone: req.body.phone,
      bonusPoints: 0
    });

    customer = await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(500).send('Serverda xatolik yuz berdi');
  }
});

router.get('/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan mijoz topilmadi');
  
      res.send(customer);
    } catch (err) {
      res.status(500).send('Serverda xatolik yuz berdi');
    }
  });

  router.put('/:id', auth, async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send(error.details[0].message);
  
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, isVip: req.body.isVip, phone: req.body.phone },
        { new: true }
      );
  
      if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan mijoz topilmadi');
  
      res.send(customer);
    } catch (err) {
      res.status(500).send('Serverda xatolik yuz berdi');
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const customer = await Customer.findByIdAndRemove(req.params.id);
      if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan mijoz topilmadi');
  
      res.send(customer);
    } catch (err) {
      res.status(500).send('Serverda xatolik yuz berdi');
    }
  });


module.exports = router;