const express = require('express');
const router = express.Router();
const Review = require('../models/review.model');
const Paper = require('../models/paper');

// save comments 
router.post('/add-comment/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, comment } = req.body;

  try {
    const paper = await Paper.findById(paperId);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    paper.comments.push({ reviewerId, text: comment });
    await paper.save();

    res.status(200).json({ message: 'Comment added successfully', latestComment: paper.comments.at(-1) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
});

// ✅ Get all submitted reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get papers assigned to a specific reviewer
router.get('/assigned-papers/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id;
    const papers = await Paper.find({ assignedReviewers: reviewerId });
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching papers', error });
  }
});

// ✅ Get review details by paper ID
router.get('/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    const review = await Review.findOne({ paperId });

    if (!review) {
      return res.status(404).json({ message: 'Review not found for this paper ID' });
    }

    res.json(review);

  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
