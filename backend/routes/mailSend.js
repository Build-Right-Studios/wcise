const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Review = require('../models/review.model');
const jwt = require("jsonwebtoken");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send-mail/:email', async (req, res) => {
  try {
    const { name, paperTitle, paperCode, reviewerId } = req.body;
    const email = req.params.email;

    if (!name || !paperTitle || !paperCode || !reviewerId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 🔐 Create invite token
    const inviteToken = jwt.sign(
      {
        paperCode,
        reviewerId,
        action: "REVIEW_INVITE"
      },
      process.env.INVITE_SECRET,
      { expiresIn: "7d" }
    );

    // 🔗 URLs
    const acceptUrl = `${process.env.APP_BASE}/reviewer/respond?token=${inviteToken}&status=Accepted`;
    const declineUrl = `${process.env.APP_BASE}/reviewer/respond?token=${inviteToken}&status=Declined`;

    const subject = `Review Invitation for "${paperTitle}"`;

    const html = `
      <p>Dear ${name},</p>
      <p>You have been invited to review the paper titled <b>${paperTitle}</b>.</p>

      <div style="margin:20px 0">
        <a href="${acceptUrl}" style="background:#28a745;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;margin-right:10px">
          ✅ Accept
        </a>
        <a href="${declineUrl}" style="background:#dc3545;color:white;padding:10px 20px;border-radius:5px;text-decoration:none">
          ❌ Decline
        </a>
      </div>

      <p>Regards,<br/>Editorial Team</p>
    `;

    // 📧 Send email
    const resendResponse = await resend.emails.send({
      from: 'Editorial Board <onboarding@wcise.co.in>',
      to: email,
      subject,
      html
    });

    console.log('Resend response:', resendResponse);

    // ❗ IMPORTANT: Check for Resend error
    if (resendResponse.error) {
      console.error('Resend failed:', resendResponse.error);

      // ❌ Do NOT mark as sent
      await Review.findOneAndUpdate(
        { paperCode, reviewerId },
        { paperCode, reviewerId, status: 'Failed' },
        { upsert: true, new: true }
      );

      return res.status(400).json({
        success: false,
        message: resendResponse.error.message || 'Email sending failed'
      });
    }

    // ✅ Only update DB if email SUCCESS
    await Review.findOneAndUpdate(
      { paperCode, reviewerId },
      { paperCode, reviewerId, status: 'Mail Sent' },
      { upsert: true, new: true }
    );

    return res.json({
      success: true,
      message: 'Mail sent successfully'
    });

  } catch (err) {
    console.error('Mail error:', err);

    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  }
});

module.exports = router;