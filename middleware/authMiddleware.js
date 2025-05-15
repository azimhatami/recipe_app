const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Token not provided...'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({message: 'Unauthorized'});
  }
};


module.exports = authMiddleware;
