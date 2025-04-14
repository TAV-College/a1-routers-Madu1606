const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook } = require('../models/books');

// GET /books (list all books)
router.get('/', async (req, res) => {
    const books = await getAllBooks();
    res.render('books/index', { books }); // will use views/books/index.ejs
});

// GET /books/add (form to add book)
router.get('/add', (req, res) => {
    res.render('books/add'); 
});

// POST /books (add new book)
router.post('/', async (req, res) => {
    const { author, title, isbn } = req.body;
    await addBook({ author, title, isbn });
    res.redirect('/books');
});

//  GET /books/:id (details of a book)
router.get('/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).send("Livro não encontrado");
    res.render('books/show', { book }); // will use views/books/show.ejs
});

module.exports = router;
