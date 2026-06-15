const express = require('express');
const router = express.Router();
const transporter = require('../config/mailer');

// @route   POST /api/contact
// @desc    Send inquiry email
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Email to YOU (the store owner)
    await transporter.sendMail({
      from: `"Nestora Atelier" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Atelier Inquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F9F7F2; color: #1A1A1A;">
          <h1 style="font-size: 28px; font-weight: normal; border-bottom: 1px solid #A8A29E; padding-bottom: 16px;">New Inquiry — Nestora Atelier</h1>
          <table style="width: 100%; margin-top: 24px;">
            <tr>
              <td style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #A8A29E; padding: 8px 0; width: 120px;">Name</td>
              <td style="font-size: 14px; padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #A8A29E; padding: 8px 0;">Email</td>
              <td style="font-size: 14px; padding: 8px 0;"><a href="mailto:${email}" style="color: #1A1A1A;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 24px; border-top: 1px solid #A8A29E; padding-top: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #A8A29E; margin-bottom: 12px;">Message</p>
            <p style="font-size: 14px; line-height: 1.8; color: #1A1A1A;">${message}</p>
          </div>
          <p style="font-size: 10px; color: #A8A29E; margin-top: 40px; border-top: 1px solid #A8A29E; padding-top: 16px;">Nestora Luxury Furniture — Atelier Inquiry System</p>
        </div>
      `,
    });

    // Confirmation email to the USER
    await transporter.sendMail({
      from: `"Nestora Atelier" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your inquiry has been received — Nestora`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F9F7F2; color: #1A1A1A;">
          <h1 style="font-size: 28px; font-weight: normal; letter-spacing: 0.02em;">Thank you, ${name}.</h1>
          <p style="font-size: 14px; line-height: 1.8; color: #555; margin-top: 16px;">
            Your inquiry has been received by our atelier team. We will respond within 1–2 business days.
          </p>
          <div style="margin-top: 32px; border-top: 1px solid #A8A29E; padding-top: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #A8A29E; margin-bottom: 8px;">Your message</p>
            <p style="font-size: 13px; line-height: 1.8; color: #777; font-style: italic;">"${message}"</p>
          </div>
          <div style="margin-top: 40px; border-top: 1px solid #A8A29E; padding-top: 24px;">
            <p style="font-size: 11px; color: #A8A29E;">NESTORA LUXURY FURNITURE</p>
            <p style="font-size: 11px; color: #A8A29E;">Via della Spiga, 15 — 20121 Milano MI, Italy</p>
            <p style="font-size: 11px; color: #A8A29E;">concierge@nestora.com</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Inquiry sent successfully.' });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send inquiry. Please try again.' });
  }
});

module.exports = router;