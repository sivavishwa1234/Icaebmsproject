const express = require('express');
const router = express.Router();
const {
  submitPaper,
  getAllPapers,
  getMyPapers,
  getPaperById,
  updatePaperStatus,
  deletePaper
} = require('../controllers/paperController');
const { protect, admin, reviewer } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/submit', upload.single('paperFile'), submitPaper);
router.get('/all', protect, reviewer, getAllPapers);
router.get('/my-papers', protect, getMyPapers);
router.get('/:id', protect, getPaperById);
router.put('/:id/status', protect, admin, updatePaperStatus);
router.delete('/:id', protect, admin, deletePaper);

module.exports = router;
