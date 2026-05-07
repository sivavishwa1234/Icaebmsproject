const User = require('../models/User');
const PaperSubmission = require('../models/PaperSubmission');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPapers = await PaperSubmission.countDocuments();
    const acceptedPapers = await PaperSubmission.countDocuments({ status: 'Accepted' });
    const rejectedPapers = await PaperSubmission.countDocuments({ status: 'Rejected' });
    const pendingReviews = await PaperSubmission.countDocuments({ status: { $in: ['Pending', 'Under Review'] } });

    res.json({
      totalUsers,
      totalPapers,
      acceptedPapers,
      rejectedPapers,
      pendingReviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'Admin') {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await user.deleteOne();
      res.json({ message: 'User removed successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  deleteUser
};
