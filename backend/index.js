const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const editorRoute = require('./routes/editor');
const reviewerRoute = require('./routes/reviewer');
const authorRoute = require('./routes/author');
const mailRoute = require('./routes/mailSend');
const ccavenueRoute = require('./routes/ccavenue'); 

const app = express();

// ✅ Middleware must be at the top before routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err.message));

// Dummy users (temporary testing data)
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

// ✅ All routes (after middleware setup)
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/editor', editorRoute);
app.use('/reviewer', reviewerRoute);
app.use('/author', authorRoute);
app.use('/ccavenue', ccavenueRoute);  // ✅ moved here
app.use('/', mailRoute); // includes POST /send-mail/:email

// Get all dummy users
app.get('/users', (req, res) => {
  res.json(app.locals.users);
});

// Default route
app.get('/', (req, res) => {
  res.send('Server is running successfully.');
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
