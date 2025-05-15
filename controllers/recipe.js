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


module.exports = {
  createRecipe
};
