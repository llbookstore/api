const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const accountService = require('../services/account-service');
const { upload, errHandling } = require('../middleware/upload');
router
    .post('/account', accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .get('/account/:id', accountService.getAccountById)
    .put('/account/:id', commonAuth, upload.single('avatar'), errHandling, accountService.updateAccount)
    .put('/account/:id/change-password', commonAuth, accountService.changePassword)
    .post('/login', accountService.login)

module.exports = router