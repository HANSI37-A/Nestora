const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// @route   POST /api/contact
// @desc    Send inquiry email via Resend
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }


  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY in .env file");
    return res.status(500).json({ message: 'Server configuration error.' });
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
  
    await resend.emails.send({
      from: 'Nestora Atelier <onboarding@resend.dev>', 
      to: process.env.CONTACT_RECEIVER,
      subject: `New Atelier Inquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F9F7F2; color: #1A1A1A;">
          <h1 style="font-size: 28px; font-weight: normal; border-bottom: 1px solid #A8A29E; padding-bottom: 16px;">New Inquiry — Nestora Atelier</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 24px; border-top: 1px solid #A8A29E; padding-top: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #A8A29E;">Message</p>
            <p style="font-size: 14px; line-height: 1.8;">${message}</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Nestora Atelier <onboarding@resend.dev>',
      to: email,
      subject: `Inquiry Received — Nestora`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F9F7F2; color: #1A1A1A;">
          <h1 style="font-size: 24px; font-weight: normal;">Thank you, ${name}.</h1>
          <p>Your inquiry has been received. Our team will respond within 1–2 business days.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Inquiry sent successfully.' });

  } catch (error) {
    console.error('Resend API Error:', error);
    return res.status(500).json({ message: 'Failed to send inquiry. Please try again.' });
  }
});

module.exports = router;