const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const Paper = require('../models/paper.js');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer Storage (kept for temporary local storage before uploading to Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Author: Upload New Paper
router.post('/new-paper', upload.single('file'), async (req, res) => {
  try {
    const { title, abstract } = req.body;
    let keywords = req.body.keywords;
    const file = req.file

    // Ensure keywords is an array
    if (typeof keywords === 'string') {
      keywords = [keywords];
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required.',
      });
    }

    const filePath = file.path;

    // Upload PDF to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads/',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false,
    });

    // Delete file from server after upload
    fs.unlinkSync(filePath);

    // Save paper to database 
    const newPaper = new Paper({
      title,
      abstract,
      keywords,
      pdf: result.secure_url,
    });

    await newPaper.save();

    return res.status(200).json({
      success: true,
      message: 'New paper uploaded successfully!',
      data: {
        title,
        abstract,
        keywords,
        pdf: result.secure_url,
      },
    });
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
router.post('/paper-details', async (req, res) => {
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
