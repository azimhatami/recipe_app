const express = require('express');
const router = express.Router();
const { createRecipe } = require('../controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createRecipe);


module.exports = router;
