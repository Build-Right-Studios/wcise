
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

// CORS
app.use(cors({
  origin: [
    "https://www.wcise.co.in",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const editorRoute = require('./routes/editor');
const reviewerRoute = require('./routes/reviewer');
const authorRoute = require('./routes/author');
const mailRoute = require('./routes/mailSend');
const payuRoute = require('./routes/payu');
const paymentRoute = require('./routes/payment');
const reviewerInvite = require('./routes/reviewerInvite');

// Middleware
const isAuthenticated = require('./middleware/isAuthenticated');
const isAuthor = require('./middleware/isAuthor');
const isReviewer = require('./middleware/isReviewer');
const isEditor = require('./middleware/isEditor');



/*
 * IMPORTANT:
 * Mount Razorpay routes BEFORE express.json()
 * so webhook signature verification works correctly.
 */

app.use('/payment', paymentRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) =>
    console.error("MongoDB connection error:", err.message)
  );

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

// Application Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/', mailRoute);

app.use('/editor',
  isAuthenticated,
  isEditor,
  editorRoute
);

app.use('/reviewer', reviewerInvite);

app.use('/reviewer',
  isAuthenticated,
  isReviewer,
  reviewerRoute
);

app.use('/author',
  isAuthenticated,
  isAuthor,
  authorRoute
);

app.use('/payu', payuRoute);

// Test Route
app.get('/users', (req, res) => {
  res.json(app.locals.users);
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is running successfully.');
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

