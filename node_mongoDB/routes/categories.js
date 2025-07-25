const express = require("express");
const router = express.Router();
const { Category, validate} = require('../models/category')
const auth = require('../middleware/auth');
const admin = require ('../middleware/admin.js')

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.send(categories);
  } catch (err) {
    console.error("Kategoriya olishda xato:", err.message);
    res.status(500).send("Toifalarni olishda kutilmagan xato yuz berdi!");
  }
});


router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({
      name: req.body.name,
    });

    category = await category.save();

    res.status(201).send(category);
  } catch (err) {
    console.error("Kategoriya qo'shishda xatolik:", err.message);
    res.status(500).send("Kategoriya qo'shishda kutilmagan xatolik yuz berdi!");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

    res.send(category);
  } catch (err) {
    console.error("ID orqali toifa olishda xatolik:", err.message);
    res.status(500).send("Toifani olishda xatolik yuz berdi");
  }
});


router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!category)
      return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

    res.send(category);
  } catch (err) {
    console.error("Toifani yangilashda xatolik:", err.message);
    res.status(500).send("Toifani yangilashda xatolik yuz berdi");
  }
});


router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

    res.send(category);
  } catch (err) {
    console.error("Toifani o‘chirishda xatolik:", err.message);
    res.status(500).send("Toifani o‘chirishda xatolik yuz berdi");
  }
});


module.exports = router;
