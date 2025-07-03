const express = require('express');
const router = express.Router();

// In-memory paper storage
const papers = [];

// ✅ Add new paper
router.post('/upload', (req, res) => {
  const { title, paperId, tags, pdfName, status, date } = req.body;

  if (!title || !paperId || !tags || !pdfName || !status || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newPaper = {
    id: papers.length + 1,
    title,
    paperId,
    tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
    pdfName,
    status,
    date
  };

  papers.push(newPaper);

  res.json({
    message: 'Paper uploaded successfully',
    paper: newPaper
  });
});

// ✅ Get all papers
router.get('/papers', (req, res) => {
  res.json(papers);
});

// ✅ Get a specific paper by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const paper = papers.find(p => p.id === parseInt(id));

  if (!paper) {
    return res.status(404).json({ message: 'Paper not found' });
  }

  res.json(paper);
});

module.exports = router;
