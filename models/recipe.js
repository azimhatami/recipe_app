const { Schema, Types, model } = require('mongoose');


const recipeSchema = new Schema({
  title: {type: String, required: true},
  ingredients: {type: [String], required: true},
  instruction: {type: String, required: true},
  author: {type: Types.ObjectId, ref: 'User'},
  tags: {type: [String]},
  ratings: [
    {
      user: {type: Types.ObjectId, ref: 'User'},
      rating: Number
    },
  ],
  comments: [
    {
      user: {type: Types.ObjectId, ref: 'User'},
      comment: String,
    },
  ],
});

const recipeModel = model('Recipe', recipeSchema);


module.exports = recipeModel;
