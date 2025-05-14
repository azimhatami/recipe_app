const bcrypt = require('bcryptjs');
const userModel = require('../models/user');


const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error...' })
  }
};

module.exports = {
  signupController
};

