import express from 'express';
import { commonAuth, adminAuth } from '../middleware/authentication';
import * as advisoryService from '../services/advisory-service';
const router = express.Router();

router
    .get('/advisory', advisoryService.getAdvisory)
    .post('/advisory', advisoryService.requestAdvisory)
    .put('/advisory/:id', adminAuth, advisoryService.responseAdvisory)
export default router;