const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/all', getAllUsers);


module.exports = router;
