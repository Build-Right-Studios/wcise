const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Review = require('../models/review.model');
const Paper = require('../models/paper');

router.get('/respond', async (req, res) => {
  try {
    const { token, status } = req.query;

    if (!token || !status) {
      return res.status(400).send("Invalid invite link");
    }

    const payload = jwt.verify(token, process.env.INVITE_SECRET);

    if (payload.action !== "REVIEW_INVITE") {
      return res.status(403).send("Invalid invite");
    }

    const { paperCode, reviewerId } = payload;

    if (status === "Accepted") {
      await Paper.updateOne(
        { paperCode },
        { $addToSet: { assignedReviewers: reviewerId } }
      );

      await Review.findOneAndUpdate(
      { paperCode, reviewerId },
      { status: 'Accepted' },
      { upsert: true }
    );
    } else {
      await Review.findOneAndUpdate(
      { paperCode, reviewerId },
      { status: 'Declined' },
      { upsert: true }
      );
    }


    res.send(`<h2>✅ You have ${status} the review invitation.</h2>`);
  } catch (err) {
    res.status(400).send("Invite link expired or invalid.");
  }
});

module.exports = router;
