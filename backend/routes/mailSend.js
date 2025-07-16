const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-mail/:email', async (req, res) => {
  const { name, paperTitle, paperId } = req.body;
  const email = req.params.email;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false,
    auth: {
      user: 'dhratikaushik05@gmail.com',
      pass: 'halz xnfy kxbp ehym'
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
    <p>Please check your dashboard for more details.</p>
    <p>Regards,<br/>Editorial Team</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Editorial Board"',
      to: email,
      subject,
      html: message
    });

    console.log("Mail sent:", info.response);
    res.status(200).json({ success: true, message: "Mail sent" });
  } catch (error) {
    console.error("Mail failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
