const express = require('express');
const { commonAuth, adminAuth } = require('../middleware/authentication');
const router = express.Router();
const reviewService = require('../services/review-service');

router
    .get('/review', reviewService.getReviews)
    .post('/review', commonAuth, reviewService.addReviews)
    .delete('/review/:review_id', adminAuth, reviewService.removeReview)
    .put('/review/:review_id/accept', adminAuth, reviewService.acceptReview)
module.exports = router