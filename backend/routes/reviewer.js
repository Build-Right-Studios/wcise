const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Review = require('../models/review.model');
const Paper = require('../models/paper');
const User = require('../models/user.model');

router.post('/add-comment/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, text } = req.body;

  //  Log input values
  console.log('Incoming request:');
  console.log('Paper ID:', paperId);
  console.log('Reviewer ID:', reviewerId);
  console.log('Comment Text:', text);

  //  Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    console.error('Invalid Paper ID format');
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    console.error('Invalid Reviewer ID format');
    return res.status(400).json({ message: 'Invalid reviewer ID format' });
  }

  try {
    // ✅ Find the review document for that paper & reviewer
    const paper = await Paper.findById(paperId);
    console.log(paper);
    
    // Add comment to paper
    const commentObj = { reviewerId, text };
    paper.comments = paper.comments || [];
    paper.comments.push(coomentObj);
    await paper.save();

    // Add comment to author (user)
    const author = await User.findById(paper.author);
    if (author) {
      author.comments = author.comments || [];
      author.comments.push({
        paperId,
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
router.post('/respond', async (req, res) => {
  const { paperId, email, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  try {
    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    // Save response in paper
    paper.reviewResponses = paper.reviewResponses || {};
    paper.reviewResponses[email] = status;
    await paper.save();

    // Create or update Review document
    let review = await Review.findOne({ paperId, reviewerEmail: email });

    if (!review) {
      review = new Review({
        paperId,
        reviewerEmail: email,
        status,
        createdAt: new Date()
      });
    } else {
      review.status = status;

    }
    await review.save();

    res.json({ message: `Review status updated to ${status}` });
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Review detail by paper ID (must stay last)
router.get('/:paperId', async (req, res) => {
  const { paperId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(paperId)) {
    return res.status(400).json({ message: 'Invalid paper ID format' });
  }

  try {
    const review = await Review.findOne({ paperId });

    if (!review) {
      return res.status(404).json({ message: 'Review not found for this paper ID' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/assign/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(paperId) || !mongoose.Types.ObjectId.isValid(reviewerId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

    try {
    let updatedPaper = null;

    if (status === "Accepted") {
      updatedPaper = await Paper.findByIdAndUpdate(
        paperId,
        { $addToSet: { assignedReviewers: reviewerId } },
        { new: true }
      );

      if (!updatedPaper) {
        return res.status(404).json({ message: "Paper not found" });
      }

      console.log(`Reviewer ${reviewerId} assigned to paper ${paperId}`);
    } else {
      console.log(`Reviewer ${reviewerId} responded with status: ${status}`);
    }

    res.status(200).json({ message: "Reviewer status handled", paper: updatedPaper });
  } catch (err) {
    console.error(" Error assigning reviewer:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.get('/respond/:paperId', async (req, res) => {
  const { paperId } = req.params;
  const { reviewerId, status } = req.query;

  try {
    if (!reviewerId || !status) {
      return res.status(400).send("Missing reviewerId or status.");
    }

    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).send("Invalid reviewerId.");
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).send("Paper not found.");
    }

    if (status === 'Accepted') {
      if (!paper.assignedReviewers.includes(reviewerId)) {
        paper.assignedReviewers.push(reviewerId);
        await paper.save();
      }
    }

    res.send(`<h2>✅ You have ${status} the review invitation. Visit your dashboard for further details.</h2>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});


module.exports = router;
