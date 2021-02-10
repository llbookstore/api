const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const accountService = require('../services/account-service');

router
    .post('/account',auth, accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .post('/login', accountService.login)

module.exports = router