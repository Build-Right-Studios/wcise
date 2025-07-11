const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Reviewer'], default: 'Reviewer' },
  tags: { type: [String], default: [] },
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
