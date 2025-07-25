const {Course, validate} = require('../models/course');
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const course = await Course.find().sort('title').populate('category');
    res.send(course)
});

router.post('/', async (req, res) =>{
    const {error} = validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId);
    if(!category)
    return res.status(400).send('berulgan IDga teng bolmagan toifa topilmadi')

    console.log(12, category, 12);
    let course = new Course({
        title:req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status
    });
    course = await course.save();
    res.send(course)
});

  
  router.put('/:id', async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId);
    if(!category)
    return res.status(400).send('berilgan IDga teng bolmagan toifa topilmadi')

    const course = await Course.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            trainer: req.body.trainer,
            tags: req.body.tags,
            status: req.body.status,
        },{new: true})

        if(!course)
        return res.status(400).send('berilgan IDga teng bolmagan kurs topilmadi');
        res.send(course)
  })


  router.delete('/:id', async (req,res) =>{
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course)
    return res.status(400).send('berilgan Idga teng bolmagan kurs topilmadi');
    res.send(course)
  });

  module.exports = router

