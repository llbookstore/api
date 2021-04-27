const express = require('express');
const { adminAuth } = require('../middleware/authentication');
const router = express.Router();
const newsService = require('../services/news-service');

router
    .get('/news', newsService.getNews)
    .get('/news/:id', newsService.getNewsById)
    .post('/news', adminAuth, newsService.addNews)
    .put('/news/:id',adminAuth, newsService.updateNews)
module.exports = router