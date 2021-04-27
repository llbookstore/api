const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const authorService = require('../services/author-service');
const { upload, errHandling } = require('../middleware/upload');
router
    .get('/author', authorService.getAuthors)
    .get('/author/:id', authorService.getAuthorById)
    .post('/author', adminAuth, upload.single('avatar'), errHandling, authorService.addAuthor)
    .put('/author/:id', adminAuth, upload.single('avatar'), errHandling, authorService.updateAuthor)
    .delete('/author/:id', adminAuth, authorService.deleteAuthor)
    .put('/author/:id/restore', adminAuth, authorService.restoreAuthor)
module.exports = router