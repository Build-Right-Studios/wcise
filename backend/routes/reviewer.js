const express = require('express');
const router = express.Router();

// In-memory storage for reviews
const reviews = [];

// ✅ Submit a review
router.post('/submit', (req, res) => {
  const { paperId, title, date, tags, pdfName, comments } = req.body;

  if (!paperId || !title || !date || !tags || !pdfName || !comments) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newReview = {
    id: reviews.length + 1,
    paperId,
    title,
    date,
    tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
    pdfName,
    comments
  };

  reviews.push(newReview);

  res.json({
    message: 'Review submitted successfully',
    review: newReview
  });
});

// ✅ Get all reviews
router.get('/reviews', (req, res) => {
  res.json(reviews);
});

// ✅ Get review by paper ID
router.get('/:paperId', (req, res) => {
  const { paperId } = req.params;
  const review = reviews.find(r => r.paperId === paperId);

  if (!review) {
    return res.status(404).json({ message: 'Review not found for this paper ID' });
  }

  res.json(review);
});

module.exports = router;
