const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const editorRoute = require('./routes/editor');
const reviewerRoute = require('./routes/reviewer');

const app = express();
app.use(express.json());
app.use(cors());

// Dummy users
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

// Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/editor', editorRoute);
app.use('/reviewer', reviewerRoute);

// Test users route
app.get('/users', (req, res) => {
  res.json(app.locals.users);
});

// Root
app.get('/', (req, res) => {
  res.send('Server is running successfully.');
});

// Server listen
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
