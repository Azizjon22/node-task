const express = require("express");
const Joi = require("joi");
const router = express.Router();

const books = [
  { id: 1, name: "rich dad poor dad" },
  { id: 2, name: "good to great" },
  { id: 3, name: "the war of art" },
  { id: 4, name: "rework" },
]
// Kitoblar ro‘yxati
router.get("/", (req, res) => {
  res.send(books);
});

// ✅ Yangi kitob qo‘shish (POST)
router.post("/", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(book);
  res.status(201).send(book);
});

// ✅ ID bo‘yicha kitob qidirish
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Berilgan IDga teng kitob topilmadi.");

  res.send(book);
});

// ✅ Kitobni yangilash (PUT)
router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Berilgan IDga teng kitob topilmadi.");

  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  book.name = req.body.name;
  res.send(book);
});

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Berilgan IDga teng kitob topilmadi.");

  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);

  res.send(book);
});

// ✅ Validsiya funksiyasi
function validateBook(book) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(book);
}

module.exports = router;
