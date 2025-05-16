const express = require('express');
const router = express.Router();
const { getAllUsers, getUserProfile } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/all', authMiddleware, getAllUsers);
router.get('/profile', authMiddleware, getUserProfile);


module.exports = router;
