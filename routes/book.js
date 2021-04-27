const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const bookService = require('../services/book-service');
const { upload, errHandling } = require('../middleware/upload');

router
    .post('/book', commonAuth,upload.single('cover_image'), errHandling, bookService.addBook)
    .get('/books', bookService.getBooks)
    .get('/book/:id', bookService.getBookById)
    .put('/book/:id',adminAuth, upload.single('cover_image'), errHandling, bookService.updateBook)
    .post('/book/:id/categories', adminAuth, bookService.addBookCategories)
    .post('/book/:bookId/favourite', commonAuth, bookService.addFavourite)
    .delete('/book/:bookId/favourite', commonAuth, bookService.removeFavourite)
    .post('/book/:bookId/cart', commonAuth, bookService.addCart)
    .delete('/book/:bookId/cart', commonAuth, bookService.removeCart)
module.exports = router