const userModel = require('../models/user');


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      { $project: {password: 0, __v: 0}}
    ]);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};


module.exports = {
  getAllUsers
};
