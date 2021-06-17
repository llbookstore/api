import express from 'express';
import { commonAuth, adminAuth } from '../middleware/authentication';
import * as billService from '../services/bill-service';
const router = express.Router();

router
    .get('/bill', billService.getBills)
    .get('/bill/:id', billService.getBillById)
    .post('/bill', commonAuth, billService.addBill)
    .post('/bill/:id/detail', commonAuth, billService.addBillDetail)
    .put('/bill/:id', adminAuth, billService.handleBill)
    .post('/bill/revenue_stat', adminAuth, billService.revenueStat)
    .post('/bill/revenue_cod_stat', adminAuth, billService.revenueCodStat)
    .delete('/bill/:id/cancel', commonAuth, billService.cancelBill)

export default router;