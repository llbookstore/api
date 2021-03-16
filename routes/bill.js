const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const billService = require('../services/bill-service');

router
    .get('/bill', billService.getBills)
    .get('/bill/:id', billService.getBillById)
    .post('/bill', auth, billService.addBill)
    .post('/bill/:id/detail', auth, billService.addBillDetail)
    .put('/bill/:id', auth, billService.handleBill)

module.exports = router