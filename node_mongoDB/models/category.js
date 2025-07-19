const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// Model
const Category = mongoose.model("Category", categorySchema);

// Joi validatsiyasi (modern usul)
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(category);
}

// Eksportlar
module.exports = {
  Category,
  validate: validateCategory,
  categorySchema, // boshqa schema ichida ishlatilsa kerak bo‘ladi
};
