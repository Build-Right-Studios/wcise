const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const editorRoute = require('./routes/editor');
const reviewerRoute = require('./routes/reviewer');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Dummy users (can move to database later)
const users = [
  {
    id: 1,
    name: 'Aryan',
    email: 'aryan@gmail.com',
    password: '12345',
    role: 'Reviewer'
  },
  {
    id: 2,
    name: 'Kittu',
    email: 'kittu@gmail.com',
    password: '54321',
    role: 'Author'
  }
];

app.locals.users = users;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/editor', editorRoute);
app.use('/reviewer', reviewerRoute);

// Get all users
app.get('/users', (req, res) => {
  res.json(app.locals.users);
});

// File Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const filePath = file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads/',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(filePath);

    res.send({
      message: 'PDF uploaded successfully!',
      filename: file.filename,
      originalName: file.originalname,
      cloud_url: result.secure_url,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).send('Upload failed');
  }
});

// Author: Upload New Paper
app.post('/author/new-paper', upload.single('pdf'), (req, res) => {
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
app.post('/author/paper-details', upload.single('pdf'), async (req, res) => {
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

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running successfully.');
});

// Start Server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
