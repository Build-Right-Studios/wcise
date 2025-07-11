const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paperId: { type: String, required: true },
  tags: [String],
  pdfName: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.models.Paper || mongoose.model('Paper', paperSchema);

