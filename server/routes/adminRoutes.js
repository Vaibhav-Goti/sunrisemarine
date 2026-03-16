const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loginAdmin, registerAdmin, changePassword, getStats, logoutAdmin } = require('../controllers/adminController');

// @route   POST /api/admin/login
// @desc    Admin login
router.post('/login', loginAdmin);

// @route   POST /api/admin/register (Initial setup only - should be disabled in production)
router.post('/register', registerAdmin);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
router.get('/stats', auth, getStats);

// @route   POST /api/admin/change-password
// @desc    Change admin password
router.post('/change-password', auth, changePassword);

// @route   POST /api/admin/logout
// @desc    Admin logout
router.post('/logout', auth, logoutAdmin);

module.exports = router;
