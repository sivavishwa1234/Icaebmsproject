const mongoose = require('mongoose');

const conferenceInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadlines: [{
    event: String,
    date: Date
  }],
  sessionTracks: [String],
  speakers: [{
    name: String,
    designation: String,
    imageUrl: String
  }],
  announcements: [{
    title: String,
    content: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('ConferenceInfo', conferenceInfoSchema);
