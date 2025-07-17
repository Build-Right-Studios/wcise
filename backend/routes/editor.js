const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');
const Reviewer = require('../models/reviewer.model');

// Add new paper
router.post('/upload', async (req, res) => {
  try {
    const { title, paperId, tags, pdfName, status, date } = req.body;

    if ( !title || !paperId || !tags || !pdfName || !status || !date ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const paper = new Paper({
      title,
      paperId,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      pdfName,
      status,
      date,
    });

    const savedPaper = await paper.save();

    res.status(201).json({
      message: 'Paper uploaded successfully',
      paper: savedPaper,
    });
  } catch (err) {
    console.error('Error uploading paper:', err);
    res.status(500).json({ message: 'Server error' });
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
router.get('/suggested-reviewers', async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.json(reviewers);
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




module.exports = router;
