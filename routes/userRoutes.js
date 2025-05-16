const express = require('express');
const router = express.Router();
const { getAllUsers, getUserProfile, updateUserProfile, followTheUser } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/all', authMiddleware, getAllUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.post('/follow/:userId', authMiddleware, followTheUser);


module.exports = router;
