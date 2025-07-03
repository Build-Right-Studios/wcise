const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'your_super_secret_key';

router.post('/', (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const users = req.app.locals.users;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: role || 'Author'
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    SECRET_KEY,
    { expiresIn: '6h' }
  );

  res.json({
    message: 'Signup successful!',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
});

module.exports = router;
