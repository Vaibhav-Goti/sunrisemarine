const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');

// @desc    Admin login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin register
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Change admin password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard statistics
const getStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const contactCount = await Contact.countDocuments();

        res.json({
            totalProducts: productCount,
            totalCategories: categoryCount,
            totalContacts: contactCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin logout
const logoutAdmin = async (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    loginAdmin,
    registerAdmin,
    changePassword,
    getStats,
    logoutAdmin
};
