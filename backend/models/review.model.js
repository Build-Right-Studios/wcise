const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true, },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "Reviewer", required: true, },
  status: { type: String, enum: ['Waiting', 'Mail Sent', 'Accepted', 'Declined'], default: 'Waiting',}, 
});

module.exports = mongoose.model("reviews", reviewSchema);
