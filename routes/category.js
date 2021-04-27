const express = require('express');
const { adminAuth } = require('../middleware/authentication');
const router = express.Router();
const categoryService = require('../services/category-service');
router
    .post('/category', adminAuth, categoryService.addCategory)
    .get('/category', categoryService.getCategories)
    .get('/category/:id', categoryService.getCategoryById)
    .put('/category/:id', adminAuth,categoryService.updateCategory)
    .delete('/category/:id', adminAuth, categoryService.deleteCategory)

module.exports = router