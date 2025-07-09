const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: [String], required: true },
  pdf: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Paper || mongoose.model('Paper', paperSchema);
