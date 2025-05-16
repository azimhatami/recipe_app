const express = require('express');
const router = express.Router();
const { 
  createRecipe, 
  searchController, 
  getRecipe, 
  deleteRecipeById, 
  rateRecipe, 
  commentController 
} = require('../controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createRecipe);
router.get('/search', authMiddleware, searchController);
router.get('/:id', authMiddleware, getRecipe);
router.delete('/:id', authMiddleware, deleteRecipeById);
router.post('/:id/rate', authMiddleware, rateRecipe);
router.post('/:id/comments', authMiddleware, commentController);


module.exports = router;
