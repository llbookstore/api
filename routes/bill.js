const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const billService = require('../services/bill-service');

router
    .get('/bill', billService.getBills)
    .get('/bill/:id', billService.getBillById)
    .post('/bill', commonAuth, billService.addBill)
    .post('/bill/:id/detail', commonAuth, billService.addBillDetail)
    .put('/bill/:id', adminAuth, billService.handleBill)
    .post('/bill/revenue_stat', adminAuth, billService.revenueStat)
    .post('/bill/revenue_cod_stat', adminAuth, billService.revenueCodStat)

module.exports = router