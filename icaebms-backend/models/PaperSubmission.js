const mongoose = require('mongoose');

const paperSubmissionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullName: {
    type: String,
    required: [true, 'Please add full name']
  },
  email: {
    type: String,
    required: [true, 'Please add email']
  },
  paperTitle: {
    type: String,
    required: [true, 'Please add paper title']
  },
  abstract: {
    type: String,
    required: [true, 'Please add an abstract']
  },
  sessionTrack: {
    type: String
  },
  keywords: {
    type: [String]
  },
  institution: {
    type: String
  },
  country: {
    type: String
  },
  fileUrl: {
    type: String, // Path to the uploaded PDF file
    required: [true, 'Please upload the paper PDF']
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaperSubmission', paperSubmissionSchema);
