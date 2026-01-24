const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Review = require('../models/review.model');
const Paper = require('../models/paper');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

router.post('/add-comment/:paperCode', async (req, res) => {
  const { paperCode } = req.params;
  const { reviewerId, text } = req.body;

  //  Log input values
  console.log('Incoming request:');
  console.log('Paper ID:', paperCode);
  console.log('Reviewer ID:', reviewerId);
  console.log('Comment Text:', text);

  //  Validate ObjectId format
  if (!paperCode) {
    return res.status(400).json({ message: 'paperCode is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    console.error('Invalid Reviewer ID format');
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

  try {
    // ✅ Find the review document for that paper & reviewer
    const paper = await Paper.findOne({ paperCode });
    console.log(paper);
    
    // Add comment to paper
    const commentObj = { reviewerId, text };
    paper.comments = paper.comments || [];
    paper.comments.push(commentObj);
    await paper.save();

    // Add comment to author (user)
    const author = await User.findById(paper.author);
    if (author) {
      author.comments = author.comments || [];
      author.comments.push({
        paperCode,
        comment: text,
        commentedAt: new Date()
      });


      await author.save();
    }

    res.status(200).json({ message: 'Comment added successfully', latestComment: commentObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
});

// ✅ Get all submitted reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get papers assigned to a specific reviewer
router.get('/assigned-papers/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

  try {
    const papers = await Paper.find({ assignedReviewers: id });
    res.status(200).json(papers);
  } catch (error) {
    console.error('Error fetching assigned papers: ', error);
    res.status(500).json({ message: 'Server error' });

  }
});

// ✅ Respond to invitation
// router.get('/respond', async (req, res) => {
//   try {
//     const { token, status } = req.query;

//     const payload = jwt.verify(token, process.env.INVITE_SECRET);

//     if (payload.action !== "REVIEW_INVITE") {
//       return res.status(403).send("Invalid invite");
//     }

//     const { paperCode, reviewerId } = payload;

//     if (status === "Accepted") {
//       await Paper.updateOne(
//         { paperCode },
//         { $addToSet: { assignedReviewers: reviewerId } }
//       );
//     }

//     await Review.findOneAndUpdate(
//       { paperCode, reviewerId },
//       { status },
//       { upsert: true }
//     );

//     res.send(`<h2>✅ You have ${status} the review invitation.</h2>`);
//   } catch (err) {
//     res.status(400).send("Invite link expired or invalid.");
//   }
// });

// GET current logged-in reviewer
router.get('/me', async (req, res) => {
  try {
    const reviewer = req.currentUser;

    res.status(200).json({
      success: true,
      reviewer: {
        _id: reviewer._id,
        name: reviewer.name,
        email: reviewer.email,
        phone: reviewer.phone,
        role: reviewer.role
      }
    });

  } catch (error) {
    console.error('Error fetching reviewer profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviewer profile'
    });
  }
});

// ✅ Review detail by paper ID (must stay last)
router.get('/:paperCode', async (req, res) => {
  const { paperCode } = req.params;

  if (!paperCode) {
    return res.status(400).json({ message: 'paperCode is required' });
  }

  try {
    const review = await Paper.findOne({ paperCode });

    if (!review) {
      return res.status(404).json({ message: 'Review not found for this paper ID' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/assign/:paperCode', async (req, res) => {
  const { paperCode } = req.params;
  const { reviewerId, status } = req.body;

  if (!paperCode) {
    return res.status(400).json({ message: 'paperCode is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    console.error('Invalid Reviewer ID format');
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

    try {
    let updatedPaper = null;

    if (status === "Accepted") {
      updatedPaper = await Paper.findOneAndUpdate(
        { paperCode },
        { $addToSet: { assignedReviewers: reviewerId } },
        { new: true }
      );

      if (!updatedPaper) {
        return res.status(404).json({ message: "Paper not found" });
      }

      console.log(`Reviewer ${reviewerId} assigned to paper ${updatedPaper}`);
    } else {
      console.log(`Reviewer ${reviewerId} responded with status: ${status}`);
    }

    res.status(200).json({ message: "Reviewer status handled", paper: updatedPaper });
  } catch (err) {
    console.error(" Error assigning reviewer:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});




// router.get('/respond/:paperId', async (req, res) => {
//   const { paperId } = req.params;
//   const { reviewerId, status } = req.query;

//   try {
//     if (!reviewerId || !status) {
//       return res.status(400).send("Missing reviewerId or status.");
//     }

//     if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
//       return res.status(400).send("Invalid reviewerId.");
//     }

//     const paper = await Paper.findById(paperId);
//     if (!paper) {
//       return res.status(404).send("Paper not found.");
//     }

//     if (status === 'Accepted') {

//       if (!paper.assignedReviewers.includes(reviewerId)) {
//         paper.assignedReviewers.push(reviewerId);
//         await paper.save();
//       }

//       await Review.findOneAndUpdate(
//         { paperId, reviewerId },
//         { status},
//         { new: true }
//       );
//     }
//     res.send(`<h2>✅ You have ${status} the review invitation. Visit your dashboard for further details.</h2>`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Something went wrong.");
//   }
// });

// router.get('/status/:paperId', async (req, res) => {
//   const { paperId } = req.params;
//   try {
//     const reviews = await Review.find({ paperId });
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch review statuses' });
//   }
// });


module.exports = router;
