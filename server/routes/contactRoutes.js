const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    submitContactForm,
    getContacts,
    markContactRead,
    deleteContact
} = require('../controllers/contactController');

// @route   POST /api/contacts
// @desc    Submit contact form
router.post('/', submitContactForm);

// @route   GET /api/contacts
// @desc    Get all contact messages (Admin only)
router.get('/', auth, getContacts);

// @route   PATCH /api/contacts/:id/read
// @desc    Mark message as read (Admin only)
router.patch('/:id/read', auth, markContactRead);

// @route   DELETE /api/contacts/:id
// @desc    Delete message (Admin only)
router.delete('/:id', auth, deleteContact);

module.exports = router;
