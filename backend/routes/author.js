const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const Paper = require('../models/paper.js');

const { authenticationToken } = require('../utilities/utilities.js');
const User = require('../models/user.model');
// Cloudinary Config

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Use memory storage for multer (no disk write)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/new-paper', upload.single('file'), authenticationToken, async (req, res) => {
  try {
    const { title, abstract } = req.body;
    const user = req.user;
    let keywords = req.body.keywords;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required.',
      });
    }

    if (typeof keywords === 'string') {
      keywords = [keywords];
    }

    // Upload buffer to Cloudinary using stream
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'uploads/',
            resource_type: 'raw',
            use_filename: true,
            unique_filename: false,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const cloudinaryResult = await streamUpload();

    const newPaper = new Paper({
      author: user.id,
      title,
      abstract,
      keywords,
      pdf: cloudinaryResult.secure_url,
    });

    await newPaper.save();

    res.status(200).json({
      success: true,
      message: 'New paper uploaded successfully!',
      data: {
        title,
        abstract,
        keywords,
        pdf: cloudinaryResult.secure_url,
      },
      user: user,
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

/* Get All Papers of the Logged-in Author */
router.get('/my-papers', authenticationToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const papers = await Paper.find({ author: userId }).sort({ submittedAt: -1 });

    res.json({
      success: true,
      papers,
    });

  } catch (error) {
    console.error('ERROR in /author/my-papers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching papers',
      error: error.message,
    });
  }
});

/* Get Paper by ID */
router.get('/paper/:id', authenticationToken, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Paper not found' });
    }

    // Fetch all users who commented on this paper
    const users = await User.find({ 'comments.paperId': paper._id });

    let latestComment = null;

    for (const user of users) {
      const comments = user.comments.filter(c => c.paperId.toString() === paper._id.toString());
      for (const c of comments) {
        if (!latestComment || new Date(c.commentedAt) > new Date(latestComment.commentedAt)) {
          latestComment = c;
        }
      }
    }

    res.status(200).json({ success: true, paper, latestComment });
  } catch (error) {
    console.error('Error fetching paper by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


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
