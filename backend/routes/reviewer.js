const express = require('express');
const router = express.Router();
const Review = require('../models/review.model');

//  Submit Review (Save to MongoDB)
router.post('/submit', async (req, res) => {
  try {
    const { paperId, title, date, tags, pdfName, comments } = req.body;

    if (!paperId || !title || !date || !tags || !pdfName || !comments) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Review({
      paperId,
      title,
      date,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      pdfName,
      comments
    });

    await newReview.save();

    res.json({
      message: 'Review submitted successfully',
      review: newReview
    });

  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Get All Reviews from MongoDB
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Get Single Review by paperId
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
