const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: [String], required: true },
  pdf: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }],
  comments: [
    {
      reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' },
      text: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Papers', paperSchema);
