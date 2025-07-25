const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

// Mongoose schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: categorySchema,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model('Courses', courseSchema);

// Joi validatsiyasi
function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    categoryId: Joi.string().required(), // bu ID orqali Category ni tanlaysan
    trainer: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('Active', 'Inactive').required(),
    fee: Joi.number().min(0).required()
  });

  return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;
