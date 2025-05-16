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

const getUserProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await userModel.findById(id).select('-password -__v');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user.id, 
      { username, email }, 
      { new: true }
    ).select('-__v');
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};

const followTheUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userTobeFollowed = await userModel.findById(userId);
    if (!userTobeFollowed) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const user = await userModel.findById(req.user.id);
    if (!user.following.includes(userTobeFollowed._id)) {
      user.following.push(userTobeFollowed._id);
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  };
};


module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  followTheUser
};
