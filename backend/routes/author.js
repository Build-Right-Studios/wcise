const express = require('express');
const router = express.Router();

// Author: Upload New Paper
router.post('/author/new-paper', (req, res) => {
  try {
    const { title, abstract, selectkeytags } = req.body;
    const pdfUrl = req.file ? req.file.path : null;

    if (title && abstract && selectkeytags && pdfUrl) {
      return res.status(200).json({
        success: true,
        message: 'New paper uploaded successfully!',
        data: { title, abstract, selectkeytags, pdf: pdfUrl },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (title, abstract, key tags, or PDF).',
      });
    }
  } catch (err) {
    console.error('ERROR in /author/new-paper:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during new paper upload',
      error: err.message,
    });
  }
});

// Author: Paper Details Upload
router.post('/author/paper-details', async (req, res) => {
  try {
    const { abstract } = req.body;
    const pdfUrl = req.file ? req.file.path : null;

    if (abstract && pdfUrl) {
      return res.status(200).json({
        success: true,
        message: 'Paper details uploaded successfully!',
        data: { abstract, pdf: pdfUrl },
      });
    } else {
      let missingFields = [];
      if (!abstract) missingFields.push('abstract');
      if (!pdfUrl) missingFields.push('PDF');

      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(' or ')}.`,
      });
    }
  } catch (err) {
    console.error('ERROR in /author/paper-details:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during paper details upload',
      error: err.message,
    });
  }
});

module.exports = router;