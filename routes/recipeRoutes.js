const express = require('express');
const router = express.Router();
const { createRecipe, searchController } = require('../controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createRecipe);
router.get('/search', authMiddleware, searchController);


module.exports = router;
