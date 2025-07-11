const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Reviewer = require('../models/reviewer.model');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

router.post('/', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, tags = [] } = req.body;

    if (!email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    const existingReviewer = await Reviewer.findOne({ email });

    if (existingUser || existingReviewer) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === 'Reviewer') {
      newUser = new Reviewer({ name, email, password: hashedPassword, role, tags });
      await newUser.save();
    } else {
      newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
    }

    const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'Signup successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;