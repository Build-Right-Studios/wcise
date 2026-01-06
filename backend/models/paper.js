// const mongoose = require('mongoose');

// const paperSchema = new mongoose.Schema({
//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   abstract: { type: String, required: true },
//   keywords: { type: [String], required: true },
//   pdf: { type: String, required: true },
//   submittedAt: { type: Date, default: Date.now },
//   assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }],
//   comments: [
//     {
//       reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' },
//       text: String,
//       date: { type: Date, default: Date.now }
//     }
//   ]
// });

// module.exports = mongoose.model('Papers', paperSchema);

const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    paperCode: {
      type: String,
      unique: true,
      index: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    abstract: {
      type: String,
      required: true
    },

    keywords: {
      type: [String],
      required: true,
      index: true
    },

    pdf: {
      type: String,
      required: true
    },

    // Assigned reviewers (Users with Reviewer role)
    assignedReviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    submittedAt: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["submitted", "under_review", "accepted", "rejected"],
      default: "submitted",
      index: true
    }
  },
  { timestamps: true }
);

paperSchema.pre("save", async function (next) {
  if (this.paperCode) return next();

  const year = new Date().getFullYear();
  const prefix = `wcise-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.paperCode = `${prefix}-${String(counter.seq).padStart(4, "0")}`;

  next();
});

module.exports = mongoose.model("Paper", paperSchema);
