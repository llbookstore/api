const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const saleService = require('../services/sale-service');

router
    .get('/sale', saleService.getSales)
    .post('/sale', auth, saleService.addSale)
    .put('/sale/:id',auth, saleService.updateSale)
module.exports = router