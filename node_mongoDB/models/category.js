const mongoose = require("mongoose");
const Joi = require("joi");

// 1. Mongoose schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true // ortiqcha bo‘sh joylarni olib tashlaydi
  }
});

// 2. Mongoose model
const Category = mongoose.model("Category", categorySchema);

// 3. Joi validatsiyasi (request body uchun)
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
  });

  return schema.validate(category);
}

// 4. Eksportlar
module.exports = {
  Category,         // Modelni tashqariga beramiz
  validate: validateCategory,  // Validatsiya funksiyasi
  categorySchema    // Agar boshqa joyda embedded schema sifatida ishlatmoqchi bo‘lsang
};
