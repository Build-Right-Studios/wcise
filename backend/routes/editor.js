const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');
const Review = require('../models/review.model');
const User = require('../models/user.model');

// GET current logged-in editor
router.get('/me', async (req, res) => {
  try {
    const editor = req.currentUser;
    res.status(200).json({
      success: true,
      editor: {
        _id: editor._id,
        name: editor.name,
        email: editor.email,
        phone: editor.phone,
        role: editor.role
      }
    });
  } catch (error) {
    console.error('Error fetching editor profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch editor profile' });
  }
});

// Get all papers
router.get('/papers', async (req, res) => {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (err) {
    console.error('Error fetching papers:', err);
    res.status(500).json({ message: 'Failed to fetch papers' });
  }
});

// Get all reviewers
router.get('/suggested-reviewers', async (req, res) => {
  try {
    const reviewers = await User.find({ role: "Reviewer" });
    res.status(200).json(reviewers);
  } catch (err) {
    console.error('Error fetching reviewers:', err);
    res.status(500).json({ message: 'Failed to fetch reviewers' });
  }
});

// Assign reviewer to paper
router.post('/assign-reviewer', async (req, res) => {
  try {
    const { paperCode, reviewerId } = req.body;

    if (!paperCode || !reviewerId) {
      return res.status(400).json({ message: 'paperCode and reviewerId are required' });
    }

    const paper = await Paper.findOne({ paperCode });
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    const mongoose = require('mongoose');
    const reviewerObjectId = new mongoose.Types.ObjectId(reviewerId);

    if (!paper.assignedReviewers.some(id => id.equals(reviewerObjectId))) {
      paper.assignedReviewers.push(reviewerObjectId);
      await paper.save();
    }

    res.status(200).json({ message: 'Reviewer assigned successfully', paper });
  } catch (err) {
    console.error('Error assigning reviewer:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get paper by paperCode
router.get('/paper/:paperCode', async (req, res) => {
  try {
    const paper = await Paper.findOne({ paperCode: req.params.paperCode });
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.status(200).json(paper);
  } catch (err) {
    console.error('Error fetching paper:', err);
    res.status(500).json({ message: 'Error fetching paper' });
  }
});

// Get reviewer statuses for a paper
router.get('/paper-status/:paperCode', async (req, res) => {
  const { paperCode } = req.params;
  try {
    const reviews = await Review.find({ paperCode });

    const detailedReviews = await Promise.all(
      reviews.map(async (r) => {
        const reviewer = await User.findById(r.reviewerId).select('name email');
        return {
          reviewerId: r.reviewerId.toString(),
          reviewerName: reviewer?.name || 'Unknown',
          reviewerEmail: reviewer?.email || 'Unknown',
          status: r.status
        };
      })
    );

    res.status(200).json(detailedReviews);
  } catch (err) {
    console.error('Error fetching paper status:', err);
    res.status(500).json({ message: 'Failed to fetch paper status' });
  }
});

// ✅ Update paper status (editor only)
router.put('/paper-status/:paperCode', async (req, res) => {
  const { paperCode } = req.params;
  const { status } = req.body;

  const validStatuses = ['Under Review', 'Minor Revision', 'Major Revision', 'Accepted', 'Rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const paper = await Paper.findOneAndUpdate(
      { paperCode },
      { status },
      { new: true }
    );

    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', paper });
  } catch (err) {
    console.error('Error updating paper status:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;