const express = require('express');
const router = express.Router();
const accountService = require('../services/account-service');

router
    .post('/account', accountService.addAccount)
    .get('/account', accountService.getAllAccount)
    .post('/login', accountService.login)

module.exports = router