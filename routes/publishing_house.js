const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const publishingHouseService = require('../services/publishing_house-service');
const { upload, errHandling } = require('../middleware/upload');
router
    .get('/publishing_house', publishingHouseService.getPublishingHouses)
    .get('/publishing_house/:id', publishingHouseService.getOnePublishingHouse)
    .post('/publishing_house', auth, upload.single('image'), errHandling, publishingHouseService.addPublishingHouse)
    .put('/publishing_house/:id', auth, upload.single('image'), errHandling, publishingHouseService.updatePublishingHouse)
    .delete('/publishing_house/:id', auth, publishingHouseService.deletePublishingHouse)
    .put('/publishing_house/:id/restore', auth, publishingHouseService.restorePublishingHose);
module.exports = router