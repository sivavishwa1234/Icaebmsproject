const PaperSubmission = require('../models/PaperSubmission');

// @desc    Submit a new paper
// @route   POST /api/papers/submit
// @access  Private
const submitPaper = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      paperTitle,
      abstract,
      sessionTrack,
      keywords,
      institution,
      country
    } = req.body;

    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a PDF file');
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    // Convert keywords string to array if it comes as comma separated
    let parsedKeywords = keywords;
    if (typeof keywords === 'string') {
      parsedKeywords = keywords.split(',').map(k => k.trim());
    }

    const paper = await PaperSubmission.create({
      author: req.user ? req.user._id : undefined,
      fullName,
      email,
      paperTitle,
      abstract,
      sessionTrack,
      keywords: parsedKeywords,
      institution,
      country,
      fileUrl
    });

    res.status(201).json(paper);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all papers (with search & filter)
// @route   GET /api/papers/all
// @access  Private/Admin or Reviewer
const getAllPapers = async (req, res, next) => {
  try {
    const { search, status, track, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.paperTitle = { $regex: search, $options: 'i' };
    }
    if (status) {
      query.status = status;
    }
    if (track) {
      query.sessionTrack = track;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const papers = await PaperSubmission.find(query)
      .populate('author', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await PaperSubmission.countDocuments(query);

    res.json({
      papers,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my papers
// @route   GET /api/papers/my-papers
// @access  Private
const getMyPapers = async (req, res, next) => {
  try {
    const papers = await PaperSubmission.find({ author: req.user._id });
    res.json(papers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get paper by ID
// @route   GET /api/papers/:id
// @access  Private
const getPaperById = async (req, res, next) => {
  try {
    const paper = await PaperSubmission.findById(req.params.id).populate('author', 'name email');

    if (!paper) {
      res.status(404);
      throw new Error('Paper not found');
    }

    // Check if user is admin/reviewer or the owner of the paper
    if (req.user.role === 'Admin' || req.user.role === 'Reviewer' || paper.author._id.toString() === req.user._id.toString()) {
      res.json(paper);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this paper');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update paper status
// @route   PUT /api/papers/:id/status
// @access  Private/Admin
const updatePaperStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const paper = await PaperSubmission.findById(req.params.id);

    if (!paper) {
      res.status(404);
      throw new Error('Paper not found');
    }

    paper.status = status || paper.status;
    const updatedPaper = await paper.save();

    res.json(updatedPaper);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a paper
// @route   DELETE /api/papers/:id
// @access  Private/Admin
const deletePaper = async (req, res, next) => {
  try {
    const paper = await PaperSubmission.findById(req.params.id);

    if (!paper) {
      res.status(404);
      throw new Error('Paper not found');
    }

    await paper.deleteOne();

    res.json({ message: 'Paper removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitPaper,
  getAllPapers,
  getMyPapers,
  getPaperById,
  updatePaperStatus,
  deletePaper
};
