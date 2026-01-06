// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['Author', 'Editor'], required: true },
//   comments: [
//   {
//     paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
//     comment: String,
//     commentedAt: { type: Date, default: Date.now }
//   }
// ]

// });

// const userModel = mongoose.model.User || mongoose.model('User', userSchema);
// module.exports = userModel;

const mongoose = require("mongoose");
const commentSchema = require("./comment.schema");

const userSchema = new mongoose.Schema(
  {
    // ───────────────────────────
    // Core Identity
    // ───────────────────────────
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    // ───────────────────────────
    // Roles & Access Control
    // ───────────────────────────
    role: {
      type: [String],
      enum: ["Author", "Reviewer", "Editor"],
      default: ["Author"],
      index: true
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
      index: true
    },

    // ───────────────────────────
    // Reviewer-Specific Data
    // ───────────────────────────
    reviewerProfile: {
      tags: {
        type: [String],
        default: []
      },

      assignedPapers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Paper"
        }
      ]
    },

    // ───────────────────────────
    // Embedded Comments
    // ───────────────────────────
    comments: {
      type: [commentSchema],
      default: []
    },

    // ───────────────────────────
    // Metadata
    // ───────────────────────────
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
