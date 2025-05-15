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


module.exports = {
  createRecipe,
  searchController
};
