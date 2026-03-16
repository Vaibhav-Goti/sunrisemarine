const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Create a category (Admin only)
router.post('/', auth, createCategory);

// @route   PUT /api/categories/:id
// @desc    Update a category (Admin only)
router.put('/:id', auth, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete a category (Admin only)
router.delete('/:id', auth, deleteCategory);

module.exports = router;
