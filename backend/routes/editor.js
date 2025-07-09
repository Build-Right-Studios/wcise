const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper');

// ✅ Upload a new paper
router.post('/upload', async (req, res) => {
  const { title, paperId, tags, pdfName, status, date } = req.body;

  // Validate required fields
  if (!title || !paperId || !tags || !pdfName || !status || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Parse tags
    const parsedTags = Array.isArray(tags)
      ? tags.map(tag => tag.trim())
      : tags.split(',').map(tag => tag.trim());

    const newPaper = new Paper({
      title,
      paperId,
      tags: parsedTags,
      pdfName,
      status,
      date
    });

    await newPaper.save();

    res.status(201).json({
      message: 'Paper uploaded successfully to MongoDB',
      paper: newPaper
    });
  } catch (error) {
    console.error('Error saving paper:', error);
    res.status(500).json({ message: 'Server error while uploading paper' });
  }
});

// ✅ Get all papers
router.get('/papers', async (req, res) => {
  try {
    const papers = await Paper.find();
    res.status(200).json(papers);
  } catch (error) {
    console.error('Error fetching papers:', error);
    res.status(500).json({ message: 'Server error while fetching papers' });
  }
});

// ✅ Get a paper by paperId
router.get('/:paperId', async (req, res) => {
  const { paperId } = req.params;

  try {
    const paper = await Paper.findOne({ paperId });

    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    res.status(200).json(paper);
  } catch (error) {
    console.error('Error fetching paper:', error);
    res.status(500).json({ message: 'Server error while fetching paper' });
  }
});

module.exports = router;
