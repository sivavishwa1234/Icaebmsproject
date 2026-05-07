const ConferenceInfo = require('../models/ConferenceInfo');

// @desc    Get conference details
// @route   GET /api/conference/details
// @access  Public
const getConferenceDetails = async (req, res, next) => {
  try {
    const details = await ConferenceInfo.findOne();
    if (!details) {
      return res.status(404).json({ message: 'Conference details not found' });
    }
    res.json(details);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update conference details
// @route   POST /api/conference/details
// @access  Private/Admin
const updateConferenceDetails = async (req, res, next) => {
  try {
    let details = await ConferenceInfo.findOne();

    if (details) {
      // Update
      details = await ConferenceInfo.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    } else {
      // Create
      details = await ConferenceInfo.create(req.body);
    }

    res.json(details);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConferenceDetails,
  updateConferenceDetails
};
