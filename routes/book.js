const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const bookService = require('../services/book-service');
const { upload, errHandling } = require('../middleware/upload');

router
    .post('/book', auth,upload.single('cover'), errHandling, bookService.addBook)
    .get('/book', bookService.getBooks)
    .get('/book/:id', bookService.getBookById)
    .put('/book',auth, upload.single('cover'), errHandling, bookService.updateBook)
    

module.exports = router