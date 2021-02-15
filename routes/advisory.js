const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const advisoryService = require('../services/advisory-service');

router
    .get('/advisory', advisoryService.getAdvisory)

module.exports = router