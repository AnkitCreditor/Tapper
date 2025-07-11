const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Authentication Middleware
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

// Admin Middleware - checks if user has admin role
function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
    }
    next();
}

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Get Profile Error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
    const { firstName, lastName, phone, dob } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (phone !== undefined) user.phone = phone;
        if (dob !== undefined) user.dob = dob;
        await user.save();
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);
    } catch (err) {
        console.error('Update Profile Error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/user/all
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Get All Users Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 