const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice2')
  .then(() => console.log('MongoDBga ulanish hosil qilindi...'))
  .catch((err) => console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err));

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

const bookSchema = new mongoose.Schema({
  title: String,
  authors: {
    type: [authorSchema],
    required: true
  }
})

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

async function createBook(title, authors) {
  const book = new Book({
    title,
    authors: authors
  });

  const result = await book.save();
  console.log(result);
}

// createBook('NodeJS - To\'liq qo\'llanma', [
//   new Author({
//     firstName: 'Aziz',
//     lastName: 'Yakubjonov',
//     email: 'azizjon@gmail.com'
//   }),
// ]
// );

async function updateAuthor(bookId) {
  await Book.updateOne({ _id: bookId }, {
    $unset: {
      'authors': 'Aziz'
    }
  });
}

updateAuthor('686f918345db1e811a39eed0');