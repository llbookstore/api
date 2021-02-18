const express = require('express');
const auth = require('../middleware/authentication');
const router = express.Router();
const categoryService = require('../services/category-service');
router
    .post('/category', auth, categoryService.addCategory)
    .get('/category', categoryService.getCategories)
    .get('/category/:id', categoryService.getCategoryById)
    .put('/category/:id', auth,categoryService.updateCategory)

module.exports = router