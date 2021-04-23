const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const newsService = require('../services/news-service');

router
    .get('/news', newsService.getNews)
    .get('/news/:id', newsService.getNewsById)
    .post('/news', auth, newsService.addNews)
    .put('/news/:id',auth, newsService.updateNews)
module.exports = router