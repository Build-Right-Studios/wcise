const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },

    commentedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: false
  }
);

module.exports = commentSchema;
