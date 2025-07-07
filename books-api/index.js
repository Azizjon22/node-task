const express = require("express");
const mongoose = require("mongoose");

const app = express()
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017//booksdb")
.then(() => console.log("MongoDB ulandi"))
.catch((err) => console.log("Ulanish Xato", err));


const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  year: Number,
  isPublished: Boolean
});

const Book = mongoose.model("Book", bookSchema);

// 1 Get/ books - barcha malumot olish uchun

app.get("/books", async(req, res) => {
    const books = await Book.find()
    res.send(books)
})


// 2 POST/ books - yengi kitob qoshish

app.post("/books", async (req, res) => {
    const books = await Book(req.body)
    const result = await bookCshema.save();
    res.send(result);
});

// 3 PUT /books/:id - yangilash

app.put("/books/:id", async (req, res) => {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.send(updated)
})


// 4  DELETE /books/:id - Kitobni o‘chirish
app.delete("/books/:id", async (req, res) => {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ message: "Kitob topilmadi" });
    }
    res.send({ message: "Kitob o‘chirildi", data: deleted });
  });


  // 5. GET /books/:id - Bitta kitobni olish
app.get("/books/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Kitob topilmadi" });
    }
    res.send(book);
  });