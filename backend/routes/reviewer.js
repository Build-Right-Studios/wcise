const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Review = require('../models/review.model');
const Paper = require('../models/paper');
const User = require('../models/user.model');

router.post('/add-comment/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, text } = req.body;

  // ✅ Log input values
  console.log('➡️ Incoming request:');
  console.log('Paper ID:', paperId);
  console.log('Reviewer ID:', reviewerId);
  console.log('Comment:', comment);

  // ✅ Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    console.error('❌ Invalid Paper ID format');
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    console.error('❌ Invalid Reviewer ID format');
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

  try {
    // ✅ Find the review document for that paper & reviewer
    const review = await Review.findOne({ paperId, reviewerId });

    // Add comment to paper
    const commentObj = { reviewerId, text };
    paper.comments.push(commentObj);
    await paper.save();

    // Add comment to author (user)
    const author = await User.findById(paper.author);
    if (author) {
      author.comments = author.comments || [];
      author.comments.push({
  paperId,
  comment: text,
  commentedAt: new Date()
});


      await author.save();
    }

    res.status(200).json({ message: 'Comment added successfully', latestComment: commentObj });
  } catch (err) {
    console.error(err);
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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

  try {
    const papers = await Paper.find({ assignedReviewers: id });
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching papers', error });
  }
});

// ✅ Respond to invitation
router.post('/respond', async (req, res) => {
  const { paperId, email, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  try {
    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    // Save response in paper
    if (!paper.reviewResponses) paper.reviewResponses = {};
    paper.reviewResponses[email] = status;
    await paper.save();

    // Create or update Review document
    const existingReview = await Review.findOne({ paperId, reviewerEmail: email });

    if (!existingReview) {
      await Review.create({
        paperId,
        reviewerEmail: email,
        status,
        createdAt: new Date()
      });
    } else {
      existingReview.status = status;
      await existingReview.save();
    }

    res.json({ message: `Review status updated to ${status}` });
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Review detail by paper ID (must stay last)
router.get('/:paperId', async (req, res) => {
  const { paperId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  try {
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

router.post('/assign/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, status } = req.body;

  try {
    if (!reviewerId) {
      return res.status(400).json({ message: "Reviewer ID is required" });
    }

    if(status === "Accepted") {
      const updatedPaper = await Paper.findByIdAndUpdate(
        paperId,
        { $addToSet: { assignedReviewers: reviewerId } }, // prevent duplicates
        { new: true }
      );

      if (!updatedPaper) {
        return res.status(404).json({ message: "Paper not found" });
      }
    }

    console.log(`🔥 Reviewer ${reviewerId} assigned to paper ${paperId}`);
    res.status(200).json({ message: "Reviewer assigned successfully", paper: updatedPaper });

  } catch (err) {
    console.error("❌ Error assigning reviewer:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;
