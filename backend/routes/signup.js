const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Reviewer = require('../models/reviewer.model');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

const ALLOWED_SIGNUP_ROLES = ["Author", "Reviewer"];

router.post('/', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, tags = [] } = req.body;

    if (!email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!ALLOWED_SIGNUP_ROLES.includes(role)) {
      return res.status(403).json({ message: "Invalid role selected" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      roles: [role]
    };

    if (role === "Reviewer") {
      userData.reviewerProfile = { tags };
    }

    const user = await User.create(userData);

    const token = jwt.sign(
  {
    userId: user._id,
    role: role
  },
  SECRET_KEY,
  { expiresIn: "6h" }
);

    res.status(201).json({ message: 'Signup successful', token });
  } catch (err) {
    console.error("Signup file error: ", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;