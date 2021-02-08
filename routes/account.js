const express = require('express');
const router = express.Router();
const accountService = require('../services/account-service');

router.get('/account/:id', accountService.addAuthor);

module.exports = router