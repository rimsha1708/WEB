const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Email Sending Route
router.post("/send-email", async (req, res) => {
  const { recipient, subject, message } = req.body;

  try {
    // Create transporter for Outlook SMTP
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: "admin@yourdomain.com", // Replace with your Outlook email
        pass: "yourpassword",        // Replace with your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: "admin@yourdomain.com",   // Replace with your Outlook email
      to: recipient,                  // Recipient email
      subject: subject,               // Email subject
      text: message,                  // Email body (text format)
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
