const express = require('express');
const { adminAuth } = require('../middleware/authentication');
const router = express.Router();
const saleService = require('../services/sale-service');

router
    .get('/sale', saleService.getSales)
    .get('/sale/:id', saleService.getSaleById)
    .post('/sale', adminAuth, saleService.addSale)
    .put('/sale/:id',adminAuth, saleService.updateSale)
    .delete('/sale/:id',adminAuth, saleService.deleteSale)
    .put('/sale/:id/restore',adminAuth, saleService.restoreSale)
module.exports = router