const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const advisoryService = require('../services/advisory-service');

router
    .get('/advisory', advisoryService.getAdvisory)
    .post('/advisory', advisoryService.requestAdvisory)
    .put('/advisory/:id', adminAuth, advisoryService.responseAdvisory)
module.exports = router