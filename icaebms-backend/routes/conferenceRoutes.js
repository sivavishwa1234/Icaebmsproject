const express = require('express');
const router = express.Router();
const {
  getConferenceDetails,
  updateConferenceDetails
} = require('../controllers/conferenceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/details', getConferenceDetails);
router.post('/details', protect, admin, updateConferenceDetails);

module.exports = router;
