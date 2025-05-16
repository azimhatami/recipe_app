const recipeModel = require('../models/recipe');


const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instruction, tags } = req.body;
    const author = req.user._id;
    const recipe = await recipeModel.create({
      title, author, ingredients, instruction, tags
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: 'MongoDB failed to create a recipe'
    });
  }
};

const searchController = async (req, res) => {
  const { keyword, ingredients, tags } = req.query;
  const query = {};

  if (keyword) {
    query.title = {$regex: keyword, $options: 'i'};
    const recipe = await recipeModel.find(query);
  }

  if (ingredients) {
    query.ingredients = {$all: ingredients.split(',')}
  }

  if (tags) {
    query.tags = {$in: tags.split(',')}
  }

  try {
    const recipe = await recipeModel.find(query);
    if (recipe.length > 0) {
      return res.status(200).json(recipe);
    }
    return res.status(404).json({message: 'No result was found'});
  } catch (error) {
    return res.status(500).json('The search failed on the server...');
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({
      message: 'Server failed on recipe search...'
    });
  }
};

const deleteRecipeById = async (req, res) => {
  const {id} = req.params;
  try {
    const deleteRecipe = await recipeModel.findByIdAndDelete(id);
    if (!deleteRecipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    }

    return res.status(200).json({
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error', 
      error: error.message
    });
  }
};

const rateRecipe = async (req, res) => {
  const {rating} = req.body;
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    }

    recipe.ratings.push({
      user: req.user.id,
      rating: rating
    });
    await recipe.save();

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const commentController = async (req, res) => {
  const { comment } = req.body;
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    };
    recipe.comments.push({
      user: req.user.id,
      comment: comment
    });
    await recipe.save();
    
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


module.exports = {
  createRecipe,
  searchController,
  getRecipe,
  deleteRecipeById,
  rateRecipe,
  commentController
};
