const { Schema, Types, model } = require('mongoose');


const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  following: [{type: Types.ObjectId, ref: 'User'}]
});

const userModel = model('User', userSchema);


module.exports = userModel;
