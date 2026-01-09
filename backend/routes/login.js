const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

const ALLOWED_LOGIN_ROLES = ["Author", "Reviewer"];

router.post('/', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required" });
    }

    if (!ALLOWED_LOGIN_ROLES.includes(role)) {
      return res.status(403).json({ message: "Invalid role selected" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check role exists for this user
    if (!user.roles.includes(role)) {
      return res.status(403).json({ message: "Role not assigned to this user" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
  {
    userId: user._id,
    role: role
  },
  SECRET_KEY,
  { expiresIn: "6h" }
);


    // Response payload
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
        ...(role === "Reviewer" && {
          tags: user.reviewerProfile?.tags || []
        })
      }
    });

  } catch (err) {
    console.error("Login file error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
