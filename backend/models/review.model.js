const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper',
    required: true
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  reviewerEmail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String],
    required: true
  },
  pdfName: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Accepted', 'Declined', 'Pending'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Review', reviewSchema);
