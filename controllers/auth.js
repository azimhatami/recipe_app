const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// User Signup
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

// User Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: 'wrong credentials...'});
    }

    const token = jwt.sign(
      {id: user._id}, 
      process.env.JWT_SECRET, 
      {expiresIn: '1h'}
    );
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error...' })
  }
};

module.exports = {
  signupController,
  loginController
};

