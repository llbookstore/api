import { Router } from 'express';
const { commonAuth, adminAuth } = require('../middleware/authentication');
import  accountService from '../services/account-service';
const { upload, errHandling } = require('../middleware/upload');

const router = Router();
router
    .post('/account', accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .get('/account/:id', accountService.getAccountById)
    .put('/account/:id', commonAuth, upload.single('avatar'), errHandling, accountService.updateAccount)
    .put('/account/:id/change-password', commonAuth, accountService.changePassword)
    .post('/login', accountService.login)

export default router;