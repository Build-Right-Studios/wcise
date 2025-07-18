const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/:email', async (req, res) => {
  const { name, paperTitle, paperId, reviewerId } = req.body;
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

    <p>Please choose one of the options below:</p>

    <div style="margin: 20px 0;">
      <button 
        onclick="acceptReviewer('${paperId}', '${reviewerId}')" 
        style="background-color:#28a745;color:white;padding:10px 20px;border:none;border-radius:5px;margin-right:10px;cursor:pointer;">
        Accept
      </button>

      <button 
        onclick="declineReviewer('${email}', '${paperId}')" 
        style="background-color:#dc3545;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;">
        Decline
      </button>
    </div>

    <script>
      async function acceptReviewer(paperId, reviewerId) {
        try {
          const response = await fetch('http://localhost:8000/reviewer/assign/' + paperId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviewerId, status: "Accepted" })
          });
          const data = await response.json();
          if (response.ok) {
            alert("Accepted review invitation!");
          } else {
            alert("Error: " + data.message);
          }
        } catch (err) {
          alert("Failed to accept.");
          console.error(err);
        }
      }

      async function declineReviewer(email, paperId) {
        try {
          const response = await fetch('http://localhost:8000/reviewer/assign/' + paperId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reviewerId, status: "Decline" })
          });
          const data = await response.json();
          if (response.ok) {
            alert("Declined review invitation.");
          } else {
            alert("Error: " + data.message);
          }
        } catch (err) {
          alert("Failed to decline.");
          console.error(err);
        }
      }
    </script>

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
