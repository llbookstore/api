const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const accountService = require('../services/account-service');

router
    .post('/account',auth, accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .get('/account/:id', accountService.getAccountById)
    .put('/account/:id', auth, accountService.updateAccount)
    .put('/account/:id/change-password', auth, accountService.changePassword)
    .post('/login', accountService.login)

module.exports = router