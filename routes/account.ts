import { Router } from 'express';
import { commonAuth, adminAuth } from '../middleware/authentication';
import  * as accountService from '../services/account-service';
import { upload, errHandling } from '../middleware/upload';

const router = Router();
router
    .post('/account', accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .get('/account/:id', accountService.getAccountById)
    .put('/account/:id', commonAuth, upload.single('avatar'), errHandling, accountService.updateAccount)
    .put('/account/:id/change-password', commonAuth, accountService.changePassword)
    .post('/login', accountService.login)

export default router;