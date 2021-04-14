const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const saleService = require('../services/sale-service');

router
    .get('/sale', saleService.getSales)
    .get('/sale/:id', saleService.getSaleById)
    .post('/sale', auth, saleService.addSale)
    .put('/sale/:id',auth, saleService.updateSale)
    .delete('/sale/:id',auth, saleService.deleteSale)
    .put('/sale/:id/restore',auth, saleService.restoreSale)
module.exports = router