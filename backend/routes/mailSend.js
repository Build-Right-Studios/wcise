const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Review = require('../models/review.model')

// POST /invite/:email
router.post('/:email', async (req, res) => {
  const { name, paperTitle, paperId, reviewerId } = req.body;
  const email = req.params.email;

  const acceptUrl = `http://localhost:8000/reviewer/respond/${paperId}?reviewerId=${reviewerId}&status=Accepted`;
  const declineUrl = `http://localhost:8000/reviewer/respond/${paperId}?reviewerId=${reviewerId}&status=Declined`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'dhratikaushik05@gmail.com',
      pass: 'mpcw nwsk izhc wcvy' // Use app password only!
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const subject = `Review Invitation for "${paperTitle}"`;

  const message = `
    <p>Dear ${name},</p>
    <p>You have been invited to review the paper titled: <strong>${paperTitle}</strong>.</p>
    <p>Paper ID: <strong>${paperId}</strong></p>

    <p>Please choose one of the options below:</p>

    <div style="margin: 20px 0;">
      <a href="${acceptUrl}" style="background-color:#28a745;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;margin-right:10px;">
        ✅ Accept
      </a>

      <a href="${declineUrl}" style="background-color:#dc3545;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
        ❌ Decline
      </a>
    </div>

    <p>Regards,<br/>Editorial Team</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Editorial Board" <dhratikaushik05@gmail.com>',
      to: email,
      subject,
      html: message
    });

    console.log("Mail sent:", info.response);

    await Review.findOneAndUpdate(
      { paperId, reviewerId },
      { paperId, reviewerId, status: 'Mail Sent',},
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: "Mail sent" });
  } catch (error) {
    console.error("Mail failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
