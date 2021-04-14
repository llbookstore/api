const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const authorService = require('../services/author-service');
const { upload, errHandling } = require('../middleware/upload');
router
    .get('/author', authorService.getAuthors)
    .get('/author/:id', authorService.getAuthorById)
    .post('/author', auth, upload.single('avatar'), errHandling, authorService.addAuthor)
    .put('/author/:id', auth, upload.single('avatar'), errHandling, authorService.updateAuthor)
    .delete('/author/:id', auth, authorService.deleteAuthor)
    .put('/author/:id/restore', auth, authorService.restoreAuthor)
module.exports = router