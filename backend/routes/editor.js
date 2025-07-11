const express = require('express');
const router = express.Router();
const Paper = require('../models/editor.paper');

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
    res.status(500).json({ message: 'Failed to fetch papers' });
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
    res.status(500).json({ message: 'Error fetching paper' });
  }
});

// Get suggested reviewers
router.get('/suggested-reviewers', async (req, res) => {
  try {
    const suggestedReviewers = [
      {
        reviewerId: 'R101',
        name: 'Hrithik Roshan',
        role: 'PROFESSOR',
        tags: 'ML, Deep Learning, Python, AI',
        paperId: 'P301',
      },
      {
        reviewerId: 'R102',
        name: 'Sanjay Dutt',
        role: 'RESEARCHER',
        tags: 'ML, Deep Learning, Python, AI',
        paperId: 'P302',
      },
    ];

    res.status(200).json(suggestedReviewers);
  } catch (err) {
    console.error('Error fetching reviewers:', err);
    res.status(500).json({ message: 'Failed to fetch reviewers' });
  }
});

module.exports = router;