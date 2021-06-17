import express from 'express';
import { commonAuth, adminAuth } from '../middleware/authentication';
import * as authorService from '../services/author-service';
import { upload, errHandling } from '../middleware/upload';
const router = express.Router();
router
    .get('/author', authorService.getAuthors)
    .get('/author/:id', authorService.getAuthorById)
    .post('/author', adminAuth, upload.single('avatar'), errHandling, authorService.addAuthor)
    .put('/author/:id', adminAuth, upload.single('avatar'), errHandling, authorService.updateAuthor)
    .delete('/author/:id', adminAuth, authorService.deleteAuthor)
    .put('/author/:id/restore', adminAuth, authorService.restoreAuthor)
export default router;