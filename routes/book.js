const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const bookService = require('../services/book-service');
const { upload, errHandling } = require('../middleware/upload');

router
    .post('/book', auth,upload.single('cover_image'), errHandling, bookService.addBook)
    .get('/books', bookService.getBooks)
    .get('/book/:id', bookService.getBookById)
    .put('/book/:id',auth, upload.single('cover_image'), errHandling, bookService.updateBook)
    .post('/book/:id/categories', auth, bookService.addBookCategories)
    .post('/book/:bookId/favourite', auth, bookService.addFavourite)
    .delete('/book/:bookId/favourite', auth, bookService.removeFavourite)
    .post('/book/:bookId/cart', auth, bookService.addCart)
    .delete('/book/:bookId/cart', auth, bookService.removeCart)
module.exports = router