const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const reviewService = require('../services/review-service');

router
    .get('/review', reviewService.getReviews)
    .post('/review', auth, reviewService.addReviews)
    .delete('/review/:review_id', auth, reviewService.removeReview)
    .put('/review/:review_id/accept', auth, reviewService.acceptReview)
module.exports = router