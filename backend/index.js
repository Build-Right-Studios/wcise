const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const editorRoute = require('./routes/editor');
const reviewerRoute = require('./routes/reviewer');
const authorRoute = require('./routes/author');

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

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB successfully."))
    .catch((err) => console.log("MongoDB connection error:", err.message));

// Cloudinary Configuration


// Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/editor', editorRoute);
app.use('/reviewer', reviewerRoute);
app.use('/author', authorRoute);

// Get all users
app.get('/users', (req, res) => {
  res.json(app.locals.users);
});

// File Upload Route
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const filePath = file.path;

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'uploads/',
//       resource_type: 'raw',
//       use_filename: true,
//       unique_filename: false,
//     });

//     fs.unlinkSync(filePath);

//     res.send({
//       message: 'PDF uploaded successfully!',
//       filename: file.filename,
//       originalName: file.originalname,
//       cloud_url: result.secure_url,
//     });
//   } catch (err) {
//     console.error('Upload Error:', err);
//     res.status(500).send('Upload failed');
//   }
// });

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running successfully.');
});

// Start Server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
