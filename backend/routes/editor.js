const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');
const Review = require('../models/review.model')
const Reviewer = require('../models/reviewer.model');
const User = require('../models/user.model')

// Add new paper
// router.post('/upload', async (req, res) => {
//   try {
//     const { title, paperId, tags, pdfName, status, date } = req.body;

//     if ( !title || !paperId || !tags || !pdfName || !status || !date ) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const paper = new Paper({
//       title,
//       paperId,
//       tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
//       pdfName,
//       status,
//       date,
//     });

//     const savedPaper = await paper.save();

//     res.status(201).json({
//       message: 'Paper uploaded successfully',
//       paper: savedPaper,
//     });
//   } catch (err) {
//     console.error('Error uploading paper:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

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

// Get all reviewers (not editors)
router.get('/suggested-reviewers', async (req, res) => {
  try {
    // Fetch only users with role "Reviewer"
    const reviewers = await User.find({ role: "Reviewer" });

    // Return an array directly for frontend
    res.status(200).json(reviewers);

  } catch (err) {
    console.error('Error fetching reviewers:', err);
    res.status(500).json({ message: 'Failed to fetch reviewers' });
  }
});

// editor.js

/// Assign reviewer to paper
router.post('/assign-reviewer', async (req, res) => {
  try {
    const { paperId, reviewerId } = req.body;

    if (!paperId || !reviewerId) {
      return res.status(400).json({ message: 'paperId and reviewerId are required' });
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    // ✅ Use correct field: assignedReviewers
 const mongoose = require('mongoose'); // make sure this is imported
const reviewerObjectId = mongoose.Types.ObjectId.createFromHexString(reviewerId);

if (!paper.assignedReviewers.some(id => id.equals(reviewerObjectId))) {
  paper.assignedReviewers.push(reviewerObjectId);
  await paper.save();
}


    res.status(200).json({ message: 'Reviewer assigned to paper successfully', paper });
  } catch (err) {
    console.error('Error assigning reviewer:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get paper by ID
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(paper);
  } catch (err) {
    console.error('Error fetching paper by ID:', err);
    res.status(500).json({ message: 'Error fetching paper' });
  }
});

router.get('/paper-status/:paperId', async (req, res) => {
  const { paperId } = req.params;

  try {
    // Find all reviews for this paper
    const reviews = await Review.find({ paperId });

    // Populate reviewer info (name, email) from User collection
    const detailedReviews = await Promise.all(
      reviews.map(async (r) => {
        const reviewer = await User.findById(r.reviewerId).select('name email');
        return {
          reviewerId: r.reviewerId,
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

// in editor.js (backend)
// router.get('/all-reviewers', async (req, res) => {
//   try {
//     const reviewers = await Reviewer.find();
//     res.json(reviewers);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching reviewers' });
//   }
// });

module.exports = router;