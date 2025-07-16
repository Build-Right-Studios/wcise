const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
  paperId: { type: String, required: true, unique: true },
  title: String,
  tags: [String],
  pdfName: String,
  status: String,
  date: String
});

module.exports = mongoose.model('Editor', editorSchema);