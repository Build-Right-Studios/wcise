// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   paperId: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true, },
//   reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "Reviewer", required: true, },
//   status: { type: String, enum: ['Waiting', 'Mail Sent', 'Accepted', 'Declined'], default: 'Waiting',}, 
// });

// module.exports = mongoose.model("reviews", reviewSchema);

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
      index: true
    },

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ["Waiting", "Mail Sent", "Accepted", "Declined"],
      default: "Waiting"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
