const express = require('express');
const router = express.Router();
const { createRecipe, searchController, getRecipe } = require('../controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createRecipe);
router.get('/search', authMiddleware, searchController);
router.get('/:id', authMiddleware, getRecipe);


module.exports = router;
