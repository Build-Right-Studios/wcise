const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  paperId: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
  pdfName: { type: String, required: true },
  comments: { type: String, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);
